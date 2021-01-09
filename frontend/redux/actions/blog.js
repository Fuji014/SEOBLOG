import { blogContstants } from "./constant";
import initialAxios from "../../helpers/axios";

export const getAllBlog = (keyword = "", pageNumber = "") => async (
  dispatch
) => {
  try {
    dispatch({
      type: blogContstants.GET_ALL_BLOG_REQUEST,
    });

    const res = await initialAxios.get(
      `/blog?keyword=${keyword}&pageNumber=${pageNumber}`
    );
    dispatch({
      type: blogContstants.GET_ALL_BLOG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: blogContstants.GET_ALL_BLOG_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const deleteBlog = (data) => async (dispatch) => {
  try {
    dispatch({ type: blogContstants.DELETE_BLOG_REQUEST });

    const res = await initialAxios.delete(`/blog/${data}`);

    dispatch({
      type: blogContstants.DELETE_BLOG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: blogContstants.DELETE_BLOG_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const createBlog = () => async (dispatch) => {
  try {
    dispatch({
      type: blogContstants.CREATE_BLOG_REQUEST,
    });

    const res = await initialAxios.post("/blog", {});
    dispatch({
      type: blogContstants.CREATE_BLOG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: blogContstants.CREATE_BLOG_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const getSingleBlog = (data) => async (dispatch) => {
  try {
    dispatch({
      type: blogContstants.GET_SINGLE_BLOG_REQUEST,
    });

    const res = await initialAxios.get(`/blog/${data}`);
    dispatch({
      type: blogContstants.GET_SINGLE_BLOG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: blogContstants.GET_SINGLE_BLOG_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const updateBlog = (form, id) => async (dispatch) => {
  try {
    dispatch({
      type: blogContstants.UPDATE_BLOG_REQUEST,
    });
    const res = await initialAxios.put(`/blog/${id}`, form);
    dispatch({
      type: blogContstants.UPDATE_BLOG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: blogContstants.UPDATE_BLOG_FAILURE,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const getPhotoBlog = (id) => async (dispatch) => {
  const res = await initialAxios.get(`/blog/photo/${id}`);
  dispatch({
    type: blogContstants.GET_PHOTO_BLOG_SUCCESS,
    payload: res.data,
  });
};

export const getRelatedBlog = (data) => async (dispatch) => {
  const res = await initialAxios.post("/blog/related", data);
  dispatch({
    type: blogContstants.GET_RELATED_BLOG_SUCCESS,
    payload: res.data,
  });
};
