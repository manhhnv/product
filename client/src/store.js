import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  adminDeleteUsersReducer,
  adminGetUsersReducer,
  adminUpdateUsersReducer,
  userAuthReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducer/userReducer";
import {
  createProductReducer,
  createProductReviewReducer,
  deleteProductReducer,
  getAllProductReducer,
  getHotProductReducer,
  getProductByIdReducer,
  getTopProductReducer,
  updateProductReducer,
} from "./reducer/productReducer";
import { activeGlobalReducer } from "./reducer/globalReducer";
import { cartReducer } from "./reducer/cartReducer";
import {
  addNewOrderItemsReducer,
  getUserOrderItemsReducer,
  updateOrderAfterBuyReducer,
  updateOrderToPayReducer,
} from "./reducer/orderReducer";

const initailState = {};

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userAuth: userAuthReducer,
  userUpdate: userUpdateProfileReducer,
  adminGetUsers: adminGetUsersReducer,
  adminUpdateUsers: adminUpdateUsersReducer,
  adminDeleteUsers: adminDeleteUsersReducer,
  productCreate: createProductReducer,
  productRead: getAllProductReducer,
  productUpdate: updateProductReducer,
  productDelete: deleteProductReducer,
  productGetTop: getTopProductReducer,
  productGetHot: getHotProductReducer,
  productGetById: getProductByIdReducer,
  productCreateReview : createProductReviewReducer,
  globalActive: activeGlobalReducer,
  cartReducer: cartReducer,
  orderAdd: addNewOrderItemsReducer,
  orderPay: updateOrderToPayReducer,
  orderUpdate : updateOrderAfterBuyReducer,
  orderGetUser : getUserOrderItemsReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initailState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
