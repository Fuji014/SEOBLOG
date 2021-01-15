import { authConstants } from "./constant";
import initialAxios from "../../helpers/axios";
import cookie from "js-cookie";

export const userSignup = (data) => async (dispatch) => {
  try {
    dispatch({
      type: userConstants.AUTH_SIGNUP_REQUEST,
    });

    const res = await initialAxios.post("/signup", data);

    // authenticate user
    authenticate(res.data);

    dispatch({
      type: authConstants.AUTH_SIGNUP_SUCCESS,
      payload: res.data.user,
    });
  } catch (error) {
    dispatch({
      type: authConstants.AUTH_SIGNUP_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const userSignupReset = () => (dispatch) => {
  dispatch({
    type: authConstants.AUTH_SIGNUP_RESET,
  });
};

export const userLogin = (data) => async (dispatch) => {
  try {
    dispatch({
      type: authConstants.AUTH_LOGIN_REQUEST,
    });

    const res = await initialAxios.post("/signin", data);

    // authenticate user
    authenticate(res.data);

    dispatch({
      type: authConstants.AUTH_LOGIN_SUCCESS,
      payload: res.data.user,
    });
  } catch (error) {
    dispatch({
      type: authConstants.AUTH_LOGIN_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const userLoginReset = () => (dispatch) => {
  dispatch({
    type: authConstants.AUTH_LOGIN_RESET,
  });
};

export const userSignOut = () => async (dispatch) => {
  try {
    dispatch({
      type: authConstants.AUTH_SIGNOUT_REQUEST,
    });

    const res = await initialAxios.get("/signout");

    // clear
    removeCookie("token");
    removeLocalStorage("user");

    dispatch({
      type: authConstants.AUTH_SIGNOUT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: authConstants.AUTH_SIGNOUT_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const userSignOutReset = () => (dispatch) => {
  dispatch({
    type: authConstants.AUTH_SIGNOUT_RESET,
  });
};

// set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// remove cookie
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// get cookie
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

// set localStorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove localStorage
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// get localstorage
export const getLocalStorage = (key) => {
  if (process.browser) {
    return localStorage.getItem(key);
  }
};

// authenticate user by passing data to cookie and localstorage
export const authenticate = (data) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
};

// get auth user
export const isAuth = () => {
  if (process.browser) {
    const cookieCheck = getCookie("token");
    if (cookieCheck) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};
