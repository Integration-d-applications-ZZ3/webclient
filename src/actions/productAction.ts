import { Product, productService } from "../services/supplierService";
import { AppDispatch } from "../store";
import { PRODUCTS_GET_FAILURE, PRODUCTS_GET_REQUEST, PRODUCTS_GET_SUCCESS } from "./types";

const getProductsFromPage = (page: number): (dispatch: AppDispatch) => void => {

  const request = () => ({ type: PRODUCTS_GET_REQUEST });
  const success = (products: Product[]) => ({ type: PRODUCTS_GET_SUCCESS, products });
  const failure = (error: string) => ({ type: PRODUCTS_GET_FAILURE, error });

  return (dispatch: AppDispatch) => {
    dispatch(request());
    productService
      .getProductsFromPage(page)
      .then((products: Product[]) => {
        dispatch(success(products));
      }, (error: string) => {
        dispatch(failure(error));
      });
  };
};

export const productActions = {
  getProductsFromPage
};
