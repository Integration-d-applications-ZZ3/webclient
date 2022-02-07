import constants from "../constants";
import { authService } from "./authService";

export interface Product {
  _id: number;
  product_name: string;
  image_url: string;
  quantity: string;
  index: number;
}

export interface ResupplyQuery {
  ean: string;
  quantity: number;
  price?: number;
  description?: string;
}

const getProductsFromPage = async (page: number): Promise<Product[]> => {

  const products = await fetch(`${constants.SUPPLIER_API_BASE_URL}/products/${page}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(authService.checkResponse);

  return products as Product[];
};

const addNewProduct = async  (query: ResupplyQuery): Promise<string> => {
  const response = await fetch(`${constants.API_BASE_URL}/stock`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authService.authHeader(),
    },
    body: JSON.stringify(query)
  }).then(authService.checkResponse);

  return response as string;
};

const resupplyProduct = async  (query: ResupplyQuery): Promise<string> => {
  const response = await fetch(`${constants.API_BASE_URL}/stock`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authService.authHeader(),
    },
    body: JSON.stringify(query)
  }).then(authService.checkResponse);

  return response as string;
};

export const productService = {
  getProductsFromPage,
  addNewProduct,
  resupplyProduct,
};
