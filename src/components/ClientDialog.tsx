import React, { useState } from "react";
import { Client } from "../services/clientService";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
} from "@mui/material";

interface ClientDialogProps {
  insertsNewClient: boolean;
  client: Client;
  open: boolean;
  onSubmit?: (client: Client) => void;
  onClose?: () => void;
}
const ClientDialog: React.FC<ClientDialogProps> = ({
  insertsNewClient,
  client,
  open,
  onSubmit,
  onClose
}) => {
  const [firstName, setFirstName] = useState(client.firstName);
  const [lastName, setLastName] = useState(client.lastName);
  const [city, setCity] = useState(client.city);
  const [zipCode, setZipCode] = useState(client.zipCode);
  
  const handleSubmit = (client: Client) => {
    if (onSubmit) {
      onSubmit({
        id: client.id,
        firstName,
        lastName,
        city,
        zipCode
      });
    }
    if (onClose) {
      onClose();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title="Client"
    >
      <DialogTitle>
        {insertsNewClient
          ? "Nouveau client"
          : `Modifier le client ${client.firstName} ${client.lastName}`}
      </DialogTitle>
      <DialogContent>
        <Grid
          spacing={2}
          container
        >
          <Grid
            item
            xs={6}
          >
            <TextField
              label="Prénom"
              variant="standard"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TextField
              label="Nom"
              variant="standard"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>  
          <Grid
            item
            xs={12}
          >
            <TextField
              label="Ville"
              variant="standard"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />  
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              label="Code postal"
              variant="standard"
              fullWidth
              value={zipCode}
              onChange={(e) => 
                setZipCode(!isNaN(parseInt(e.target.value))
                  ? parseInt(e.target.value) 
                  : 0)
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="secondary"
          variant="contained"
        >
          Annuler
        </Button>
        <Button
          onClick={() => handleSubmit(client)}
          color="primary"
          variant="contained"
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClientDialog;
