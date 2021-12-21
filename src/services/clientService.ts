import constants from "../constants";
import { authService } from "./authService"

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  zipCode: number;
}

const getClients = async (): Promise<Client[]> => {
  const clients = await fetch(`${constants.API_BASE_URL}/clients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  }).then(authService.checkResponse);
  
  return clients as Client[];
}

export const clientService = {
  getClients,
}
