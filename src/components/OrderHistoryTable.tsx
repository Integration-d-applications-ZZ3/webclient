import { Box, Card, CardContent, CardHeader, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { GlobalState } from "../reducers";
import { ClientState } from "../reducers/clientReducer";
import { OrderState } from "../reducers/orderReducer";
import { AppDispatch } from "../store";
import PerfectScrollbar from "react-perfect-scrollbar";
import { formatDate } from "../utils";
import { orderActions } from "../actions/orderActions";
import { clientActions } from "../actions/clientActions";

interface OrderHistoryTableProps {
  dispatch: AppDispatch;
  orders: OrderState;
  clients: ClientState;
} 
const OrderHistoryTable: React.FC<OrderHistoryTableProps> = ({
  dispatch,
  orders,
  clients,
}) => {

  useEffect(() => {
    orderActions.getAll()(dispatch);
    clientActions.getAll()(dispatch);
  }, []);

  if (orders.loading || clients.loading) {
    return <CircularProgress />;
  }

  const orderList = orders
    .orders
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <CardHeader
        title="Historique des commandes"
      />
      <PerfectScrollbar>
        <Box
          sx={{
            maxHeight: "14rem",
          }}
        >
          {orderList.length > 0
            ? <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Articles</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderList.map(order => {
                  const client = clients.clients.find(c => c.id === order.clientId);
                  
                  if (order.items.length === 0) {
                    return;
                  }
                  
                  return (
                    <Tooltip
                      key={order.id}
                      title={order.items.map(item => (
                        <div key={item.ean}>{item.name} x{item.quantity}</div>))}
                    >
                      <TableRow hover>
                        <TableCell>{client?.firstName} {client?.lastName}</TableCell>
                        <TableCell>{formatDate(new Date(order.date))}</TableCell>
                        <TableCell>
                          {order.items[0].name} x{order.items[0].quantity}
                          {order.items.length > 1 ? "..." : ""}
                        </TableCell>
                      </TableRow>
                    </Tooltip>
                  );
                })}
              </TableBody>
            </Table>
            : <CardContent>{"Aucune commande n'a été passée"}</CardContent>
          }
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

const mapStateToProps = (state: GlobalState) => {
  const { orders, clients } = state;
  return {
    orders,
    clients,
  };
};

export default connect(mapStateToProps)(OrderHistoryTable);
