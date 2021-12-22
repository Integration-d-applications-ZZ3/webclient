import { AnyAction } from "redux";
import { ALERT_CLEAR, ALERT_ERROR, ALERT_SUCCESS } from "./types";

export const alertActions = {
  success: (message: string): AnyAction => ({ type: ALERT_SUCCESS, message }),
  error: (message: string): AnyAction => ({ type: ALERT_ERROR, message }),
  clear: (): AnyAction => ({ type: ALERT_CLEAR, message: "" })
};
