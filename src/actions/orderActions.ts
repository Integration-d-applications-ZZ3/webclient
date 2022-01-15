import { Order, orderService } from "../services/orderService";
import { AppDispatch } from "../store";
import { ORDERS_GETALL_FAILURE, ORDERS_GETALL_REQUEST, ORDERS_GETALL_SUCCESS } from "./types";

const getAll = (): (dispatch: AppDispatch) => void => {

  const request = () => ({ type: ORDERS_GETALL_REQUEST });
  const success = (orders: Order[]) => ({ type: ORDERS_GETALL_SUCCESS, orders });
  const failure = (error: string) => ({ type: ORDERS_GETALL_FAILURE, error });

  return (dispatch: AppDispatch) => {
    dispatch(request());
    orderService
      .getOrders()
      .then((orders: Order[]) => {
        dispatch(success(orders));
      }, (error: string) => {
        dispatch(failure(error));
      });
  };
};

export const orderActions = {
  getAll,
};
