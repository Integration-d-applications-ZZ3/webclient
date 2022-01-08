import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../reducers";
import { ClientState } from "../reducers/clientReducer";
import { User } from "../services/authService";
import { AppDispatch } from "../store";
import ItemTable from "./ItemTable";

interface DashboardProps {
  dispatch: AppDispatch;
  clients: ClientState;
  user?: User 
}
const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div
      style={{
        display: "flex",
        flex: "1 1 auto",
        maxWidth: "100%",
        // paddingTop: "1.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Container maxWidth={false}>
            <Grid
              spacing={2}
              container
            >
              {/* TODO : JOUER SUR CES PARAMETRES */}
              <Grid
                lg={6}
                md={6}
                xl={3}
                xs={12}
                item
              >
                <ItemTable />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>      
    </div>
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
