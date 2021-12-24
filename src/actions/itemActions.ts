import { itemService } from "../services/itemService";
import { Item } from "../services/itemService";
import { AppDispatch } from "../store";
import { alertActions } from "./alertActions";
import { ITEMS_ADD_FAILURE, ITEMS_ADD_REQUEST, ITEMS_ADD_SUCCESS, ITEMS_DELETE_FAILURE, ITEMS_DELETE_REQUEST, ITEMS_DELETE_SUCCESS, ITEMS_GETALL_FAILURE, ITEMS_GETALL_REQUEST, ITEMS_GETALL_SUCCESS } from "./types";

const getAll = (): (dispatch: AppDispatch) => void => {

  const request = () => ({ type: ITEMS_GETALL_REQUEST });
  const success = (items: Item[]) => ({ type: ITEMS_GETALL_SUCCESS, items });
  const failure = (error: string) => ({ type: ITEMS_GETALL_FAILURE, error });

  return (dispatch: AppDispatch) => {
    dispatch(request());
    itemService
      .getItems()
      .then((items: Item[]) => {
        dispatch(success(items));
      }, (error: string) => {
        dispatch(failure(error));
      });
  };
};

const addItem = (item: Item): (dispatch: AppDispatch) => void => {

  const request = () => ({ type: ITEMS_ADD_REQUEST });
  const success = (item: Item) => ({ type: ITEMS_ADD_SUCCESS, item });
  const failure = (error: string) => ({ type: ITEMS_ADD_FAILURE, error });

  return (dispatch: AppDispatch) => {
    dispatch(request());
    itemService
      .insertItem(item)
      .then(data => {
        dispatch(success(data));
      }, (error: string) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      });
  };
};

const deleteItem = (itemId: number): (dispatch: AppDispatch) => void => {

  const request = () => ({ type: ITEMS_DELETE_REQUEST });
  const success = (message: string) => ({ type: ITEMS_DELETE_SUCCESS, message, itemId });
  const failure = (error: string) => ({ type: ITEMS_DELETE_FAILURE, error });

  return (dispatch: AppDispatch) => {
    dispatch(request());
    itemService
      .deleteItem(itemId)
      .then(data => {
        dispatch(success(data));
        dispatch(alertActions.success(data));
      }, (error: string) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      });
  };
};

export const itemActions = {
  getAll,
  addItem,
  deleteItem,
};

 