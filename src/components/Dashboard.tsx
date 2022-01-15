import { Box, Container, Grid } from "@mui/material";
import React from "react";
import ItemTable from "./ItemTable";
import OrderHistoryGraph from "./OrderHistoryGraph";

const Dashboard: React.FC = () => {
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
          ml={-3}
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
              <Grid
                lg={6}
                md={6}
                xl={3}
                xs={12}
                item
              >
                <OrderHistoryGraph />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>      
    </div>
  );
};

export default Dashboard;
