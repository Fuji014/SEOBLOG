import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/";

// actions
import { getLocalStorage } from "./actions/auth";

const userLogged = getLocalStorage("user")
  ? JSON.parse(getLocalStorage("user"))
  : {};

const initialState = {
  auth: {
    userLogged: {
      userInfo: userLogged,
    },
  },
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
