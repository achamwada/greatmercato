import {
  Button,
  Container,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import User from '../../store/types/User';
import PaymentIcons from './assets/PaymentIcons.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paymentDetails: {
      padding: theme.spacing(5),
      backgroundColor: '#fff'
    },
    fieldSpacing: {
      margin: theme.spacing(1)
    },
    paymentOptionsContainer: {
      margin: theme.spacing(2)
    },
    paymentImages: {
      height: '50px',
      width: 'auto'
    }
  })
);

interface Props {
  setPayment: Function;
}

const PaymentDetails: React.FC<Props> = ({ setPayment }) => {
  const classes = useStyles({});

  const user = useSelector((state: AppState) => state.user);

  const [state, setState] = useState<User>(user);

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  const [paymentVisiblility, setPaymentVisiblility] = useState(true);

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return user.firstname !== '' && user.lastname !== '' && user.emailaddress !== '' && user.postcode !== '' ? (
    <Container className={classes.paymentDetails} style={{ display: paymentVisiblility === true ? 'block' : 'none' }}>
      <Typography variant="h5" component="p">
        Pay with
      </Typography>

      <div className={classes.paymentOptionsContainer}>
        <RadioGroup aria-label="paymentOption" name="paymentOption">
          <ExpansionPanel square expanded={expanded === 'creditCard'} onChange={handleChange('creditCard')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography data-cy-open-cc>
                <FormControlLabel value="cc" control={<Radio />} label="Credit or debit card" />
                <img className={classes.paymentImages} src={PaymentIcons} alt="creditcart" />
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ display: 'block' }}>
              <Typography className={classes.fieldSpacing} variant="subtitle2" component="p" color="textSecondary">
                {user.firstname}
              </Typography>

              <Typography className={classes.fieldSpacing} variant="subtitle2" component="p" color="textSecondary">
                {user.lastname}
              </Typography>

              <Typography className={classes.fieldSpacing} variant="subtitle2" component="p" color="textSecondary">
                {user.address}
              </Typography>
              <form autoComplete="off">
                <TextField
                  inputProps={{ 'data-cy-accountnum': '' }}
                  name="accountnum"
                  className={classes.fieldSpacing}
                  fullWidth
                  label="Card number"
                  placeholder="Card number"
                  value={state.accountnum}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStateChange(e)}
                />

                <TextField
                  inputProps={{ 'data-cy-expiry': '' }}
                  name="expirydate"
                  className={classes.fieldSpacing}
                  label="Expiry Date"
                  placeholder="MM / YYYY"
                  value={state.expirydate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStateChange(e)}
                />
                <TextField
                  name="cvv"
                  inputProps={{ 'data-cy-cvv': '' }}
                  className={classes.fieldSpacing}
                  label="CVV"
                  placeholder="CVV"
                  value={state.cvv}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStateChange(e)}
                />

                <div style={{ float: 'right', margin: '2em' }}>
                  <Button
                    data-cy-make-payment
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setPaymentVisiblility(false);
                      setPayment(true);
                    }}
                  >
                    Make payment
                  </Button>
                </div>
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel square expanded={expanded === 'paypal'} onChange={handleChange('paypal')}>
            <ExpansionPanelSummary>
              <FormControlLabel value="pp" control={<Radio />} label="" />
              <img
                className={classes.paymentImages}
                src="https://newsroom.mastercard.com/wp-content/uploads/2016/09/paypal-logo.png"
                alt="paypal"
              />
            </ExpansionPanelSummary>
          </ExpansionPanel>
        </RadioGroup>
      </div>
    </Container>
  ) : null;
};

export default PaymentDetails;
