import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  CART_GET_ITEMS,
  CART_MINUS_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../contants/cartContains";

export const addProductToCart = (product) => (dispatch) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: product,
  });
};

export const deleteProductFromCart = (id) => (dispatch) => {
  dispatch({
    type: CART_DELETE_ITEM,
    payload: id,
  });
};

export const minusProductFromCart = (id) => (dispatch) => {
  dispatch({
    type: CART_MINUS_ITEM,
    payload: id,
  });
};

export const saveShippingAddress = (addressForm)=> dispatch => {
  dispatch({
    type : CART_SAVE_SHIPPING_ADDRESS,
    payload : addressForm,
  });
};

export const getOrderItems = (products) => dispatch => {
  dispatch({
    type : CART_GET_ITEMS,
    payload : products,
  })
};
