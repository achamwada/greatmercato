import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppState } from '../../store/reducers';
import { CartActionTypes } from '../../store/types/Cart';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    CartProductContainer: {
      border: `1px solid ${theme.palette.primary.light}`,
      padding: theme.spacing(1),
      margin: theme.spacing(2)
    },
    imageContainer: {
      width: 'auto',
      height: '11em'
    },
    cartDetails: {
      [theme.breakpoints.down('sm')]: {
        position: 'relative'
      },
      [theme.breakpoints.up('md')]: {
        position: 'fixed'
      },

      margin: theme.spacing(2),
      width: '25%'
    },
    title: {
      fontSize: 14
    },
    bottonContainer: {
      display: 'block',
      width: '100%',
      paddingRight: '1em'
    },
    cartButtons: {
      margin: theme.spacing(1)
    },
    cartActionButtons: {
      display: 'inline-flex'
    },
    quantityField: {
      margin: theme.spacing(1)
    }
  })
);

interface Props extends RouteComponentProps {
  basketContext: string | null;
}
const Basket: React.FC<Props> = ({ basketContext, history }) => {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const loadCart = async () => {
    dispatch({ type: CartActionTypes.LOAD_CART_PRODUCTS });
  };

  const range = (start: number, end: number): Array<number> => {
    if (start === end) return [];
    return [start, ...range(start + 1, end)];
  };

  useEffect(() => {
    loadCart();
    // eslint-disable-next-line
  }, [dispatch]);

  const cartProducts = useSelector((state: AppState) => state.cart);
  let total = cartProducts.reduce(function(prevVal, obj) {
    return prevVal + obj.price * obj.amount;
  }, 0);

  return cartProducts.length > 0 ? (
    <Container>
      <Card className={classes.cartDetails}>
        <CardActions style={{ display: 'block' }}>
          <List>
            {cartProducts.map(product => {
              return product.total_available > 0 && product.amount > 0 ? (
                <ListItem key={product._id}>
                  <ListItemText primary={product.title} />
                  <select
                    data-cy-multiple-product={product._id}
                    className={classes.quantityField}
                    onChange={(event: any) => {
                      let payload = {
                        multiple: event.target.value,
                        productID: product._id
                      };
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
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={() => dispatch({ type: CartActionTypes.REMOVE_FROM_CART, payload: product._id })} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ) : (
                dispatch({ type: CartActionTypes.REMOVE_FROM_CART, payload: product._id })
              );
            })}
          </List>
        </CardActions>
        <CardContent>
          <Divider />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <Typography variant="subtitle1" component="span">
              £<span data-cy-cart-total>{total.toFixed(2)}</span>
            </Typography>

            <Button
              data-cy-clear-cart
              variant="text"
              color="primary"
              className={classes.cartButtons}
              onClick={() => dispatch({ type: CartActionTypes.CLEAR_CART })}
            >
              Clear
            </Button>

            {basketContext === 'cart' ? (
              <Button
                data-cy-gotocheckout
                variant="contained"
                color="secondary"
                className={classes.cartButtons}
                onClick={() => history.push('/checkout')}
              >
                Checkout
              </Button>
            ) : basketContext === 'checkout' ? (
              <Button
                data-cy-gotocheckout
                variant="contained"
                color="secondary"
                className={classes.cartButtons}
                onClick={() => history.push('/checkout')}
              >
                Make Payment
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </Container>
  ) : null;
};
export default withRouter(Basket);
