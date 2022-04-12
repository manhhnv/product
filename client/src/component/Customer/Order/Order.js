import React, { useEffect, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FormikFormAddress from "../FormikFormAddress/FormmikFormAddress";

import {
  addNewOrderItems,
  updateOrderAfterBuy,
} from "../../../action/orderAction";
import { saveShippingAddress, getOrderItems } from "../../../action/cartAction";
import OrderItem from "../OrderItem/OrderItem";
import "./Order.scss";
import ShippingAddress from "../ShippingAddress/ShippingAddress";
import Total from "../Total/Total";

function Order({
  infoOrderItems,
  infoCart,
  infoAuthUser,
  saveShippingAddress,
  addNewOrderItems,
  getOrderItems,
  updateOrderAfterBuy,
}) {
  const TAXPRECENT = 0.5;
  const shippingPrice = 20000;

  const { order } = infoOrderItems;
  const { cartItems, shippingAddress } = infoCart;
  const { user } = infoAuthUser;
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("tien mat");
  const [isShowFrom, setIsShowFrom] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [addressForm, setAddressForm] = useState({
    address: shippingAddress.address || "",
    city: shippingAddress.city || "",
    country: shippingAddress.country || "",
  });

  useEffect(() => {
    cartItems.length === 0 &&
      localStorage.setItem(user._id, JSON.stringify([]));
    cartItems.length !== 0 && setProducts(cartItems);
  }, [cartItems]);

  useEffect(() => {
    const newProduct =
      products.length !== 0 && products.filter((item) => item.isOrder !== true);
    if (newProduct) localStorage.setItem(user._id, JSON.stringify(newProduct));
  }, [products]);

  useEffect(() => {
    addressForm.address !== "" &&
      localStorage.setItem(`${user._id}-address`, JSON.stringify(addressForm));
  }, [addressForm]);

  useEffect(() => {
    const newProduct =
      products.length !== 0 && products.filter((item) => item.isOrder === true);

    setOrderItems(newProduct || []);
  }, [products]);

  const handleSetProducts = (id, type) => {
    const newProduct =
      cartItems.length !== 0 &&
      cartItems.map((item) => {
        if (item._id === id) {
          item.isOrder = type;
        }

        return item;
      });

    setProducts(newProduct);
  };

  const handleChangeAddressForm = (form) => {
    setAddressForm(form);
    saveShippingAddress(form);
    setIsShowFrom(false);
  };

  const handlePaymentMethod = (type) => {
    setPaymentMethod(type);
  };

  const totalPrice =
    orderItems.length !== 0
      ? orderItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      : 0;

  const sumPrice = totalPrice * (1 + TAXPRECENT) + shippingPrice;

  const handleOrderProducts = () => {
    if (orderItems.length === 0) {
      setIsShowModal(true);
    } else {
      // console.log(orderItems);
      const newOrderItems = orderItems.map((item) => ({
        ...item,
        product: item._id,
      }));

      const form = {
        orderItems: newOrderItems,
        shippingAddress: addressForm,
        paymentMethod,
        taxPrice: TAXPRECENT,
        shippingPrice,
        totalPrice: sumPrice,
      };

      // console.log(form);

      if (!order) {
        addNewOrderItems(form);
      } else {
        updateOrderAfterBuy(form, order._id);
      }
    }

    getOrderItems(JSON.parse(localStorage.getItem(user._id)));
  };

  let body;

  if (cartItems.length === 0) {
    body = (
      <div className="order-empty">
        <h3>Ban chua chon san pham nao !!!</h3>
        <Link to={`..`}>
          <Button variant="success">Bat dau mua sam</Button>
        </Link>
      </div>
    );
  } else {
    body = (
      <>
        <div className="order-left">
          {cartItems.map((item) => (
            <OrderItem
              key={item._id}
              product={item}
              onCheck={handleSetProducts}
            />
          ))}
        </div>
        <div className="order-right">
          <div className="order-right-title">
            <h5>Dia chi giao hang :</h5>
            <Button onClick={() => setIsShowFrom(true)}>Chinh sua</Button>
          </div>
          {(addressForm.address === "" || isShowFrom) && (
            <FormikFormAddress
              addressFrom={addressForm}
              onSetAddressForm={handleChangeAddressForm}
            />
          )}
          {addressForm.address !== "" && !isShowFrom && (
            <ShippingAddress form={addressForm} />
          )}
          <Total
            total={totalPrice}
            shippingPrice={shippingPrice}
            tax={TAXPRECENT}
            sumPrice={sumPrice}
            onPaymentMethod={handlePaymentMethod}
          />
          <Button
            variant="danger"
            className="w-100 my-2"
            onClick={() => handleOrderProducts()}
          >
            Dat hang ({orderItems.length})
          </Button>
        </div>
      </>
    );
  }

  return (
    <Container className="Order-container">
      <h3 className="order-title">Gio Hang cua ban :</h3>
      <div className="order-content">{body}</div>
      <Modal show={isShowModal} onHide={() => setIsShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ban hay chon san pham can mua</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="success" onClick={() => setIsShowModal(false)}>
            Dong
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  infoCart: state.cartReducer,
  infoAuthUser: state.userAuth,
  infoOrderItems: state.orderGetUser,
});

export default connect(mapStateToProps, {
  saveShippingAddress,
  addNewOrderItems,
  getOrderItems,
  updateOrderAfterBuy,
})(Order);
