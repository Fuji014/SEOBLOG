import { combineReducers } from "redux";
import authReducer from "./auth";
import categoryReducer from "./category";
import tagReducer from "./tag";
import blogReducer from "./blog";
import userReducer from "./user";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  tag: tagReducer,
  blog: blogReducer,
  user: userReducer,
});

export default rootReducer;
