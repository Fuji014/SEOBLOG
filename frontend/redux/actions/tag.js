import { tagConstants } from "./constant";
import initialAxios from "../../helpers/axios";

export const getAllTag = () => async (dispatch) => {
  try {
    dispatch({
      type: tagConstants.GET_ALL_TAG_REQUEST,
    });

    const res = await initialAxios.get("/tag");

    dispatch({
      type: tagConstants.GET_ALL_TAG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: tagConstants.GET_ALL_TAG_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const createTag = (data) => async (dispatch) => {
  try {
    dispatch({
      type: tagConstants.CREATE_TAG_REQUEST,
    });

    const res = await initialAxios.post("/tag", data);

    dispatch({
      type: tagConstants.CREATE_TAG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: tagConstants.CREATE_TAG_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const deleteTag = (data) => async (dispatch) => {
  try {
    dispatch({
      type: tagConstants.DELETE_TAG_REQUEST,
    });

    const res = await initialAxios.delete(`/tag/${data}`);
    dispatch({
      type: tagConstants.DELETE_TAG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: tagConstants.DELETE_TAG_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};
