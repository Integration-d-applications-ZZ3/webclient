import { combineReducers } from "redux";
import { alertReducer, AlertState } from "./alertReducer";
import { authReducer, UserState } from "./authReducer";
import { clientReducer, ClientState } from "./clientReducer";
import { itemReducer, ItemState } from "./itemReducer";
import { orderReducer, OrderState } from "./orderReducer";

export interface GlobalState {
  alert: AlertState;
  auth: UserState;
  clients: ClientState;
  items: ItemState;
  orders: OrderState;
}
export default combineReducers<GlobalState>({
  alert: alertReducer,
  auth: authReducer,
  clients: clientReducer,
  items: itemReducer,
  orders: orderReducer,
});
