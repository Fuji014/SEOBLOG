import { categoryConstants } from "./constant";
import initialAxios from "../../helpers/axios.js";

export const getAllCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: categoryConstants.GET_ALL_CATEGORY_REQUEST,
    });

    const res = await initialAxios.get("/category");

    dispatch({
      type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const createCategory = (data) => async (dispatch) => {
  try {
    dispatch({
      type: categoryConstants.CREATE_CATEGORY_REQUEST,
    });

    const res = await initialAxios.post("/category", data);
    dispatch({
      type: categoryConstants.CREATE_CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: categoryConstants.CREATE_CATEGORY_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const deleteCategory = (data) => async (dispatch) => {
  try {
    dispatch({
      type: categoryConstants.DELETE_CATEGORY_REQUEST,
    });

    const res = await initialAxios.delete(`/category/${data}`);

    dispatch({
      type: categoryConstants.DELETE_CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: categoryConstants.DELETE_CATEGORY_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};
