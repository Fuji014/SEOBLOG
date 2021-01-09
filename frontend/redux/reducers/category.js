import { categoryConstants } from "../actions/constant";

const initialState = {
  category: [],
  loading: false,
  success: false,
  error: null,
  createCategory: {
    success: false,
    loading: false,
    error: null,
  },
};

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    // create
    case categoryConstants.CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        createCategory: {
          loading: true,
        },
      };
    case categoryConstants.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: [...state.category, action.payload],
        createCategory: {
          success: true,
          loading: false,
        },
      };
    case categoryConstants.CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        createCategory: {
          loading: false,
        },
      };

    // get all
    case categoryConstants.GET_ALL_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        category: action.payload,
      };
    case categoryConstants.GET_ALL_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    // delete
    case categoryConstants.DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstants.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: state.category.filter((x) => x._id !== action.payload._id),
      };
    case categoryConstants.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}

export default categoryReducer;
