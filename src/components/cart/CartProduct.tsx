import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Product, ProductActionTypes } from '../../store/types/Product';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    CartProductContainer: {
      padding: theme.spacing(2),
      margin: theme.spacing(2)
    },
    imageContainer: {
      width: 'auto',
      height: '11em'
    },
    cartDetails: {
      cursor: 'pointer'
    },
    title: {
      fontSize: 14
    },
    bottonContainer: {
      display: 'block',
      width: '100%'
    }
  })
);

interface Props extends RouteComponentProps {
  product: Product;
}
const CartProduct: React.FC<Props> = ({ product, history }) => {
  const classes = useStyles({});
  const dispatch = useDispatch();

  return (
    <Paper>
      <Grid container direction="row" className={classes.CartProductContainer}>
        <Grid item xs={12} sm={12} md={8} onClick={() => history.push(`/product-details/${product._id}`)}>
          <Container className={classes.cartDetails}>
            <Paper
              className={classes.imageContainer}
              style={{ backgroundImage: 'url(' + product.img + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
            />
          </Container>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <>
            <Typography variant="h5" component="p" color="primary">
              {product.title}
            </Typography>
            <Typography variant="body1" component="p" color="textPrimary">
              £{product.price}
            </Typography>
            <Typography variant="body1" component="p" color="textPrimary">
              {product.brand} from {product.seller}
            </Typography>
            <Button
              data-cy-removeitemincart={product._id}
              variant="outlined"
              color="primary"
              onClick={() => dispatch({ type: ProductActionTypes.REMOVE_FROM_CART, payload: product._id })}
            >
              Remove from cart
            </Button>
          </>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withRouter(CartProduct);
