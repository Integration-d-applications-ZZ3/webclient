import { AnyAction } from "redux";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../actions/types";
import constants from "../constants";
import { User } from "../services/authService";

export interface UserState {
  user?: User;
  loggedIn?: boolean;
  loggingIn?: boolean;
}

const user: User = JSON.parse(
  localStorage.getItem(constants.USER_LOCAL_STORAGE_KEY) ?? "{}"
);
const initialState = user ? { loggedIn: true, user } : {};

export const authReducer = (state: UserState = initialState, action: AnyAction): UserState => {
  switch (action.type) {
  case LOGIN_REQUEST:
    return { loggingIn: true, user: action.user };
  case LOGIN_SUCCESS:
    return { loggedIn: true, user: action.user };
  case LOGIN_FAILURE:
    return {};
  case LOGOUT:
    return {};
  default:
    return state;
  }
};
