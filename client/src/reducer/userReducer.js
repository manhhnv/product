import {
  ADMIN_DELETE_USERS_FAIL,
  ADMIN_DELETE_USERS_REQUEST,
  ADMIN_DELETE_USERS_SUCCESS,
  ADMIN_GET_USERS_FAIL,
  ADMIN_GET_USERS_REQUEST,
  ADMIN_GET_USERS_SUCCESS,
  ADMIN_UPDATE_USERS_FAIL,
  ADMIN_UPDATE_USERS_REQUEST,
  ADMIN_UPDATE_USERS_SUCCESS,
  USER_AUTH_FAIL,
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../contants/userContant";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loginLoading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        loginLoading: false,
        data: action.payload,
      };

    case USER_LOGIN_FAIL:
      return {
        loginLoading: false,
        messError: action.payload,
      };

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        registerLoading: true,
      };

    case USER_REGISTER_SUCCESS:
      return {
        registerLoading: false,
        data: action.payload,
      };

    case USER_REGISTER_FAIL:
      return {
        registerLoading: false,
        messError: action.payload,
      };

    default:
      return state;
  }
};

export const userAuthReducer = (state = {user : {}}, action) => {
  switch (action.type) {
    case USER_AUTH_REQUEST:
      return {
        authLoading: true,
      };

    case USER_AUTH_SUCCESS:
      return {
        authLoading: false,
        user: action.payload,
      };

    case USER_AUTH_FAIL:
      return {
        authLoading: false,
        messError: action.payload,
      };

    default:
      return state;
  }
};

// user update profile

export const userUpdateProfileReducer = (state = {user : {}}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        updateLoading: true,
      };

    case USER_UPDATE_SUCCESS:
      return {
        updateLoading: false,
        user: action.payload,
      };

    case USER_UPDATE_FAIL:
      return {
        updateLoading: false,
        messError: action.payload,
      };

    default:
      return state;
  }
};

// admin get user all
export const adminGetUsersReducer = (state = {users : [] }, action) => {
  switch (action.type) {
    case ADMIN_GET_USERS_REQUEST:
      return {
        ...state,
        getUsersLoading: true,
      };

    case ADMIN_GET_USERS_SUCCESS:
      return {
        getUsersLoading: false,
        users: action.payload,
      };

    case ADMIN_GET_USERS_FAIL:
      return {
        ...state,
        getUsersLoading: false,
        messError: action.payload,
      };

    default:
      return state;
  }
};

//admin update user
export const adminUpdateUsersReducer = (state = {user : {} }, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_USERS_REQUEST:
      return {
        ...state,
        updateUsersLoading: true,
      };

    case ADMIN_UPDATE_USERS_SUCCESS:
      return {
        updateEUsersLoading: false,
        user: action.payload,
      };

    case ADMIN_UPDATE_USERS_FAIL:
      return {
        ...state,
        getUsersLoading: false,
        messError: action.payload,
      };

    default:
      return state;
  }
};

//delete
export const adminDeleteUsersReducer = (state = {user : {} }, action) => {
  switch (action.type) {
    case ADMIN_DELETE_USERS_REQUEST:
      return {
        ...state,
        deleteUsersLoading: true,
      };

    case ADMIN_DELETE_USERS_SUCCESS:
      return {
        deteteUsersLoading: false,
        user: action.payload,
      };

    case ADMIN_DELETE_USERS_FAIL:
      return {
        ...state,
        deleteUsersLoading: false,
        messError: action.payload,
      };

    default:
      return state;
  }
};
