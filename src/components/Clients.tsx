import React, { useEffect } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import { connect } from "react-redux";
import { clientActions } from "../actions/clientActions";
import { GlobalState } from "../reducers";
import { ClientState } from "../reducers/clientReducer";
import { AppDispatch } from "../store";
import CreateIcon from "@mui/icons-material/Create";

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

  if (clients.clients && clients.clients.length === 0) {
    return <div>Aucun client</div>;
  }

  // TODO le mettre dans les alertes
  if (clients.error) { 
    return <div>{clients.error}</div>;
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
            <TableCell align="center">ID.</TableCell>
            <TableCell align="center">Prénom</TableCell>
            <TableCell align="center">Nom</TableCell>
            <TableCell align="center">Ville</TableCell>
            <TableCell align="center">CP</TableCell>
            <TableCell align="center">Actions</TableCell>
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
              <TableCell align="center">{client.id}</TableCell>
              <TableCell align="center">{client.firstName}</TableCell>
              <TableCell align="center">{client.lastName}</TableCell>
              <TableCell align="center">{client.city}</TableCell>
              <TableCell align="center">{client.zipCode}</TableCell>
              <TableCell align="center">
                <IconButton
                  color="primary"
                  aria-label="Modifier"
                >
                  <CreateIcon />
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
