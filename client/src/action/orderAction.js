import axios from "axios";
import { URL } from "../contants/GlobalContains";
import {
  ORDER_CREATE_NEW_ITEM_FAIL,
  ORDER_CREATE_NEW_ITEM_REQUEST,
  ORDER_CREATE_NEW_ITEM_SUCCESS,
  ORDER_GET_UESR_FAIL,
  ORDER_GET_UESR_REQUEST,
  ORDER_GET_UESR_SUCCESS,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_TO_PAY_FAIL,
  ORDER_UPDATE_TO_PAY_SUCCESS,
} from "../contants/orderContant";

export const addNewOrderItems = (form) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CREATE_NEW_ITEM_REQUEST,
    });

    const response = await axios.post(`${URL}/api/orders`, form);

    dispatch({
      type: ORDER_CREATE_NEW_ITEM_SUCCESS,
      payload: response.data.order,
    });

    dispatch(updateOrderToPay(response.data.order._id));

    dispatch(getUserOrderItems());
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_NEW_ITEM_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.messgase
          : error.messgase,
    });
  }
};

export const updateOrderToPay = (id) => async dispatch => {
    try {
        const response = await axios.put(`${URL}/api/orders/${id}/pay`);
        dispatch({
            type : ORDER_UPDATE_TO_PAY_SUCCESS,
            payload: response.data.order,
        })
    } catch (error) {
        dispatch({
            type : ORDER_UPDATE_TO_PAY_FAIL,
            payload:
            error.response && error.response.data
              ? error.response.data.messgase
              : error.messgase,
        });
    }
};

export const updateOrderAfterBuy = (form,id) => async dispatch => {
    try {
        dispatch({
            type : ORDER_UPDATE_REQUEST,
        });
        const response = await axios.put(`${URL}/api/orders/${id}`, form);

        dispatch(getUserOrderItems());

        dispatch({
            type : ORDER_UPDATE_SUCCESS,
            payload : response.data.order,
        });
    } catch (error) {
        dispatch({
            type : ORDER_UPDATE_TO_PAY_FAIL,
            payload:
            error.response && error.response.data
              ? error.response.data.messgase
              : error.messgase,
        });
    };
};

//get history order
export const getUserOrderItems = () => async dispatch => {
    try {
        dispatch({
            type : ORDER_GET_UESR_REQUEST,
        });
        const response = await axios.get(`${URL}/api/orders`);

        dispatch({
            type : ORDER_GET_UESR_SUCCESS,
            payload : response.data.order,
        });
    } catch (error) {
        dispatch({
            type : ORDER_GET_UESR_FAIL,
            payload:
            error.response && error.response.data
              ? error.response.data.messgase
              : error.messgase,
        });
    };
};
