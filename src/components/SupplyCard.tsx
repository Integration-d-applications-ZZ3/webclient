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
import React from "react";
import { Product } from "../services/supplierService";

interface SupplyCardProps {
  product: Product;
}
const SupplyCard: React.FC<SupplyCardProps> = ({
  product,
}) => {
  return (
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
          fullWidth
        >
          Commander
        </Button>
        <Button
          startIcon={<InfoIcon />}
          fullWidth
          color="secondary"
        >
          Informations
        </Button>
      </CardActions>
    </Card>
  );
};

export default SupplyCard;
