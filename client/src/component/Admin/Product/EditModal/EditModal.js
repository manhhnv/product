import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";

// import "./productModal.scss";
import Message from "../../../Message/Message";
import {updateProduct} from '../../../../action/productAction';

function EditModal({ isShow, onClose, product, updateProduct}) {
  const [productForm, setProductForm] = useState({});
  const [messErr, setmessErr] = useState("");
  const [isShowMess, setIsShowMess] = useState(false);

  const brandRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const pricecRef = useRef();
  const countInStockRef = useRef();
  const numReviewsRef = useRef();

  useEffect(() => {
      if(product && product.name) {
        setProductForm(product)
      }
  }, [product]);

  const handleChangeProductForm = (e) => {
    setProductForm((prev) => ({
        ...prev,
        [e.target.name] : e.target.value,
    }));
  };

  const handleSubmit = () => {
    //   console.log(productForm);
    updateProduct(productForm);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    onClose && onClose();
    setProductForm({});
  };

  const handleKeyDown = (e) => {
    setIsShowMess(false);

    if (e.keyCode === 13) {
      if (!e.target.value) {
        setIsShowMess(true);
        setmessErr("Cac truong khong duoc bo trong");
        e.target.focus();
      } else {
        switch (e.target.name) {
          case "name":
            brandRef.current.focus();
            break;
          case "brand":
            categoryRef.current.focus();
            break;
          case "category":
            descriptionRef.current.focus();
            break;
          case "description":
            pricecRef.current.focus();
            break;
          case "price":
            countInStockRef.current.focus();
            break;
          case "countInStock":
            numReviewsRef.current.focus();
            break;
          default:
            break;
        }
      }
    }
  };

  const handleClickInput = (e) => {
    setIsShowMess(false);
    e.target.select();
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      setIsShowMess(true);
      setmessErr("Cac truong khong duoc bo trong");
      e.target.focus();
    }
  };

  return (
    <Modal show={isShow} onHide={() => handleCloseModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Them va Sua san pham</Modal.Title>
      </Modal.Header>
      <Form>
        {isShowMess && <Message message={messErr} />}
        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor="name">Name :</Form.Label>
            <Form.Control
              name="name"
              id="name"
              placeholder="Nhap ten cua san pham"
              value={productForm.name || ""}
              onChange={(e) => handleChangeProductForm(e)}
              onKeyDown = {e => handleKeyDown(e)}
              onClick = {e => handleClickInput(e)}
              onBlur = {e => handleBlur(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="brand">Brand :</Form.Label>
            <Form.Control
              ref={brandRef}
              name="brand"
              id="brand"
              placeholder="Nhap ten cua san pham"
              value={productForm.brand || ""}
              onChange={(e) => handleChangeProductForm(e)}
              onKeyDown = {e => handleKeyDown(e)}
              onClick = {e => handleClickInput(e)}
              onBlur = {e => handleBlur(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="category">Category :</Form.Label>
            <Form.Control
              ref={categoryRef}
              name="category"
              id="category"
              placeholder="Nhap ten cua san pham"
              value={productForm.category || ""}
              onChange={(e) => handleChangeProductForm(e)}
              onKeyDown = {e => handleKeyDown(e)}
              onClick = {e => handleClickInput(e)}
              onBlur = {e => handleBlur(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="description">Description :</Form.Label>
            <Form.Control
              as={"textarea"}
              rows="3"
              ref={descriptionRef}
              name="description"
              id="description"
              placeholder="Nhap ten cua san pham"
              value={productForm.description || ""}
              onChange={(e) => handleChangeProductForm(e)}
              onKeyDown = {e => handleKeyDown(e)}
              onClick = {e => handleClickInput(e)}
              onBlur = {e => handleBlur(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="price">Price :</Form.Label>
            <Form.Control
              ref={pricecRef}
              name="price"
              id="price"
              placeholder="Nhap ten cua san pham"
              type="number"
              value={productForm.price || 0}
              onChange={(e) => handleChangeProductForm(e)}
              onKeyDown = {e => handleKeyDown(e)}
              onClick = {e => handleClickInput(e)}
              onBlur = {e => handleBlur(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="countInStock">Count in stock :</Form.Label>
            <Form.Control
              ref={countInStockRef}
              name="countInStock"
              id="countInStock"
              placeholder="Nhap ten cua san pham"
              type="number"
              value={productForm.countInStock || 0}
              onChange={(e) => handleChangeProductForm(e)}
              onKeyDown = {e => handleKeyDown(e)}
              onClick = {e => handleClickInput(e)}
              onBlur = {e => handleBlur(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="numReviews">Number Reviews :</Form.Label>
            <Form.Control
              ref={numReviewsRef}
              name="numReviews"
              id="numReviews"
              placeholder="Nhap so luong danh gia"
              type="number"
              value={productForm.numReviews || 0}
              onChange={(e) => handleChangeProductForm(e)}
              onKeyDown = {e => handleKeyDown(e)}
              onClick = {e => handleClickInput(e)}
              onBlur = {e => handleBlur(e)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => handleSubmit()}>
            OK
          </Button>
          <Button variant="danger" onClick={() => handleCloseModal()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { updateProduct})(EditModal);
