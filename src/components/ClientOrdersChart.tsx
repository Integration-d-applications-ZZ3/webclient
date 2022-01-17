import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import {
  Add as AddIcon,
  Remove as RemoveIcon
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  IconButton
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import { orderActions } from "../actions/orderActions";
import { ClientState } from "../reducers/clientReducer";
import { clientActions } from "../actions/clientActions";
import { OrderState } from "../reducers/orderReducer";
import { AppDispatch } from "../store";
import { GlobalState } from "../reducers";
import { connect } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ClientOrdersChartProps {
  dispatch: AppDispatch;
  orders: OrderState;
  clients: ClientState;
}
const ClientOrdersChart: React.FC<ClientOrdersChartProps> = ({
  dispatch,
  orders,
  clients,
}) => {
  const [clientsCount, setClientsCount] = useState(6);
  
  useEffect(() => {
    orderActions.getAll()(dispatch);
    clientActions.getAll()(dispatch);
  }, []);

  if (orders.loading || clients.loading) {
    return <CircularProgress />;
  }

  const ordersByClient = new Map<number, number>(); // ID client => nombre de commandes

  for (const order of orders.orders) {
    if (ordersByClient.has(order.clientId)) {
      ordersByClient.set(order.clientId, (ordersByClient.get(order.clientId) ?? 0) + 1);
    } else {
      ordersByClient.set(order.clientId, 1);
    }
  }

  const firstNclients = Array.from(ordersByClient.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, clientsCount);

  const labels = firstNclients.map(([clientId]) => {
    const client = clients.clients.find(c => c.id === clientId);
    return `${client?.firstName} ${client?.lastName}`;
  });

  const data = firstNclients.map(([, orderCount]) => {
    return orderCount;
  });

  return (
    <Card>
      <CardHeader
        title="Clients"
        subheader={`Les ${clientsCount} premiers clients ayant passé le plus de commandes`}
        action={
          <>
            <IconButton
              color="secondary"
              onClick={() => setClientsCount(clientsCount - 1)}
              disabled={clientsCount < 3}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => setClientsCount(clientsCount + 1)}
              disabled={clientsCount > 11}
            >
              <AddIcon />
            </IconButton>
          </>
        }
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: "12.5rem",
            position: "relative",
          }}
        >
          <Bar
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Commandes",
                  data: data,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)"
                  ],
                  borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)"
                  ],
                },
              ],
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state: GlobalState) => {
  const { clients, orders } = state;
  return {
    clients,
    orders,
  };
};

export default connect(mapStateToProps)(ClientOrdersChart);
