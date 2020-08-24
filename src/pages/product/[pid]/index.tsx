import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import OtherProducts from '../../../components/product/OtherProducts';
import { AppState } from '../../../store/reducers';
import { ProductActionTypes } from '../../../store/types/Product';
import { CartActionTypes } from '../../../store/types/Cart';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    productVariants: {
      padding: theme.spacing(1)
    },
    imageContainer: {
      height: '50vh',
      width: 'auto'
    }
  })
);

type UrlParams = {
  id: string;
};
type TParams = { id: number };

const ProductDetails: React.FC = () => {
  const router = useRouter();
  const { pid } = router.query;
  //   console.log('pid ===>', pid);
  const dispatch = useDispatch();
  const classes = useStyles({});

  const products = useSelector((state: AppState) => state.product);
  const productsInCart = useSelector((state: AppState) => state.cart);
  console.log('products', products);
  const [product] = products.filter((product) => product._id === pid);
  console.log('product', product);
  const idsInCart = productsInCart.map((product) => product._id);

  const range = (start: number, end: number): Array<number> => {
    if (start === end) return [];
    return [start, ...range(start + 1, end)];
  };

  return product ? (
    <React.Fragment>
      <Grid item xs={12} sm={12} md={4} xl={4}>
        <Paper
          className={classes.imageContainer}
          style={{
            backgroundImage: 'url(' + product.img + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={8} xl={8}>
        <Container>
          <Typography variant="h5" component="p" color="primary">
            {product.title}
          </Typography>

          <div className={classes.productVariants}>
            <Typography variant="inherit" component="p" color="textSecondary">
              Cost £{product.price}
            </Typography>
          </div>
          <Divider />
          <div className={classes.productVariants}>
            <Typography variant="body1" component="p" color="textSecondary">
              Total available
            </Typography>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              disabled={true}
            >
              {product.total_available - product.amount}
            </Button>
          </div>

          <div className={classes.productVariants}>
            <Typography variant="body1" component="p" color="textSecondary">
              Quantity
            </Typography>
            <select
              onChange={(event: any) => {
                let payload = {
                  multiple: event.target.value,
                  productID: product._id
                };

                if (!idsInCart.includes(product._id)) {
                  dispatch({
                    type: CartActionTypes.ADD_TO_CART,
                    payload: product
                  });
                }
                dispatch({ type: CartActionTypes.MULTIPLY_PRODUCT, payload });
              }}
              value={product.amount}
            >
              {range(0, product.total_available).map((key, value) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className={classes.productVariants}>
            <Typography variant="inherit" component="p" color="textSecondary">
              {`Brand ${product.brand} from ${product.seller}`}
            </Typography>
          </div>

          <div className={classes.productVariants}>
            {idsInCart.length > 0 && idsInCart.includes(product._id) ? (
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() =>
                  dispatch({
                    type: ProductActionTypes.REMOVE_FROM_CART,
                    payload: product._id
                  })
                }
              >
                Remove from Cart
              </Button>
            ) : product.total_available === 0 ? (
              <Button
                disabled={true}
                size="small"
                color="default"
                variant="contained"
              >
                Out of stock
              </Button>
            ) : (
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() =>
                  dispatch({
                    type: ProductActionTypes.ADD_TO_CART,
                    payload: product
                  })
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Divider />

          <div className={classes.productVariants}>
            <Typography variant="inherit" component="p" color="textSecondary">
              {product.description}
            </Typography>
          </div>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <OtherProducts productID={pid} />
      </Grid>
    </React.Fragment>
  ) : null;
};

export default ProductDetails;
