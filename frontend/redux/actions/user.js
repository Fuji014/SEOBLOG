import initialAxios from "../../helpers/axios";
import { userConstant } from "./constant";

export const getPublicUser = (username) => async (dispatch) => {
  try {
    dispatch({
      type: userConstant.GET_PUBLIC_USER_REQUEST,
    });

    const res = await initialAxios.get(`/user/${username}`);
    dispatch({
      type: userConstant.GET_PUBLIC_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: userConstant.GET_PUBLIC_USER_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};
