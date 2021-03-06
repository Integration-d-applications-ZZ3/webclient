import { alertActions } from "./alertActions";
import { authService, User } from "../services/authService";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT
} from "./types";
import { history } from "../browserHistory";
import { AppDispatch } from "../store";
import { AnyAction } from "redux";

const login = (email: string, password: string): (dispatch: AppDispatch) => void => {
  
  const request = (user: User) => ({ type: LOGIN_REQUEST, user });
  const success = (user: User) => ({ type: LOGIN_SUCCESS, user });
  const failure = (error: string) => ({ type: LOGIN_FAILURE, error });

  return (dispatch: AppDispatch) => {
    dispatch(request({ email }));
    authService
      .login(email, password)
      .then((user: User) => {
        dispatch(success({ email, ...user }));  
        history.push("/dashboard");
      }, (error: (string | Error)) => {
        const message = error instanceof Error ? error.message : error;
        dispatch(failure(message));
        dispatch(alertActions.error(`Impossible de se connecter : ${message}`));
      });
  };
};

const logout = (): AnyAction => {
  authService.logout();
  return { type: LOGOUT };
};

export const authActions = {
  login,
  logout,
};
