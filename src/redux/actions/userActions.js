import axios from "axios";
import { API } from "../../utils/constants";
import {
  CREATE_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ROLES_FAILURE,
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_USER_BY_USERNAME_FAILURE,
  GET_USER_BY_USERNAME_REQUEST,
  GET_USER_BY_USERNAME_SUCCESS,
  LOGOUT,
  REMOVE_CREATED_USER,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../actionTypes";

// generic mentod to get error messages
const errorPayload = (error) => {
  const errorResponse =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  // console.log(error.response.data);
  return errorResponse;
};

// login action
export const loginAction = (username, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  try {
    const response = await axios.post(API.AUTHENICATE, { username, password });

    // console.log(response.data);
    localStorage.setItem("jwt", JSON.stringify(response.data.jwt));
    localStorage.setItem("username", JSON.stringify(response.data.username));

    dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: errorPayload(error),
    });
  }
};

// get all users action
export const getAllUsersAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_USERS_REQUEST });
  const token = JSON.parse(localStorage.getItem("jwt"));
  try {
    const response = await axios.get(API.GET_ALL_USERS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(response.data);

    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAILURE,
      payload: errorPayload(error),
    });
  }
};

// create a new user action
export const createUserAction =
  (email, fullName, roleId) => async (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST });

    const token = JSON.parse(localStorage.getItem("jwt"));
    try {
      const response = await axios.post(
        API.CREATE_USER,
        { emailAddress: email, fullName, roleId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response.data);

      dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: CREATE_USER_FAILURE,
        payload: errorPayload(error),
      });
    }
  };

// get user by username
export const getByUsernameAction = (username) => async (dispatch) => {
  // console.log("username=>", username);
  dispatch({ type: GET_USER_BY_USERNAME_REQUEST });

  const token = JSON.parse(localStorage.getItem("jwt"));
  // console.log(token);
  try {
    const response = await axios.post(
      API.GET_USER_BY_USERNAME,
      { username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: GET_USER_BY_USERNAME_SUCCESS, payload: response.data });
    // console.log(response.data.role.roleId);

    dispatch({
      type: GET_USER_BY_USERNAME_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_BY_USERNAME_FAILURE,
      payload: errorPayload(error),
    });
    // console.log(
    //   "error=>",
    //   error.response && error.response.data.message
    //     ? error.response.data.message
    //     : error.message
    // );
  }
};

// delete user action
export const deleteUserAction = (userId) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });

  const token = JSON.parse(localStorage.getItem("jwt"));
  try {
    const response = await axios.delete(
      `${API.DELETE_USER}/${userId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: DELETE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILURE,
      payload: errorPayload(error),
    });
  }
};

// get role action
export const getRolesAction = () => async (dispatch) => {
  dispatch({ type: GET_ROLES_REQUEST });

  const token = JSON.parse(localStorage.getItem("jwt"));
  try {
    const response = await axios.get(API.GET_ALL_ROLES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: GET_ROLES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_ROLES_FAILURE,
      payload: errorPayload(error),
    });
  }
};

// reset password action
export const resetPasswordAction = (password, code) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });

  // console.log(`http://localhost:8080/api/v1/users/activate/${code}`);
  try {
    const response = await axios.put(`${API.RESET_PASSWORD_SUBSTR}/${code}`, {
      password: password,
    });
    // console.log(response);
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAILURE,
      payload: errorPayload(error),
    });
  }
};

// remove created user
export const removeCreatedUserAction = () => async (dispatch) => {
  dispatch({ type: REMOVE_CREATED_USER });
};

// logout action
export const logoutAction = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("jwt");
  localStorage.removeItem("username");
};
