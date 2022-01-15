import { AnyAction } from "redux";
import { Order } from "../services/orderService";

export interface OrderState {
  loading: boolean;
  orders: Order[];
  error?: string;
}
const defaultState: OrderState = {
  orders: [],
  loading: false
};
export const orderReducer = (state: OrderState = defaultState, action: AnyAction): OrderState => {
  switch (action.type) {
  case "ORDERS_GETALL_REQUEST":
    return { loading: true, orders: [] };
  case "ORDERS_GETALL_SUCCESS":
    return { loading: false, orders: action.orders };
  case "ORDERS_GETALL_FAILURE":
    return { loading: false, orders: state.orders, error: action.error };
  default:
    return state;
  }
};
