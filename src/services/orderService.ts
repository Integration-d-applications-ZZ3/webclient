import constants from "../constants";
import { authService } from "./authService";

export interface Order {
  orderId: number;
}

const getOrders = async (): Promise<Order[]> => {
  const orders = await fetch(`${constants.API_BASE_URL}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authService.authHeader(),
    },
  }).then(authService.checkResponse);

  return orders as Order[];
};

const insertOrder = (order: Order): Promise<Order> => {
  return fetch(`${constants.API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authService.authHeader(),
    },
    body: JSON.stringify(order)
  }).then(authService.checkResponse)
    .then(data => data as Order);
};

export const orderService = {
  getOrders,
  insertOrder,
};
