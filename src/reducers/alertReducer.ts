import { AlertColor } from "@mui/material";
import { AnyAction } from "redux";
import { ALERT_CLEAR, ALERT_ERROR, ALERT_SUCCESS } from "../actions/types";

export interface AlertState {
  type: AlertColor;
  message: string;
}

const defaultAlertState: AlertState = {
  type: "info",
  message: ""
}
export const alertReducer = (state: AlertState = defaultAlertState, action: AnyAction): AlertState => {
  switch(action.type) {
    case ALERT_SUCCESS:
      return { type: "success", message: action.message };
    case ALERT_ERROR:
      return { type: "error", message: action.message };
    case ALERT_CLEAR:
      return { type: "info", message: "" };
    default:
      return state;
  }
}
