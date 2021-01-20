import { profileConstant } from "./constant";
import initialAxios from "../../helpers/axios";

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: profileConstant.GET_USER_PROFILE_REQUEST,
    });

    const res = await initialAxios.get("/profile");
    dispatch({
      type: profileConstant.GET_USER_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: profileConstant.GET_USER_PROFILE_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const updateUserProfile = (data) => async (dispatch) => {
  try {
    dispatch({
      type: profileConstant.UPDATE_USER_PROFILE_REQUEST,
    });

    const res = await initialAxios.put("/profile", data);
    dispatch({
      type: profileConstant.UPDATE_USER_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: profileConstant.UPDATE_USER_PROFILE_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};
