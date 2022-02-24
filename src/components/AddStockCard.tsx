import { Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Item } from "../services/itemService";
import {
  AddBusiness as AddBusinessIcon
} from "@mui/icons-material";
import { productActions } from "../actions/productAction";
import { useDispatch } from "react-redux";

interface AddStockCardProps {
  item: Item;
}
const AddStockCard: React.FC<AddStockCardProps> = ({
  item
}) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const handleClick = () => {
    productActions.resupplyProduct({
      ean: item.ean.toString().padStart(13, "0"),
      quantity: quantity,
    })(dispatch);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <Card
      sx={{
        height: "100%"
      }}
    >
      <CardHeader
        title="Ajout de stock"
      />
      <Divider />
      <CardContent>
        <Grid
          direction="column"
          alignItems="center"
          justifyContent="center"
          container
        >
          <Grid item>
            <Typography
              variant="h6"
              sx={{
                mb: 3
              }}
            >
              Stock courant : {item.stock}
            </Typography>
          </Grid>

          <Grid
            direction="row"
            container
            justifyContent="center"
            item
          >
            <TextField
              label="Quantité"
              type="number"
              variant="outlined"
              value={quantity}
              onChange={e => setQuantity(parseInt(e.target.value))}
            />
            <Button
              sx={{
                mx: 3
              }}
              startIcon={<AddBusinessIcon />}
              onClick={handleClick}
              color="primary"
              variant="outlined"
            >
              Commander
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AddStockCard;
