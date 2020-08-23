import React, { useState } from 'react';
import { Grid, Hidden } from '@material-ui/core';
import PersonalDetails from '../components/checkout/PersonalDetails';
import PaymentDetails from '../components/checkout/PaymentDetails';
import Basket from '../components/cart/Basket';
import Confirmation from '../components/checkout/Confirmation';

const Checkout = () => {
  const [basket, setBasketstate] = useState<string | null>(null);
  const [makingPayment, setPayment] = useState(false);

  return (
    <React.Fragment>
      <Grid container>
        {makingPayment ? (
          <Grid item sm={12} md={12} lg={12} xl={12}>
            <Confirmation />
          </Grid>
        ) : null}
        <Grid item xs={12} sm={12} md={8}>
          <PersonalDetails setBasketstate={setBasketstate} />
          <PaymentDetails setPayment={setPayment} />
        </Grid>
        <Hidden smDown>
          <Grid item md={4}>
            <Basket basketContext={basket} />
          </Grid>
        </Hidden>
      </Grid>
    </React.Fragment>
  );
};

export default Checkout;
