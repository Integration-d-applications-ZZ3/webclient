import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { clientActions } from "../actions/clientActions";
import { orderActions } from "../actions/orderActions";
import { GlobalState } from "../reducers";
import { ClientState } from "../reducers/clientReducer";
import { OrderState } from "../reducers/orderReducer";
import { Item } from "../services/itemService";
import { AppDispatch } from "../store";
import { formatDate } from "../utils";
import PerfectScrollbar from "react-perfect-scrollbar";

interface ItemOrderHistoryTableProps {
  dispatch: AppDispatch;
  orders: OrderState;
  clients: ClientState;
  item: Item;
}
const ItemOrderHistoryTable: React.FC<ItemOrderHistoryTableProps> = ({
  dispatch,
  orders,
  clients,
  item,
}) => {

  useEffect(() => {
    orderActions.getAll()(dispatch);
    clientActions.getAll()(dispatch);
  }, []);

  if (orders.loading || clients.loading) {
    return <CircularProgress />;
  }

  const relatedOrders = orders.orders
    .filter(order => order.items.some(i => i.ean === item.ean))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card>
      <CardHeader
        title="Historique des commandes"
        subheader={`Commandes contenant l'article ${item.name}`}
      />
      <PerfectScrollbar>
        <Box
          sx={{
            maxHeight: "250px",
          }}
        >
          {relatedOrders.length > 0 
            ? <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Quantité</TableCell>
                  <TableCell>Prix</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {relatedOrders.map(order => {
                  const client = clients.clients.find(c => c.id === order.clientId);
                  const itemInOrder = order.items.find(i => i.ean === item.ean);

                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        {client ? `${client.firstName} ${client.lastName}` : ""}
                      </TableCell>
                      <TableCell>{formatDate(new Date(order.date))}</TableCell>
                      <TableCell>{itemInOrder?.quantity ?? 0}</TableCell>
                      <TableCell>
                        {((itemInOrder?.quantity ?? 0) * item.price).toFixed(2)} €
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            : <CardContent>{"L'objet n'a jamais été commandé"}</CardContent>
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
    clients
  };
};

export default connect(mapStateToProps)(ItemOrderHistoryTable);
