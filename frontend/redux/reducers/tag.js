import { tagConstants } from "../actions/constant";

const initialState = {
  tags: [],
  loading: false,
  error: null,
};

function tagReducer(state = initialState, action) {
  switch (action.type) {
    // get all tags
    case tagConstants.GET_ALL_TAG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case tagConstants.GET_ALL_TAG_SUCCESS:
      return {
        ...state,
        loading: false,
        tags: action.payload,
      };

    case tagConstants.GET_ALL_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    // create all tags
    case tagConstants.CREATE_TAG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case tagConstants.CREATE_TAG_SUCCESS:
      return {
        ...state,
        loading: false,
        tags: [...state.tags, action.payload],
      };

    case tagConstants.CREATE_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    // delete tag
    case tagConstants.DELETE_TAG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case tagConstants.DELETE_TAG_SUCCESS:
      return {
        ...state,
        loading: false,
        tags: state.tags.filter((x) => x._id !== action.payload._id),
      };

    case tagConstants.DELETE_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default tagReducer;
