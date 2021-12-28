import constants from "../constants";
import { authService } from "./authService";

export interface Item {
  ean: number;
  name: string;
  price: number;
  description: string;
  photo: string;
  supplierId: number;
}

const getItems = async (): Promise<Item[]> => {
  const items = await fetch(`${constants.API_BASE_URL}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authService.authHeader(),
    },
  }).then(authService.checkResponse);
  
  return items as Item[];
};

const getItem = async (itemId: number): Promise<Item> => {
  const item = await fetch(`${constants.API_BASE_URL}/items/${itemId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authService.authHeader(),
    },
  }).then(authService.checkResponse);

  return item as Item;
};

const insertItem = (item: Item): Promise<Item> => {
  return fetch(`${constants.API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authService.authHeader(),
    },
    body: JSON.stringify(item),
  }).then(authService.checkResponse)
    .then(data => {
      return data as Item;
    });
};
 
const deleteItem = (itemId: number): Promise<string> => {
  return fetch(`${constants.API_BASE_URL}/login/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...authService.authHeader(),
    },
  }).then(authService.checkResponse)
    .then(data => {
      return data as string;
    });
};

export const itemService = {
  getItems,
  getItem,
  insertItem,
  deleteItem,
};
