import {
  Box,
  Container,
  CircularProgress,
  Grid,
  Pagination
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { productActions } from "../actions/productAction";
import { GlobalState } from "../reducers";
import { ProductState } from "../reducers/productReducer";
import { AppDispatch } from "../store";
import SupplyCard from "./SupplyCard";

interface SuppliesPageProps {
  products: ProductState;
  dispatch: AppDispatch;
}
const SuppliesPage: React.FC<SuppliesPageProps> = ({
  products,
  dispatch,
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    productActions.getProductsFromPage(page)(dispatch);
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };


  return (
    <Container maxWidth={false}>
      <Grid
        spacing={2}
        container
      >
        {!products.loading ?
          <>
            {products.products.map(product => (
              <Grid
                key={product._id}
                lg={3}
                md={6}
                sm={6}
                xs={12}
                item
              >
                <SupplyCard product={product} />            
              </Grid>
            ))}
          </>
          : <Grid
            container
            justifyContent="center"
          >
            <CircularProgress
              sx={{
                my: 30
              }}
            />
          </Grid>
        }
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Pagination
          color="primary"
          count={10}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state: GlobalState) => {
  const { products } = state;
  return {
    products,
  };
};

export default connect(mapStateToProps)(SuppliesPage);
