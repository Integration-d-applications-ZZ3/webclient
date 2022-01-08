import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Chip,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Tooltip,

} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { itemActions } from "../actions/itemActions";
import { AppDispatch } from "../store";
import { ItemState } from "../reducers/itemReducer";
import { GlobalState } from "../reducers";
import { connect } from "react-redux";

interface ItemQuantityChipProps {
  quantity: number;
}
const ItemQuantityChip: React.FC<ItemQuantityChipProps> = ({ quantity }) => {
  const label = quantity == 0 ? "Rupture ⚠️" : quantity.toString();
  const color = quantity == 0 ? "secondary" : "primary";
  // TODO : ajouter une 3eme couleur si proche ?

  return (
    <Chip
      label={label}
      color={color}
      variant="filled"
      style={{ marginRight: "0.5rem" }}
    />
  );
};

// TODO : description en tooltip de la ligne

interface ItemProps {
  dispatch: AppDispatch;
  items: ItemState;
}
const ItemTable: React.FC<ItemProps> = ({
  dispatch,
  items,
}) => {

  // TODO : mettre un lien vers la page du produit ?

  const [orderingByPrice, setOrderingByPrice] = useState(false);
  const itemList = items.items;

  const handleReorderByPrice = () => {
    setOrderingByPrice(!orderingByPrice);
  };

  useEffect(() => {
    itemActions.getAll()(dispatch);
  }, []);

  if (items.loading) {
    return <CircularProgress />;
  }

  if (items.error) {
    return <div>{items.error}</div>;
  }

  if (orderingByPrice) {
    itemList.sort((a, b) => a.price - b.price);
  } else {
    itemList.sort((a, b) => a.ean - b.ean);
  }

  return (
    <Card>
      <CardHeader title="Produits disponibles" />
      <PerfectScrollbar>
        <Box sx={{
          maxHeight: 350, // TODO : ajuster la hauteur
          maxWidth: "100%",
        }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  EAN
                </TableCell>
                <TableCell>
                  &nbsp;
                </TableCell>
                <TableCell>
                  Nom
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderingByPrice}
                    onClick={handleReorderByPrice}
                  >
                    Prix
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  Fournisseur
                </TableCell>
                <TableCell>
                  Quantité
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemList.map(item => (
                <Tooltip
                  key={item.ean}
                  title={item.description}
                >
                  <TableRow hover>
                    <TableCell>
                      {item.ean.toString().padStart(13, "0")}
                    </TableCell>
                    <TableCell>
                      <Avatar
                        src={item.photo}
                        alt={item.name}
                        sx={{
                          width: 40,
                          height: 40,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {item.name}
                    </TableCell>
                    <TableCell>
                      {item.price} €
                    </TableCell>
                    <TableCell>
                      {item.supplierId}
                    </TableCell>
                    <TableCell>
                      <ItemQuantityChip quantity={0} />
                      {/* TODO : régler la vraie quantité */}
                    </TableCell>
                  </TableRow>
                </Tooltip>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

const mapStateToProps = (state: GlobalState) => {
  const { items } = state;
  return {
    items,
  };
};

export default connect(mapStateToProps)(ItemTable);
