import { Container, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { AppState } from '../../store/reducers';
import { CartActionTypes } from '../../store/types/Cart';
import PaymentLoader from './PaymentLoader';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    personalDetails: {
      padding: theme.spacing(2),
      backgroundColor: '#fff'
    },
    halfInputFields: {
      width: '50%',
      marginRight: '5px'
    },
    reviewInfo: {
      padding: theme.spacing(2)
    }
  })
);

const Confirmation = () => {
  const classes = useStyles({});
  const user = useSelector((state: AppState) => state.user);

  const dispatch = useDispatch();
  const orderId = v4();
  useEffect(() => {
    dispatch({ type: CartActionTypes.CLEAR_CART });
    // eslint-disable-next-line
  }, []);

  const { firstname } = user;
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <PaymentLoader />
      ) : (
        <Container className={classes.personalDetails}>
          <Typography variant="h4" component="header" data-order-confirmed="Order Successful">
            Order Successful
          </Typography>
          <Container>
            <div className={classes.reviewInfo}>
              <Typography variant="h6" component="p" color="textSecondary">
                Thank you {firstname} for your order
              </Typography>
              <Typography variant="body1" component="p" color="textSecondary">
                order number is {orderId}
              </Typography>
            </div>
          </Container>
        </Container>
      )}
    </React.Fragment>
  );
};

export default Confirmation;
