import { ALERT_CLEAR, ALERT_ERROR, ALERT_SUCCESS } from "./types";

export const alertActions = {
  success: (message: string) => ({ type: ALERT_SUCCESS, message }),
  error: (message: string) => ({ type: ALERT_ERROR, message }),
  clear: () => ({ type: ALERT_CLEAR, message: "" })
}
