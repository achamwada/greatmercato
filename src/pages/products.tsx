import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/product/ProductCard';
import { AppState } from '../store/reducers';
import { EndPoints, Product, ProductActionTypes } from '../store/types/Product';

const ProductListing = () => {
  const dispatch = useDispatch();

  const loadProducts = async () => {
    let productRequest = await fetch(EndPoints.PRODUCT_LIST, {
      method: 'GET'
    });

    const data = await productRequest.json();

    const productResponse: Array<Product> = data.products;

    dispatch({ type: ProductActionTypes.LOAD_ALL_PRODUCTS, payload: productResponse });
  };

  const products = useSelector((state: AppState) => state.product);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Grid container>
          {products.length > 0 && products.map(product => (
            <Grid key={product._id} item xs={12} sm={6} md={4} lg={4} xl={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default ProductListing;
