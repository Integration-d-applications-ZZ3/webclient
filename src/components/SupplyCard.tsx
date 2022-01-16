import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography
} from "@mui/material";
import {
  AddShoppingCart as AddShoppingCartIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import React from "react";
import { Item } from "../services/itemService";

interface SupplyCardProps {
  item: Item;
}
const SupplyCard: React.FC<SupplyCardProps> = ({
  item,
}) => {
  return (
    <Card
      sx={{
        flexDirection: "column",
        height: "100%",
        display: "flex"
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            pb: 3,
            justifyContent: "center",
          }}
        >
          <Avatar
            src={item.photo}
            alt={item.name}
            variant="rounded"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          variant="h5"
          gutterBottom
        >
          {item.name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
          color="textPrimary"
        >
          {item.description}
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
