import { AnyAction } from "redux";
import { CLIENTS_GETALL_FAILURE, CLIENTS_GETALL_REQUEST, CLIENTS_GETALL_SUCCESS } from "../actions/types";
import { Client } from "../services/clientService";

export interface ClientState {
  loading?: boolean;
  clients?: Client[];
  error?: string;
}
export const clientReducer = (state: ClientState = {}, action: AnyAction): ClientState => {
  switch (action.type) {
    case CLIENTS_GETALL_REQUEST:
      return { loading: true };
    case CLIENTS_GETALL_SUCCESS:
      return { clients: action.clients };
    case CLIENTS_GETALL_FAILURE:
      return { error: action.error };
    default:
      return state;
  }
}
