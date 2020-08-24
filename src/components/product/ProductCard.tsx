import {
  CardActionArea,
  CardMedia,
  Typography,
  Card,
  Button
} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppState } from '../../store/reducers';
import { Product, ProductActionTypes } from '../../store/types/Product';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
      margin: theme.spacing(2)
    },
    media: {
      height: 140
    },
    liked: {
      color: theme.palette.primary.main,
      position: 'absolute',
      right: '5px',
      margin: '5px',
      fontSize: '25px',
      padding: '3px'
    },
    unliked: {
      color: theme.palette.secondary.main,
      position: 'absolute',
      right: '5px',
      margin: '5px',
      fontSize: '25px',
      padding: '3px'
    }
  })
);

interface Props extends RouteComponentProps {
  product: Product;
}
const ProductCard: React.FC<Props> = ({ product, history }) => {
  const classes = useStyles({});
  const [disableCart, setDisableCart] = useState(false);
  const [disableBuynow, setDisableBuynow] = useState(false);
  const productsInCart = useSelector((state: AppState) => state.cart);
  const dispatch = useDispatch();
  const idsInCart = productsInCart.map((product) => product._id);
  return (
    <Link scroll={false} as={`/product/${product._id}`} href="/product/[pid]">
      <Card className={classes.card}>
        <CardActionArea
          onClick={() => {
            Router.push({
              pathname: '/product-details',
              query: { pid: product._id }
            });
          }}
        >
          <CardMedia
            className={classes.media}
            image={product.img}
            title={product.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="primary"
            >
              {product.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.brand}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.size}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              £{product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {product.total_available > 0 ? (
            <>
              {idsInCart.length > 0 && idsInCart.includes(product._id) ? (
                <Button
                  data-cy-removefromcart={product._id}
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    dispatch({
                      type: ProductActionTypes.REMOVE_FROM_CART,
                      payload: product._id
                    });
                    setDisableCart(false);
                  }}
                >
                  Remove from Cart
                </Button>
              ) : (
                <>
                  <Button
                    data-cy-addtocart={product._id}
                    disabled={disableCart}
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      dispatch({
                        type: ProductActionTypes.ADD_TO_CART,
                        payload: product
                      });
                      setDisableCart(true);
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    data-cy-buynow={product._id}
                    disabled={disableBuynow}
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      dispatch({
                        type: ProductActionTypes.ADD_TO_CART,
                        payload: product
                      });
                      setDisableBuynow(true);
                      history.push('/checkout');
                    }}
                  >
                    Buy now
                  </Button>
                </>
              )}
            </>
          ) : (
            <Button
              disabled={true}
              size="small"
              color="default"
              variant="contained"
            >
              Out of stock
            </Button>
          )}
        </CardActions>
      </Card>
    </Link>
  );
};

export default ProductCard;
