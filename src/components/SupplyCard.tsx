import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from "@mui/material";
import {
  AddShoppingCart as AddShoppingCartIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import React, { useState } from "react";
import { Product, ResupplyQuery } from "../services/supplierService";
import AddProductDialog from "./AddProductDialog";
import { useDispatch } from "react-redux";
import { productActions } from "../actions/productAction";

interface SupplyCardProps {
  product: Product;
}
const SupplyCard: React.FC<SupplyCardProps> = ({
  product,
}) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleSubmitDialog = (resupplyQuery: ResupplyQuery) => {
    setOpenDialog(false);
    productActions.addNewProduct(resupplyQuery)(dispatch);
  };
  
  return (
    <>
      <AddProductDialog
        product={product}
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitDialog}
      />
      <Card
        sx={{
          flexDirection: "column",
          height: "100%",
          display: "flex"
        }}
      >
        <CardContent
          sx={{
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              pb: 3,
              justifyContent: "center",
            }}
          >
            <Avatar
              src={product.image_url}
              alt={product.product_name}
              variant="rounded"
              sx={{
                width: "100px",
                height: "100px",
              }}
            />
          </Box>
          <Typography
            align="center"
            color="textPrimary"
            variant="h5"
            gutterBottom
          >
            {product.product_name}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            startIcon={<AddShoppingCartIcon />}
            onClick={handleOpenDialog}
            fullWidth
          >
            Commander
          </Button>
          <Button
            startIcon={<InfoIcon />}
            fullWidth
            color="secondary"
            component="a"
            href={`https://fr.openfoodfacts.org/produit/${product._id}`}
          >
            Informations
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default SupplyCard;
