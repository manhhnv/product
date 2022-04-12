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

export const getAllProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_ALL_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_ALL_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case PRODUCT_ALL_FAIL:
      return {
        loading: false,
        products: [],
      };

    default:
      return state;
  }
};

//@des creat product

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        createProductLoading: true,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        createProductLoading: false,
        product: action.payload,
      };

    case PRODUCT_CREATE_FAIL:
      return {
        createProductLoading: false,
        errorMes: action.payload,
      };

    default:
      return state;
  }
};

//@des admin update a product

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        updateProductLoading: true,
      };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        updateProductLoading: false,
        product: action.payload,
      };

    case PRODUCT_UPDATE_FAIL:
      return {
        updateProductLoading: false,
        errorMes: action.payload,
      };

    default:
      return state;
  }
};

//@des admin delete a product

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        deleteProductLoading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        deleteProductLoading: false,
        product: action.payload,
      };

    case PRODUCT_DELETE_FAIL:
      return {
        deleteProductLoading: false,
        errorMes: action.payload,
      };

    default:
      return state;
  }
};

//@des get top 6 product hot

export const getTopProductReducer = (state = {products : []}, action) => {
  switch (action.type) {
    case PRODUCT_GET_TOP_REQUEST:
      return {
        ...state,
        getTopProductLoading: true,
      };
    case PRODUCT_GET_TOP_SUCCESS:
      return {
        getTopProductLoading: false,
        products: action.payload,
      };

    case PRODUCT_GET_TOP_FAIL:
      return {
        ...state,
        getTopProductLoading: false,
        errorMes: action.payload,
      };

    default:
      return state;
  }
};

//get products hot of each product
export const getHotProductReducer = (state = {products : []}, action) => {
  switch (action.type) {
    case PRODUCT_GET_HOT_REQUEST:
      return {
        ...state,
        getHotProductLoading: true,
      };
    case PRODUCT_GET_HOT_SUCCESS:
      return {
        getHotProductLoading: false,
        products: action.payload,
      };

    case PRODUCT_GET_HOT_FAIL:
      return {
        ...state,
        getHotProductLoading: false,
        errorMes: action.payload,
      };

    default:
      return state;
  }
};

//get products hot of each product
export const getProductByIdReducer = (state = {product: {}}, action) => {
  switch (action.type) {
    case PRODUCT_GET_BY_ID_REQUEST:
      return {
        ...state,
        getProductByIdLoading: true,
      };
    case PRODUCT_GET_BY_ID_SUCCESS:
      return {
        getProductByIdLoading: false,
        product: action.payload,
      };

    case PRODUCT_GET_BY_ID_FAIL:
      return {
        ...state,
        getProductByIdLoading: false,
        errorMes: action.payload,
      };

    default:
      return state;
  }
};

//create a new review
export const createProductReviewReducer = (state = {product: {}}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        isLoading: false,
        product: action.payload,
      };

    case PRODUCT_CREATE_REVIEW_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMes: action.payload,
      };

    default:
      return state;
  }
};


