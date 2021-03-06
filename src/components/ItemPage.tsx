import {
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { itemActions } from "../actions/itemActions";
import { GlobalState } from "../reducers";
import { ItemState } from "../reducers/itemReducer";
import { AppDispatch } from "../store";
import ItemCard from "./ItemCard";
import BarcodeCard from "./BarcodeCard";
import ItemOrderHistoryTable from "./ItemOrderHistoryTable";
import AddStockCard from "./AddStockCard";

interface ItemPageParams {
  id: string;
}
interface ItemPageProps {
  dispatch: AppDispatch;
  items: ItemState;
}
const ItemPage: React.FC<ItemPageProps> = ({
  dispatch,
  items,
}) => {
  const { id } = useParams<ItemPageParams>();
  const itemId = parseInt(id, 10);

  useEffect(() => {
    itemActions.getItem(itemId)(dispatch);
  }, []);

  const item = items.items.find(i => i.ean === itemId);
  
  if (items.loading) {
    return <CircularProgress />;
  }
    
  if (!item) {
    return <div>Objet non trouvé</div>;
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Grid
        spacing={2}
        container
      >
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          item
        >
          <ItemCard item={item} />
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          item
        >
          <BarcodeCard item={item} />
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          item
        >
          <ItemOrderHistoryTable item={item} />
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          item
        >
          <AddStockCard item={item} />
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state: GlobalState) => {
  const { items } = state;
  return {
    items,
  };
};

export default connect(mapStateToProps)(ItemPage);
