import { Container, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Basket from '../components/cart/Basket';
import CartProduct from '../components/cart/CartProduct';
import { AppState } from '../store/reducers';
import { ProductActionTypes } from '../store/types/Product';

const Cart: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();

  const loadCart = async () => {
    dispatch({ type: ProductActionTypes.LOAD_CART_PRODUCTS });
  };

  useEffect(() => {
    loadCart();
    // eslint-disable-next-line
  }, [dispatch]);

  const cartProducts = useSelector((state: AppState) => state.cart);

  return cartProducts.length > 0 ? (
    <Grid container direction="row">
      <Grid item xs={12} sm={12} md={8} lg={6}>
        {cartProducts.map(product => (
          <Grid key={product._id} item xs={12} sm={12}>
            <CartProduct product={product} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={6}>
        <Basket basketContext="cart" />
      </Grid>
    </Grid>
  ) : (
    <Container style={{ margin: 'auto' }}>
      <Typography data-cy-cart-status variant="h3" component="p" color="textSecondary" style={{ textAlign: 'center' }}>
        Your shopping cart is now empty
      </Typography>
    </Container>
  );
};
export default withRouter(Cart);
