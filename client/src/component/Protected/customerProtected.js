import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../Customer/Footer/Footer";
import Header from "../Customer/HeaderCustomer/Header";
import { getOrderItems, saveShippingAddress } from "../../action/cartAction";
import {getUserOrderItems} from '../../action/orderAction';

const CustomerProtected = ({ getOrderItems,saveShippingAddress,getUserOrderItems }) => {
  useEffect(() => {
    const products = localStorage.getItem(user._id)
      ? JSON.parse(localStorage.getItem(user._id))
      : [];
    if (products.length !== 0) {
      getOrderItems(products);
    }
  }, []);

  useEffect(() => {
    getUserOrderItems();
  }, []);

  useEffect(() => {
    const address = localStorage.getItem(`${user._id}-address`)
      ? JSON.parse(localStorage.getItem(`${user._id}-address`))
      : {};
    if (address.length !== 0) {
      saveShippingAddress(address);
    }
  }, []);

  const { user } = useSelector((state) => state.userAuth);
  return user && !user.isAdmin && user.username ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate to="../login" />
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  getOrderItems,
  saveShippingAddress,
  getUserOrderItems,
})(CustomerProtected);
