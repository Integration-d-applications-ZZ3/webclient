import React, { useEffect } from "react";
import { connect } from "react-redux";
import { GlobalState } from "../reducers";

type DashboardProps = {
  dispatch: any;
}
const Dashboard: React.FC<DashboardProps> = ({
  dispatch,
}) => {

  useEffect(() => {

  }, []);

  return (
    <div>dashboard</div>
  );
}

const mapStateToProps = (state: GlobalState) => {
  const { clients, auth } = state;
  const { user } = auth;
  return {
    clients,
    user,
  }
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export default connectedDashboard;
