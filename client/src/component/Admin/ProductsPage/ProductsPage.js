import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Button,
  Container,
  OverlayTrigger,
  Spinner,
  Toast,
  Tooltip,
} from "react-bootstrap";
import { connect } from "react-redux";

import plusIcon from "../../../image/clipboard2-plus-fill.svg";
import Productmodal from "../ProductModal/ProductModal";
import { getAllProduct } from "../../../action/productAction";
import "./productPage.scss";

function ProductsPage({ infoAllProduct,infoUpdateProd }) {
  const [isShowProductModal, setIsShowProductModal] = useState(false);
  const [isShowEditToast, setisShowEditToast] = useState(false);
  const [active, setActive] = useState("");

  const { loading } = infoAllProduct;

  const {product} = infoUpdateProd;

  useEffect(() => {
   if(product && product.name){
     setisShowEditToast(true);
   }
  }, [product]);

  const handleToggleShowProductModal = () => {
    setIsShowProductModal(!isShowProductModal);
  };

  const HandleClickLink = (name) => {
    setActive(name);
  };

  let body;

  if (loading) {
    body = (
      <Spinner
        animation="border"
        className="spinner-product"
        variant="danger"
      />
    );
  } else {
    body = (
      <Container>
        <div className="produce-navbar">
          <Link
            to="smartphone"
            className={
              active === "smartphone" ? `produce-link active` : "produce-link"
            }
            onClick={() => HandleClickLink("smartphone")}
          >
            <div>Dien thoai thong minh</div>
          </Link>
          <Link
            to="laptop"
            className={
              active === "laptop" ? `produce-link active` : "produce-link"
            }
            onClick={() => HandleClickLink("laptop")}
          >
            <div>Laptop</div>
          </Link>
          <Link
            to="watch"
            className={
              active === "watch" ? `produce-link active` : "produce-link"
            }
            onClick={() => HandleClickLink("watch")}
          >
            <div>Dong ho</div>
          </Link>
          <Link
            to="accessory"
            className={
              active === "accessory" ? `produce-link active` : "produce-link"
            }
            onClick={() => HandleClickLink("accessory")}
          >
            <div>Phu kien</div>
          </Link>
        </div>

        {!active && (
          <h3 className="title-product">Hay chon danh muc san pham ben tren</h3>
        )}

        <div>
          <OverlayTrigger
            placement="left"
            overlay={
              <Tooltip id="tooltip-1">Them san pham moi tai day</Tooltip>
            }
          >
            <Button
              variant="light"
              className="btn-plus"
              onClick={() => handleToggleShowProductModal()}
            >
              <img src={plusIcon} alt="Them san pham" className="plus-icon" />
            </Button>
          </OverlayTrigger>
        </div>
        {isShowProductModal && (
          <Productmodal
            isShow={isShowProductModal}
            onClose={handleToggleShowProductModal}
          />
        )}
      </Container>
    );
  }

  return (
    <div>
      {body}
      {
        isShowEditToast && 
        <Toast
          show={isShowEditToast}
          onClose={() => setisShowEditToast(false)}
          delay={2000}
          autohide
          bg="success"
          className="product-toast"
        >
          <Toast.Header>
            Cap nhap san pham thanh cong
          </Toast.Header>
        </Toast>
      }
      <Outlet />
    </div>
  );
}

const mapStateToProps = (state) => ({
  infoAllProduct: state.productRead,
  infoUpdateProd : state.productUpdate,
});

export default connect(mapStateToProps, { getAllProduct })(ProductsPage);
