import {
  ORDER_CREATE_NEW_ITEM_FAIL,
  ORDER_CREATE_NEW_ITEM_REQUEST,
  ORDER_CREATE_NEW_ITEM_SUCCESS,
  ORDER_GET_UESR_FAIL,
  ORDER_GET_UESR_REQUEST,
  ORDER_GET_UESR_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_TO_PAY_FAIL,
  ORDER_UPDATE_TO_PAY_SUCCESS,
} from "../contants/orderContant";

export const addNewOrderItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_NEW_ITEM_REQUEST:
      return {
        isLoading: true,
      };

    case ORDER_CREATE_NEW_ITEM_SUCCESS:
      return {
        isLoading: false,
        order: action.payload,
      };

    case ORDER_CREATE_NEW_ITEM_FAIL:
      return {
        isLoading: true,
        mess: action.payload,
      };

    default:
      return state;
  }
};


export const updateOrderToPayReducer = (state = {}, action) => {
    switch (action.type) {
  
      case ORDER_UPDATE_TO_PAY_SUCCESS:
        return {
          isLoading: false,
          order: action.payload,
        };
  
      case ORDER_UPDATE_TO_PAY_FAIL:
        return {
          isLoading: true,
          mess: action.payload,
        };
  
      default:
        return state;
    };
};

export const updateOrderAfterBuyReducer = (state = {}, action) => {
  switch (action.type) {

    case ORDER_UPDATE_REQUEST:
      return {
        isLoading: true,
      }

    case ORDER_UPDATE_SUCCESS:
      return {
        isLoading: false,
        order: action.payload,
      };

    case ORDER_UPDATE_FAIL:
      return {
        isLoading: true,
        mess: action.payload,
      };

    default:
      return state;
  };
};

//get order items 
export const getUserOrderItemsReducer = (state = {}, action) => {
  switch (action.type) {

    case ORDER_GET_UESR_REQUEST:
      return {
        isLoading: true,
      }

    case ORDER_GET_UESR_SUCCESS:
      return {
        isLoading: false,
        order: action.payload,
      };

    case ORDER_GET_UESR_FAIL:
      return {
        isLoading: true,
        mess: action.payload,
      };

    default:
      return state;
  };
};

