import initialAxios from "../../helpers/axios";
import profile from "../../pages/profile";
import { profileConstant } from "../actions/constant";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case profileConstant.GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case profileConstant.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case profileConstant.GET_USER_PROFILE_FAILURE:
      return {
        ...initialState,
        error: action.payload.error,
      };
    case profileConstant.UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case profileConstant.UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case profileConstant.UPDATE_USER_PROFILE_FAILURE:
      return {
        ...initialState,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default profileReducer;
