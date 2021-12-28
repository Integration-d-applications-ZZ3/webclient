import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { itemActions } from "../actions/itemActions";
import { GlobalState } from "../reducers";
import { ItemState } from "../reducers/itemReducer";
import { AppDispatch } from "../store";

interface ItemProps {
  dispatch: AppDispatch;
  items: ItemState;
}
const Items: React.FC<ItemProps> = ({
  dispatch,
  items,
}) => {

  useEffect(() => {
    itemActions.getAll()(dispatch);
  }, []);

  if (items.loading) {
    return (
      <CircularProgress />
    );
  }

  if (items.items && items.items.length === 0) {
    return (
      <div>Aucun objet</div>
    );
  }

  return (
    <></>
  );
};

const mapStateToProps = (state: GlobalState) => {
  const { items } = state;
  return {
    items,
  };
};

export default connect(mapStateToProps)(Items);
