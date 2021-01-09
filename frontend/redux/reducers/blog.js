const { blogContstants } = require("../actions/constant");

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

function blogReducer(state = initialState, action) {
  switch (action.type) {
    // get all blogs
    case blogContstants.GET_ALL_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case blogContstants.GET_ALL_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: action.payload.blogs,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case blogContstants.GET_ALL_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    // delete blogs
    case blogContstants.DELETE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case blogContstants.DELETE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: state.blogs.filter((x) => x._id !== action.payload._id),
      };
    case blogContstants.DELETE_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    // create blogs
    case blogContstants.CREATE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case blogContstants.CREATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        createSuccess: true,
        createdBlog: action.payload,
        blogs: [...state.blogs, action.payload],
      };
    case blogContstants.CREATE_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    // get single blog
    case blogContstants.GET_SINGLE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case blogContstants.GET_SINGLE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        createdBlog: action.payload,
      };
    case blogContstants.GET_SINGLE_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    // update blog
    case blogContstants.UPDATE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case blogContstants.UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: state.blogs.map((x) =>
          x._id === action.payload._id ? action.payload : x
        ),
        updateSuccess: true,
      };
    case blogContstants.UPDATE_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    // get photo blog
    case blogContstants.GET_PHOTO_BLOG_SUCCESS:
      return {
        ...state,
        photo: action.payload,
      };
    // get related blog
    case blogContstants.GET_RELATED_BLOG_SUCCESS:
      return {
        ...state,
        relatedBlog: action.payload,
      };
    // reset blog
    case blogContstants.RESET_BLOG_SUCCESS:
      return {
        createSuccess: false,
        updateSuccess: false,
      };
    default:
      return state;
  }
}

export default blogReducer;
