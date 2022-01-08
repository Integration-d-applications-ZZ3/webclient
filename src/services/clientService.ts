import constants from "../constants";
import { authService } from "./authService";

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  zipCode: number;
}

const getClients = async (): Promise<Client[]> => {
  const clients = await fetch(`${constants.API_BASE_URL}/clients`, {
    headers: {
      "Content-Type": "application/json",
      ...authService.authHeader(),
    },
    method: "GET",
  }).then(authService.checkResponse);
  
  return clients as Client[];
};

const insertClient = async (client: Client): Promise<Client> => {
  const insertedClient = await fetch(`${constants.API_BASE_URL}/clients`, {
    headers: {
      "Content-Type": "application/json",
      ...authService.authHeader(),
    },
    method: "POST",
    body: JSON.stringify(client),
  }).then(authService.checkResponse);
  
  return insertedClient as Client;
};

const updateClient = async (client: Client): Promise<Client> => {
  const editedClient = await fetch(`${constants.API_BASE_URL}/clients`, {
    headers: {
      "Content-Type": "application/json",
      ...authService.authHeader(),
    },
    method: "PUT",
    body: JSON.stringify(client),
  }).then(authService.checkResponse);

  return editedClient as Client;
};

const deleteClient = async (clientId: number): Promise<string> => {
  const message = fetch(`${constants.API_BASE_URL}/clients/${clientId}`, {
    headers: {
      "Content-Type": "application/json",
      ...authService.authHeader(),
    },
    method: "DELETE",
  }).then(authService.checkResponse)
    .then(data => data as string);
  
  return message;
};

export const clientService = {
  getClients,
  insertClient,
  updateClient,
  deleteClient,
};
