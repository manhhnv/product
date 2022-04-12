import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";

import { authUser } from "./action/userAction";
import Layout from "./component/Layout/Layout";
import "./app.scss";
import Customer from "./component/Customer/Home/Customer";
import AdminProtected from "./component/Protected/adminProtected";
import CustomerProtected from "./component/Protected/customerProtected";
import UsersPage from "./component/Admin/UsersPage/UsersPage";
import ProductsPage from "./component/Admin/ProductsPage/ProductsPage";
import SmartPhonePage from "./component/Admin/Product/ProductPage/SmartPhonePage";
import LaptopPage from "./component/Admin/Product/ProductPage/LaptopPage";
import WatchPage from "./component/Admin/Product/ProductPage/WatchPage";
import AccessoryPage from "./component/Admin/Product/ProductPage/AccessoryPage";
import Smartphone from "./component/Customer/SmartPhone/Smartphone";
import Watch from "./component/Customer/Watch/Watch";
import Laptop from "./component/Customer/Laptop/Laptop";
import Accessory from "./component/Customer/Accessory/Accessory";
import DetailProduct from "./component/Customer/DetailProduct/DetailProduct";
import DetailItem from "./component/Customer/DetailItem/DetailItem";
import HistoryOrder from "./component/Customer/HistoryOrder/HistoryOrder";
import Order from "./component/Customer/Order/Order";

function App({ authUser }) {
  useEffect(() => {
    authUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/:paramId" />
      </Route>

      <Route path="admin" element={<AdminProtected />}>
        <Route path="users" element={<UsersPage />} />
        <Route path="products" element={<ProductsPage />}>
          <Route index path="smartphone" element={<SmartPhonePage />} />
          <Route path="laptop" element={<LaptopPage />} />
          <Route path="watch" element={<WatchPage />} />
          <Route path="accessory" element={<AccessoryPage />} />
        </Route>
      </Route>

      <Route path="customer" element={<CustomerProtected />}>
        <Route index element={<Customer />} />
        <Route path="smartphone" element={<Smartphone />}></Route>
        <Route path="watch" element={<Watch />} />
        <Route path="laptop" element={<Laptop />} />
        <Route path="accessory" element={<Accessory />} />
        <Route path="historyOrder" element={<HistoryOrder />} />
        <Route path="order" element={<Order />} />
        <Route path="detail" element={<DetailProduct />}>
          <Route path=":detailParams" element={<DetailItem />} />
        </Route>
      </Route>
      <Route path="*" element={<Layout />} />
    </Routes>
  );
}

const mapStateToProp = (state) => ({
  infoAuthUser: state.userAuth,
});

export default connect(mapStateToProp, {
  authUser,
})(App);
