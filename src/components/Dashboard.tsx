import React, { useEffect } from "react";
import { connect } from "react-redux";
import { clientActions } from "../actions/clientActions";
import { GlobalState } from "../reducers";
import { ClientState } from "../reducers/clientReducer";
import { User } from "../services/authService";
import { AppDispatch } from "../store";

type DashboardProps = {
  dispatch: AppDispatch;
  clients: ClientState;
  user?: User 
}
const Dashboard: React.FC<DashboardProps> = ({
  dispatch,
  clients,
  user,
}) => {

  useEffect(() => {
    clientActions.getAll()(dispatch);
  }, []);

  return (
    <>
      dashboard (WIP)
    </>
  );
};

const mapStateToProps = (state: GlobalState) => {
  const { clients, auth } = state;
  const { user } = auth;
  return {
    clients,
    user,
  };
};

export default connect(mapStateToProps)(Dashboard);
