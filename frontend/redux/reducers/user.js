import { userConstant } from "../actions/constant";

const initialState = {
  user: null,
  blog: [],
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstant.GET_PUBLIC_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstant.GET_PUBLIC_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        blog: action.payload.blog,
        loading: false,
      };
    case userConstant.GET_PUBLIC_USER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
