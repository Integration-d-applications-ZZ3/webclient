import React, { useEffect } from "react";
import { connect } from "react-redux";
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
    // TODO
  }, []);

  return (
    <div>dashboard</div>
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
