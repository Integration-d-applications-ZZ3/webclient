import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { itemActions } from "../actions/itemActions";
import { GlobalState } from "../reducers";
import { ItemState } from "../reducers/itemReducer";
import { AppDispatch } from "../store";

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

  const item = items.items.find(i => i.id === itemId);

  
  if (items.loading) {
    return (
      <CircularProgress />
    );
  }
    
  if (!item) {
    return <div>Objet non trouvé</div>;
  }

  return (
    <div>
      wip!
      {item.id}
      {item.name}
      {item.description}
      {item.price} €
      <img src={item.photo} alt={item.name} />
    </div>
  );
};

const mapStateToProps = (state: GlobalState) => {
  const { items } = state;
  return {
    items,
  };
};

export default connect(mapStateToProps)(ItemPage);
