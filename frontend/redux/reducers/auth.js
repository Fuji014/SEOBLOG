import { authConstants } from "../actions/constant";

const initialState = {
  user: null,
  loading: false,
  success: false,
  error: null,
  userLogged: {
    userInfo: null,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.USER_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstants.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        userLogged: {
          userInfo: action.payload,
        },
        success: true,
        loading: false,
      };
    case authConstants.USER_SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case authConstants.USER_SIGNUP_RESET:
      return {
        ...state,
        user: null,
        loading: false,
        success: false,
        error: null,
      };
    case authConstants.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstants.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userLogged: {
          userInfo: action.payload,
        },
      };
    case authConstants.USER_LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case authConstants.USER_LOGIN_RESET:
      return {
        ...state,
        user: null,
        loading: false,
        success: false,
        error: null,
      };
    case authConstants.USER_SIGNOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstants.USER_SIGNOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userLogged: action.payload,
      };
    case authConstants.USER_SIGNOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case authConstants.USER_SIGNOUT_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
