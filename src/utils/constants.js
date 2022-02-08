export const BASE_URL =
  process.env.NODE_ENV === "PROD"
    ? "https://emp-eval.herokuapp.com/api/v1"
    : "http://localhost:8080/api/v1";

export const PATHS = {
  LOGIN: "/",
  HOME: "/home",
  SIGNUP: "/signup",
  CREATE: "/create",
  USER_DETAILS: "/details/:id",
  USER_DETAILS_SUBSTR: "/details/",
  RESET_PASSWORD: "/reset-password/:code",
};

export const API = {
  AUTHENICATE: `${BASE_URL}/users/authenticate`,
  CREATE_USER: `${BASE_URL}/users/register`,
  GET_ALL_USERS: `${BASE_URL}/users/all`,
  GET_ALL_ROLES: `${BASE_URL}/roles`,
  GET_USER_BY_USERNAME: `${BASE_URL}/users`,
  GET_USER_BY_ID: `${BASE_URL}/users/:id`,
  UPDATE_USER: `${BASE_URL}/users/:id`,
  DELETE_USER: `${BASE_URL}/users`,
  RESET_PASSWORD_SUBSTR: `${BASE_URL}/users/activate`,
  RESET_PASSWORD: `${BASE_URL}/users/activate/:id`,
};
