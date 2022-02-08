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
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../actionTypes";

const initialState = {
  isAuth: localStorage.getItem("jwt") ? true : false,
  loading: false,
  error: null,
  jwt: localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt"))
    : null,
  username: localStorage.getItem("username")
    ? JSON.parse(localStorage.getItem("username"))
    : null,
  createdUser: null,
  deletedUser: null,
  userId: null,
  users: null,
  roles: null,
  roleId: null,
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        jwt: action.payload.jwt,
        username: action.payload.username,
      };
    case USER_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_ALL_USERS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case GET_ALL_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_USER_REQUEST:
      return { ...state, loading: true };
    case CREATE_USER_SUCCESS:
      return { ...state, loading: false, createdUser: action.payload };
    case CREATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_USER_REQUEST:
      return { ...state, loading: true };
    case DELETE_USER_SUCCESS:
      return { ...state, loading: false, deletedUser: action.payload };
    case DELETE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_ROLES_REQUEST:
      return { ...state, loading: true };
    case GET_ROLES_SUCCESS:
      return { ...state, loading: false, roles: action.payload };
    case GET_ROLES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_USER_BY_USERNAME_REQUEST:
      return { ...state, loading: true };
    case GET_USER_BY_USERNAME_SUCCESS:
      return {
        ...state,
        loading: false,
        userId: action.payload.userId,
        roleId: action.payload.role.roleId,
      };
    case GET_USER_BY_USERNAME_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case REMOVE_CREATED_USER:
      return { ...state, createdUser: null };
    case LOGOUT:
      return { user: [], users: [], isAuth: false };
    default:
      return state;
  }
};
