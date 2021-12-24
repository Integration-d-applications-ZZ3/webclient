import React, { useEffect } from "react";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import { connect } from "react-redux";
import { clientActions } from "../actions/clientActions";
import { GlobalState } from "../reducers";
import { ClientState } from "../reducers/clientReducer";
import { AppDispatch } from "../store";

type ClientsProps = {
  dispatch: AppDispatch;
  clients: ClientState;
}
const Clients: React.FC<ClientsProps> = ({
  dispatch,
  clients,
}) => {

  useEffect(() => {
    clientActions.getAll()(dispatch);
  }, []);

  if (clients.loading) {
    return (
      <CircularProgress />
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table
        aria-label="tableau des clients"
        sx={{
          minWidth: 300
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>ID.</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Ville</TableCell>
            <TableCell>CP</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.clients && clients.clients.map(client => (
            <TableRow
              key={client.id}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0
                }
              }}
            >
              <TableCell>{client.id}</TableCell>
              <TableCell>{client.firstName}</TableCell>
              <TableCell>{client.lastName}</TableCell>
              <TableCell>{client.city}</TableCell>
              <TableCell>{client.zipCode}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  aria-label="Supprimer"
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  aria-label="Supprimer"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state: GlobalState) => {
  const { clients } = state;
  return {
    clients,
  };
};

export default connect(mapStateToProps)(Clients);
