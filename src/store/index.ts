import { applyMiddleware, createStore } from "redux";
import baseReducer from "../reducers";
import thunkMiddleware from "redux-thunk";

export const store = createStore(
  baseReducer,
  applyMiddleware(
    thunkMiddleware,
  )
);

export type AppDispatch = typeof store.dispatch;
