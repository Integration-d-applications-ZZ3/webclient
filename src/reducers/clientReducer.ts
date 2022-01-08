import { AnyAction } from "redux";
import {
  CLIENTS_DELETE_FAILURE,
  CLIENTS_DELETE_REQUEST,
  CLIENTS_DELETE_SUCCESS,
  CLIENTS_GETALL_FAILURE,
  CLIENTS_GETALL_REQUEST,
  CLIENTS_GETALL_SUCCESS,
  CLIENTS_INSERT_FAILURE,
  CLIENTS_INSERT_REQUEST,
  CLIENTS_INSERT_SUCCESS,
  CLIENTS_UPDATE_FAILURE,
  CLIENTS_UPDATE_REQUEST,
  CLIENTS_UPDATE_SUCCESS
} from "../actions/types";
import { Client } from "../services/clientService";

export interface ClientState {
  loading: boolean;
  clients: Client[];
  error?: string;
}
const defaultState: ClientState = {
  clients: [],
  loading: false
};
export const clientReducer = (state: ClientState = defaultState, action: AnyAction): ClientState => {
  switch (action.type) {
  case CLIENTS_GETALL_REQUEST:
    return { loading: true, clients: [] };
  case CLIENTS_GETALL_SUCCESS:
    return { loading: false, clients: action.clients };
  case CLIENTS_GETALL_FAILURE:
    return { loading: false, clients: state.clients, error: action.error };
  case CLIENTS_INSERT_REQUEST:
    return { loading: true, clients: state.clients };
  case CLIENTS_INSERT_SUCCESS:
    return { loading: false, clients: [...state.clients, action.client] };
  case CLIENTS_INSERT_FAILURE:
    return { loading: false, clients: state.clients };
  case CLIENTS_UPDATE_REQUEST:
    return { loading: true, clients: state.clients };
  case CLIENTS_UPDATE_SUCCESS:
    return { loading: false, clients: state.clients.map(client => client.id === action.client.id ? action.client : client) };
  case CLIENTS_UPDATE_FAILURE:
    return { loading: false, clients: state.clients };
  case CLIENTS_DELETE_REQUEST:
    return { loading: true, clients: state.clients };
  case CLIENTS_DELETE_SUCCESS:
    return { loading: false, clients: state.clients.filter(client => client.id !== action.clientId) };
  case CLIENTS_DELETE_FAILURE:
    return { loading: false, clients: state.clients };
  default:
    return state;
  }
};
