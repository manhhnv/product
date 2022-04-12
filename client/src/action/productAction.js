import axios from "axios";
import { URL } from "../contants/GlobalContains";
import {
  PRODUCT_ALL_FAIL,
  PRODUCT_ALL_REQUEST,
  PRODUCT_ALL_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_GET_BY_ID_FAIL,
  PRODUCT_GET_BY_ID_REQUEST,
  PRODUCT_GET_BY_ID_SUCCESS,
  PRODUCT_GET_HOT_FAIL,
  PRODUCT_GET_HOT_REQUEST,
  PRODUCT_GET_HOT_SUCCESS,
  PRODUCT_GET_TOP_FAIL,
  PRODUCT_GET_TOP_REQUEST,
  PRODUCT_GET_TOP_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../contants/productContants";

export const getAllProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_ALL_REQUEST,
    });

    const response = await axios.get(`${URL}/api/products`);

    dispatch({
      type: PRODUCT_ALL_SUCCESS,
      payload: response.data.all,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//@des create new a product

export const createNewProduct = (newProductForm) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const response = await axios.post(
      `${URL}/api/products`,
      newProductForm
    );

    dispatch(getAllProduct());

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: response.data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//@des admin updale a product
export const updateProduct = (updateProductForm) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const response = await axios.put(
      `${URL}/api/products/${updateProductForm._id}`,
      updateProductForm
    );

    dispatch(getAllProduct());

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: response.data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//admin delete a product
export const deleteProduct = (deleteProduct) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const response = await axios.delete(
      `${URL}/api/products/${deleteProduct._id}`
    );

    dispatch(getAllProduct());

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: response.data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//@des get top 6 product hot rate
export const getTopProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_GET_TOP_REQUEST,
    });

    const response = await axios.get(
      `${URL}/api/products/top`
    );

    dispatch({
      type: PRODUCT_GET_TOP_SUCCESS,
      payload: response.data.products,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_GET_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductHot = (keyword, num) => async dispatch => {
  try {
    dispatch({
      type : PRODUCT_GET_HOT_REQUEST,
    });

    const _num = num ? num : 0;

    const response =  await axios.get(`${URL}/api/products/hot?keyword=${keyword}&num=${_num}`);

    dispatch({
      type : PRODUCT_GET_HOT_SUCCESS,
      payload : response.data.products,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_GET_HOT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//des get product by id
export const getProductById = (id) => async dispatch => {
  try {
    dispatch({
      type : PRODUCT_GET_BY_ID_REQUEST,
    });

    const response =  await axios.get(`${URL}/api/products/${id}`);

    dispatch({
      type : PRODUCT_GET_BY_ID_SUCCESS,
      payload : response.data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_GET_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//create a reiview product 

export const createProductReview = (id,form) => async dispatch => {
  try {
    dispatch({
      type : PRODUCT_CREATE_REVIEW_REQUEST,
    });

    const response =  await axios.post(`${URL}/api/products/${id}/review`,form);

    dispatch({
      type : PRODUCT_CREATE_REVIEW_SUCCESS,
      payload : response.data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
