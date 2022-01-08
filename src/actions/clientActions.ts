import {
  CLIENTS_GETALL_FAILURE,
  CLIENTS_GETALL_SUCCESS,
  CLIENTS_GETALL_REQUEST,
  CLIENTS_UPDATE_SUCCESS,
  CLIENTS_INSERT_SUCCESS,
  CLIENTS_INSERT_REQUEST,
  CLIENTS_INSERT_FAILURE,
  CLIENTS_UPDATE_REQUEST,
  CLIENTS_UPDATE_FAILURE,
  CLIENTS_DELETE_SUCCESS,
  CLIENTS_DELETE_REQUEST,
  CLIENTS_DELETE_FAILURE,
} from "./types";
import { Client, clientService } from "../services/clientService";
import { AppDispatch } from "../store";
import { alertActions } from "./alertActions";

const getAll = (): (dispatch: AppDispatch) => void => {

  const request = () => ({ type: CLIENTS_GETALL_REQUEST });
  const success = (clients: Client[]) => ({ type: CLIENTS_GETALL_SUCCESS, clients });
  const failure = (error: string) => ({ type: CLIENTS_GETALL_FAILURE, error });

  return (dispatch: AppDispatch) => {
    dispatch(request());
    clientService
      .getClients()
      .then((clients: Client[]) => {
        dispatch(success(clients));
      }, (error: string) => {
        dispatch(failure(error));
      });
  };
};

const insert = (client: Client): (dispatch: AppDispatch) => void => {
  
  const success = (client: Client) => ({ type: CLIENTS_INSERT_SUCCESS, client });
  const failure = (error: string) => ({ type: CLIENTS_INSERT_FAILURE, error });
  const request = () => ({ type: CLIENTS_INSERT_REQUEST });
  
  return (dispatch: AppDispatch) => {
    dispatch(request());
    clientService
      .insertClient(client)
      .then((client: Client) => {
        dispatch(success(client));
        dispatch(alertActions.success("Client ajouté"));
      }, (error: string) => {
        dispatch(alertActions.error(`Impossible d'ajouter le client : ${error}`));
        dispatch(failure(error));
      });
  };
};

const remove = (id: number): (dispatch: AppDispatch) => void => {

  const success = (id: number) => ({ type: CLIENTS_DELETE_SUCCESS, id });
  const failure = (error: string) => ({ type: CLIENTS_DELETE_FAILURE, error });
  const request = () => ({ type: CLIENTS_DELETE_REQUEST });

  return (dispatch: AppDispatch) => {
    dispatch(request());
    clientService
      .deleteClient(id)
      .then(() => {
        dispatch(success(id));
        getAll()(dispatch);
        dispatch(alertActions.success("Client supprimé"));
      }, (error: string) => {
        dispatch(alertActions.error(`Impossible de supprimer le client : ${error}`));
        dispatch(failure(error));
      });
  };
};
        
const update = (client: Client): (dispatch: AppDispatch) => void => {

  const request = () => ({ type: CLIENTS_UPDATE_REQUEST });
  const failure = (error: string) => ({ type: CLIENTS_UPDATE_FAILURE, error });
  const success = (client: Client) => ({ type: CLIENTS_UPDATE_SUCCESS, client });

  return (dispatch: AppDispatch) => {
    dispatch(request());
    clientService
      .updateClient(client)
      .then((client: Client) => {
        dispatch(success(client));
        getAll()(dispatch);
        dispatch(alertActions.success("Client modifié"));
      }, (error: string) => {
        dispatch(alertActions.error(`Impossible de mettre à jour le client : ${error}`));
        dispatch(failure(error));
      });
  };
};

export const clientActions = {
  getAll,
  insert,
  update,
  remove,
};
