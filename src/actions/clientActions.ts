import {
  CLIENTS_GETALL_FAILURE,
  CLIENTS_GETALL_SUCCESS,
  CLIENTS_GETALL_REQUEST,
} from "./types";
import { Client, clientService } from "../services/clientService";

const getAll = () => {
  const request = () => ({ type: CLIENTS_GETALL_REQUEST });
  const success = (clients: Client[]) => ({ type: CLIENTS_GETALL_SUCCESS, clients });
  const failure = (error: string) => ({ type: CLIENTS_GETALL_FAILURE, error });

  return (dispatch: any) => {
    dispatch(request());
    clientService
      .getClients()
      .then((clients: Client[]) => {
        dispatch(success(clients));
      }, (error: string) => {
        dispatch(failure(error));
      })
  }
}

export const clientActions = {
  getAll,
}
