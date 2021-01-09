import { combineReducers } from "redux";
import userReducer from "./user";
import categoryReducer from "./category";
import tagReducer from "./tag";
import blogReducer from "./blog";

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  tag: tagReducer,
  blog: blogReducer,
});

export default rootReducer;
