import { Product, productService, ResupplyQuery } from "../services/supplierService";
import { AppDispatch } from "../store";
import { alertActions } from "./alertActions";
import {
  PRODUCTS_GET_FAILURE,
  PRODUCTS_GET_REQUEST,
  PRODUCTS_GET_SUCCESS,
  RESUPPLY_REQUEST,
  RESUPPLY_SUCCESS,
  RESUPPLY_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
} from "./types";

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

const addNewProduct = (query: ResupplyQuery): (dispatch: AppDispatch) => void => {

  const request = () => ({ type: ADD_PRODUCT_REQUEST });
  const success = () => ({ type: ADD_PRODUCT_SUCCESS });
  const failure = () => ({ type: ADD_PRODUCT_FAILURE });

  return (dispatch: AppDispatch) => {
    dispatch(request());
    productService
      .addNewProduct(query)
      .then(() => {
        dispatch(success());
        dispatch(alertActions.success("Product added successfully"));
      }, () => {
        dispatch(failure());
        dispatch(alertActions.error("Error adding product"));
      });
  };
};

const resupplyProduct = (query: ResupplyQuery): (dispatch: AppDispatch) => void => {

  const request = () => ({ type: RESUPPLY_REQUEST });
  const success = () => ({ type: RESUPPLY_SUCCESS });
  const failure = () => ({ type: RESUPPLY_FAILURE });

  return (dispatch: AppDispatch) => {
    dispatch(request());
    productService
      .resupplyProduct(query)
      .then(() => {
        dispatch(success());
        dispatch(alertActions.success("Produit réapprovisionné"));
      }, () => {
        dispatch(failure());
        dispatch(alertActions.error("Impossible de réapprovisionner le produit"));
      });
  };
};


export const productActions = {
  getProductsFromPage,
  resupplyProduct,
  addNewProduct,
};
