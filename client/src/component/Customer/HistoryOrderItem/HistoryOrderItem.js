import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Modal, Toast } from "react-bootstrap";

import "./HistoryOrderItem.scss";
import { URL } from "../../../contants/GlobalContains";
import { createProductReview } from "../../../action/productAction";

function HistoryOrderItem({ product, infoReview, createProductReview }) {
  const [isShowComment, setIsShowComment] = useState(false);
  const [isShowMoadel, setIsShowMoadel] = useState(false);
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const [mess, setMess] = useState("");
  const [isShowToats, setIsShowToats] = useState(false);

  const { isLoading } = infoReview;

  useEffect(() => {
    isLoading && setIsShowToats(true);
  }, [isLoading]);

  const handleToggleShowComment = () => {
    setIsShowComment(!isShowComment);
  };

  const handleToggleShowModal = () => {
    if (!rate || !comment) {
      setMess("Danh gia thieu !!!");
    } else {
      setIsShowMoadel(!isShowMoadel);
    }
  };

  const handleSetRate = (num) => {
    setRate(num);
    setMess("");
  };
  const handleChangeComment = (e) => {
    setComment(e.target.value);
    setMess("");
  };

  const handleComment = (id) => {
    const form = {
      rating: rate,
      comment,
    };
    createProductReview(id, form);
    setComment("");
    setIsShowMoadel(false);
    setIsShowComment(false);
  };

  return (
    <div className="history-order-wapper">
      <div className="history-order-item-left">
        <img src={`${URL}/${product.image}`} alt="image product" />
        <h4>{product.name}</h4>
        <div>
          <Button
            variant="success"
            onClick={() => handleToggleShowComment()}
            className={isShowComment ? "d-none" : ""}
          >
            Danh gia
          </Button>
        </div>
      </div>
      <div
        className={
          isShowComment
            ? "history-order-item-right d-block"
            : "history-order-item-right"
        }
      >
        <div className="history-order-item-right-comment">
          <div className="history-order-item-right-error">{mess && mess}</div>
          <div>
            <div>
              <i
                className={
                  rate === 1 || rate > 1
                    ? "fa-solid fa-star rated"
                    : "fa-solid fa-star"
                }
                onClick={() => handleSetRate(1)}
              ></i>
              <i
                className={
                  rate === 2 || rate > 2
                    ? "fa-solid fa-star rated"
                    : "fa-solid fa-star"
                }
                onClick={() => handleSetRate(2)}
              ></i>
              <i
                className={
                  rate === 3 || rate > 3
                    ? "fa-solid fa-star rated"
                    : "fa-solid fa-star"
                }
                onClick={() => handleSetRate(3)}
              ></i>
              <i
                className={
                  rate === 4 || rate > 4
                    ? "fa-solid fa-star rated"
                    : "fa-solid fa-star"
                }
                onClick={() => handleSetRate(4)}
              ></i>
              <i
                className={
                  rate === 5 ? "fa-solid fa-star rated" : "fa-solid fa-star"
                }
                onClick={() => handleSetRate(5)}
              ></i>
            </div>
          </div>
          <Form>
            <Form.Label>Binh luan :</Form.Label>
            <Form.Control
              as={"textarea"}
              rows="3"
              onChange={(e) => handleChangeComment(e)}
              value={comment}
            />
            <Button
              className="w-50  my-2"
              onClick={() => handleToggleShowModal()}
              variant="success"
            >
              {" "}
              Dang
            </Button>
            <Button
              className="w-50  my-2"
              onClick={() => {
                setIsShowComment(false);
                setMess("");
              }}
              variant="danger"
            >
              {" "}
              Dong
            </Button>
          </Form>
        </div>
      </div>
      <Modal show={isShowMoadel} onHide={() => setIsShowMoadel(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Ban muon danh gia san pham nay chu {product.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="success" onClick={() => handleComment(product._id)}>
            Nhan xet
          </Button>
          <Button variant="danger" onClick={() => setIsShowMoadel(false)}>
            Huy
          </Button>
        </Modal.Footer>
      </Modal>
      <Toast
        show={isShowToats}
        autohide
        delay={3000}
        bg={"success"}
        className="history-item-toats"
        onClose={() => setIsShowToats(false)}
      >
        <Toast.Header>Danh gia thanh cong</Toast.Header>
      </Toast>
    </div>
  );
}
const mapStateToProps = (state) => ({
  infoReview: state.productCreateReview,
});

export default connect(mapStateToProps, { createProductReview })(
  HistoryOrderItem
);
