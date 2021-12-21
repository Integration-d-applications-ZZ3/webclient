import { applyMiddleware, createStore } from "redux";
import baseReducer from "../reducers";
import thunkMiddleware from "redux-thunk";

export default createStore(
  baseReducer,
  applyMiddleware(
    thunkMiddleware,
  )
);
