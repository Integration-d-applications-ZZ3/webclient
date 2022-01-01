import { AnyAction } from "redux";
import {
  ITEMS_GETALL_REQUEST,
  ITEMS_GETALL_FAILURE,
  ITEMS_GETALL_SUCCESS,
  ITEMS_DELETE_SUCCESS,
  ITEMS_DELETE_REQUEST,
  ITEMS_DELETE_FAILURE,
  ITEMS_ADD_REQUEST,
  ITEMS_ADD_SUCCESS,
  ITEMS_ADD_FAILURE,
  ITEM_GET_REQUEST,
  ITEM_GET_SUCCESS,
  ITEM_GET_FAILURE
} from "../actions/types";
import { Item } from "../services/itemService";

export interface ItemState {
  loading: boolean;
  items: Item[];
  error?: string;
}

const defaultItemState: ItemState = {
  items: [],
  loading: false,
};

export const itemReducer = (state: ItemState = defaultItemState, action: AnyAction): ItemState => {
  switch (action.type) {
  case ITEMS_GETALL_REQUEST:
    return { loading: true, items: [] };
  case ITEMS_GETALL_SUCCESS:
    return { loading: false, items: action.items };
  case ITEMS_GETALL_FAILURE:
    return { loading: false, items: state.items, error: action.error };
  case ITEMS_DELETE_REQUEST:
    return { loading: true, items: state.items };
  case ITEMS_DELETE_SUCCESS:
    return { loading: false, items: state.items.filter(item => item.ean !== action.itemId) };
  case ITEMS_DELETE_FAILURE:
    return { loading: false, items: state.items, error: action.error };
  case ITEMS_ADD_REQUEST:
    return { loading: true, items: state.items };
  case ITEMS_ADD_SUCCESS:
    return { loading: false, items: [...state.items, action.item] };
  case ITEMS_ADD_FAILURE:
    return { loading: false, items: state.items, error: action.error };
  case ITEM_GET_REQUEST:
    return { loading: true, items: state.items };
  case ITEM_GET_SUCCESS:
    return { loading: false, items: [action.item] };
  case ITEM_GET_FAILURE:
    return { loading: false, items: state.items, error: action.error };
  default:
    return state;
  }
};
