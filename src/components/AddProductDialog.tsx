import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField
} from "@mui/material";
import React, { useState } from "react";
import {
  Euro as EuroIcon
} from "@mui/icons-material";
import { Product, ResupplyQuery } from "../services/supplierService";

interface AddProductDialogProps {
  open: boolean;
  product: Product;
  onSubmit?: (resupplyQuery: ResupplyQuery) => void;
  onClose?: () => void;
}
const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  product,
  onSubmit,
  onClose
}) => {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        description: description,
        price: price,
        quantity: quantity,
        ean: product._id.toString().padStart(13, "0"),
      });
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
      title="Ajouter un produit..."
    >
      <DialogTitle>
        Ajouter un produit
      </DialogTitle>
      <DialogContent>
        <Grid
          spacing={2}
          container
        >
          <Grid
            item
            xs={12}
          >
            <TextField
              label="Prix"
              variant="standard"
              fullWidth
              value={price}
              type="number"
              inputProps={{
                maxLength: 13,
                step: "1",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EuroIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) =>
                setPrice(parseFloat(e.target.value))
              }
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              label="Quantité"
              variant="standard"
              fullWidth
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(!isNaN(parseInt(e.target.value)) 
                && parseInt(e.target.value) > 0
                ? parseInt(e.target.value) 
                : 0)}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              label="Description"
              variant="standard"
              fullWidth
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
          onClick={handleSubmit}
          color="primary"
          variant="contained"
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
