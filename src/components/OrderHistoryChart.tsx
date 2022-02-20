import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { lastNmonths } from "../utils";
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
import { Box, Card, CardContent, CardHeader, CircularProgress, Divider, IconButton } from "@mui/material";
import { GlobalState } from "../reducers";
import { connect } from "react-redux";
import { AppDispatch } from "../store";
import { OrderState } from "../reducers/orderReducer";
import { orderActions } from "../actions/orderActions";
import {
  Add as AddIcon,
  Remove as RemoveIcon
} from "@mui/icons-material";
import { DateTime } from "luxon";

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

interface OrderHistoryGraphProps {
  dispatch: AppDispatch;
  orders: OrderState;
}
const OrderHistoryGraph: React.FC<OrderHistoryGraphProps> = ({
  dispatch,
  orders,
}) => {
  const [monthsCount, setMonthsCount] = useState(6);

  useEffect(() => {
    orderActions.getAll()(dispatch);
  }, []);

  if (orders.loading) {
    return <CircularProgress />;
  }

  if (orders.error) {
    return <div>{orders.error}</div>;
  }

  const ordersByMonth = new Array(monthsCount).fill(0);
  const now = DateTime.fromMillis(Date.now());
  for (const order of orders.orders) {
    const orderDate = DateTime.fromISO(order.date.toString());
    const dateDiff = now.diff(orderDate, "months");
    const monthDiff = Math.floor(dateDiff.get("months"));
    if (monthDiff < monthsCount) {
      ordersByMonth[monthDiff]++;
    }
  }

  return (
    <Card>
      <CardHeader
        title="Commandes par mois"
        subheader={`Historique des commandes dans les ${monthsCount} derniers mois`}
        action={
          <>
            <IconButton
              color="secondary"
              onClick={() => setMonthsCount(monthsCount - 1)}
              disabled={monthsCount < 3}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => setMonthsCount(monthsCount + 1)}
              disabled={monthsCount > 11}
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
          <Line
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
            data={{
              labels: lastNmonths(monthsCount).reverse(),
              datasets: [
                {
                  label: "Nombre de commandes",
                  data: ordersByMonth.reverse(),
                  borderColor: "rgba(75,192,192,1)",
                  borderWidth: 2,
                  fill: false,
                }
              ]
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state: GlobalState) => {
  const { orders } = state;
  return {
    orders,
  };
};


export default connect(mapStateToProps)(OrderHistoryGraph);
