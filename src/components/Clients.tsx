import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon
} from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { connect } from "react-redux";
import { clientActions } from "../actions/clientActions";
import { GlobalState } from "../reducers";
import { ClientState } from "../reducers/clientReducer";
import { AppDispatch } from "../store";
import ClientDialog from "./ClientDialog";
import CreateIcon from "@mui/icons-material/Create";
import { Client } from "../services/clientService";

type ClientsProps = {
  dispatch: AppDispatch;
  clients: ClientState;
}
const Clients: React.FC<ClientsProps> = ({
  dispatch,
  clients,
}) => {

  const [clientEditDialogOpen, setClientEditDialogOpen] = useState(false);
  const [creatingNewClient, setCreatingNewClient] = useState(false);
  const [clientEditDialogClient, setClientEditDialogClient] = useState<Client | undefined>(undefined);

  const handleClientEditDialogClose = () => {
    setClientEditDialogOpen(false);
    setClientEditDialogClient(undefined);
  };

  const handleClientEditDialogOpen = (client: Client, editing = false) => {
    setCreatingNewClient(!editing);
    setClientEditDialogOpen(true);
    setClientEditDialogClient(client);
  };

  const handleSubmit = (client: Client) => {
    if (creatingNewClient) {
      clientActions.insert(client)(dispatch);
    } else {
      clientActions.update(client)(dispatch);
    }
    handleClientEditDialogClose();
  };

  const handleDelete = (client: Client) => {
    clientActions.remove(client.id)(dispatch);
  };

  useEffect(() => {
    clientActions.getAll()(dispatch);
  }, []);

  if (clients.loading) {
    return <CircularProgress />;
  }

  if (clients.clients?.length === 0) {
    return <div>Aucun client</div>;
  }

  if (clients.error) { 
    return <div>{clients.error}</div>;
  }

  clients.clients.sort((a, b) => a.id - b.id);

  return (
    <>
      {clientEditDialogClient !== undefined ?
        <ClientDialog
          insertsNewClient={creatingNewClient}
          open={clientEditDialogOpen}
          client={clientEditDialogClient}
          onClose={handleClientEditDialogClose}
          onSubmit={handleSubmit}
        />
        : null}
      <Box mb={2}>
        <Button
          onClick={() => handleClientEditDialogOpen({
            id: 0,
            firstName: "",
            lastName: "",
            city: "",
            zipCode: 0
          })}
          startIcon={<AddIcon />}
          variant="contained"
        >
          Nouveau client
        </Button>
      </Box>
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
                <TableCell align="center">
                  <Typography variant="body1">{client.firstName}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">{client.lastName}</Typography>
                </TableCell>
                <TableCell align="center">{client.city}</TableCell>
                <TableCell align="center">{client.zipCode}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleClientEditDialogOpen(client, true)}
                    color="primary"
                    aria-label="Modifier"
                  >
                    <CreateIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(client)}
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
    </>
  );
};

const mapStateToProps = (state: GlobalState) => {
  const { clients } = state;
  return {
    clients,
  };
};

export default connect(mapStateToProps)(Clients);
