import React from "react";
import { Redirect, Route } from "react-router-dom";
import constants from "../constants";

type PrivateRouteProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any; //ComponentType<unknown>;
  path: string;
  exact: boolean;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={props =>
        localStorage.getItem(constants.USER_LOCAL_STORAGE_KEY)
          ? <Component {...props} />
          : <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location } // eslint-disable-line
            }}
          />
      } 
    />
  );
};

export default PrivateRoute;
