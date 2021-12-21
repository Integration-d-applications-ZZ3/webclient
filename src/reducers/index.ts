import { combineReducers } from "redux";
import { alertReducer, AlertState } from "./alertReducer";
import { authReducer, UserState } from "./authReducer";
import { clientReducer, ClientState } from "./clientReducer";

export interface GlobalState {
  alert: AlertState;
  auth: UserState;
  clients: ClientState;
}
export default combineReducers<GlobalState>({
  alert: alertReducer,
  auth: authReducer,
  clients: clientReducer,
});
