import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { Item } from "../services/itemService";

interface ItemCardProps {
  item: Item;
}
const ItemCard: React.FC<ItemCardProps> = ({
  item,
}) => {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <Avatar
            src={item.photo}
            alt={item.name}
            variant="square"
            sx={{
              height: 128,
              width: 128,
              mb: 3.5
            }}
          />
        </Box>
        <Divider />
        <Grid
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            my: 1
          }}
          container
        >
          <Grid item>
            <Typography
              variant="h5"
            >
              {item.name}
            </Typography>
          </Grid>
          <Grid item>
            Prix :<Typography variant="h4">{item.price} €</Typography>
          </Grid>
        </Grid>
        <Typography
          variant="subtitle1"
        >
          {item.description}
        </Typography>
        <Grid
          direction="row-reverse"
          justifyContent="space-between"
          alignItems="flex-end"
          sx={{
            mt: 3,
            mb: -4
          }}
          container
        >
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
