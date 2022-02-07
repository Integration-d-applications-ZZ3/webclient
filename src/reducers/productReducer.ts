import { AnyAction } from "redux";
import { PRODUCTS_GET_FAILURE, PRODUCTS_GET_REQUEST, PRODUCTS_GET_SUCCESS, RESUPPLY_FAILURE, RESUPPLY_REQUEST, RESUPPLY_SUCCESS } from "../actions/types";
import { Product } from "../services/supplierService";

export interface ProductState {
  loading: boolean;
  products: Product[];
  error?: string;
}

const defaultState: ProductState = {
  products: [],
  loading: false
};
export const productReducer = (state: ProductState = defaultState, action: AnyAction): ProductState => {
  switch (action.type) {
  case PRODUCTS_GET_REQUEST:
    return { loading: true, products: [] };
  case PRODUCTS_GET_SUCCESS:
    return { loading: false, products: action.products };
  case PRODUCTS_GET_FAILURE:
    return { loading: false, products: state.products, error: action.error };
  case RESUPPLY_REQUEST:
    return { loading: true, products: state.products };
  case RESUPPLY_SUCCESS:
    return { loading: false, products: state.products };
  case RESUPPLY_FAILURE:
    return { loading: false, products: state.products };
  default:
    return state;
  }
};
