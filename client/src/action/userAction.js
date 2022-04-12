import axios from "axios";
import { URL } from "../contants/GlobalContains";
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
import authAccessToken from "../utils/authAccessToken";

export const loginUser = (loginForm) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const response = await axios.post(
      `${URL}/api/users/login`,
      loginForm
    );

    if (response)
      localStorage.setItem("accessToken", response.data.accessToken);

    dispatch(authUser());

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerUser = (registerForm) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const response = await axios.post(
      `${URL}/api/users/register`,
      registerForm
    );

    if (response)
      localStorage.setItem("accessToken", response.data.accessToken);

    dispatch(authUser());

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: response.data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const authUser = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_AUTH_REQUEST,
    });

    if (localStorage.getItem("accessToken")) {
      authAccessToken(localStorage.getItem("accessToken"));
    }

    const response = await axios.get(`${URL}/api/users/profile`);

    dispatch({
      type: USER_AUTH_SUCCESS,
      payload: response.data.user,
    });
  } catch (error) {
    localStorage.removeItem("accessToken");
    authAccessToken(null);
    dispatch({
      type: USER_AUTH_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//@des user update profile
export const updateUser = (userForm) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const response = await axios.put(
      `${URL}/api/users/profile`,
      userForm
    );

    dispatch(authUser());

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: response.data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//@des user logout

export const logoutUser = () => dispatch => {
  localStorage.removeItem('accessToken');

  document.location.href = '/login';
};



//ADMIN


//@des admin get user all
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_GET_USERS_REQUEST,
    });

    const response = await axios.get(`${URL}/api/users/admin`);

    dispatch({
      type: ADMIN_GET_USERS_SUCCESS,
      payload: response.data.users,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_USERS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//admin update profile user
export const adminUpdateUser = (userForm) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_USERS_REQUEST,
    });

    const response = await axios.put(
      `${URL}/api/users/admin/${userForm._id}`,
      userForm
    );

    dispatch(getAllUsers());

    dispatch({
      type: ADMIN_UPDATE_USERS_SUCCESS,
      payload: response.data.user,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_USERS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//@des delete user

export const adminDeleteUser = (userForm) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_DELETE_USERS_REQUEST,
    });

    const response = await axios.delete(
      `${URL}/api/users/admin/${userForm._id}`
    );

    dispatch(getAllUsers());

    dispatch({
      type: ADMIN_DELETE_USERS_SUCCESS,
      payload: response.data.user,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_USERS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
