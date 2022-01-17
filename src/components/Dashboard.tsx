import { Grid } from "@mui/material";
import React from "react";
import ClientOrdersChart from "./ClientOrdersChart";
import ItemTable from "./ItemTable";
import OrderHistoryGraph from "./OrderHistoryChart";
import OrderHistoryTable from "./OrderHistoryTable";

const Dashboard: React.FC = () => {
  return (
    <Grid
      spacing={2}
      container
    >
      <Grid
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        item
      >
        <ItemTable />
      </Grid>
      <Grid
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        item
      >
        <OrderHistoryGraph />
      </Grid>
      <Grid
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        item
      >
        <ClientOrdersChart />
      </Grid>
      <Grid
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        item
      >
        <OrderHistoryTable />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
