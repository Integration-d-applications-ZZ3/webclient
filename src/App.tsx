import React, { useEffect, useState } from "react";
import {
  Alert, Snackbar
} from "@mui/material";
import { 
  Route,
  Switch,
  Router,
} from "react-router-dom";
import NavProvider from "./components/NavProvider";
import ColorModeProvider from "./components/ColorModeProvider";
import { connect } from "react-redux";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { alertActions } from "./actions/alertActions";
import { GlobalState } from "./reducers";
import { history } from "./browserHistory";
import { AlertState } from "./reducers/alertReducer";
import { AppDispatch } from "./store";
import Landing from "./components/Landing";
import Clients from "./components/Clients";
// TODO: utiliser les nested routes pour mieux gérer le layout

type AppProps = {
  dispatch: AppDispatch;
  alert: AlertState;
};
const App: React.FC<AppProps> = ({ dispatch, alert }) => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setSnackbarOpen(alert.message.length > 0);
  }, [alert]);

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  history.listen(() => {
    dispatch(alertActions.clear());
  });

  return (
    <ColorModeProvider>
      <Router history={history}>
        <NavProvider>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
          >
            <Alert
              severity={alert.type}
            >
              {alert.message}
            </Alert>
          </Snackbar>
          <Switch>
            <Route
              path="/"
              component={Landing}
              exact
            />
            <Route
              path="/login"
              component={Login} 
              exact
            /> 
            <PrivateRoute
              component={Dashboard}
              path="/dashboard"
              exact
            />
            <PrivateRoute
              component={Clients}
              path="/clients"
              exact
            />
            <Route render={() => <div>404</div>} /> 
          </Switch>
        </NavProvider>
      </Router>
    </ColorModeProvider>
  );
};

const mapStateToProps = (state: GlobalState) => {
  const { alert } = state;
  return { alert };
};

export default connect(mapStateToProps)(App);
