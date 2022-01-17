import constants from "../constants";
import { authService } from "./authService";

export interface Product {
  _id: number;
  product_name: string;
  image_url: string;
  quantity: string;
  index: number;
}

const getProductsFromPage = async (page: number): Promise<Product[]> => {

  const products = await fetch(`${constants.SUPPLIER_API_BASE_URL}/products/${page}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(authService.checkResponse);

  return products as Product[];
};

export const productService = {
  getProductsFromPage,
};
