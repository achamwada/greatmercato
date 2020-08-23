import { Button, Container, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import User, { UserActionTypes } from '../../store/types/User';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    personalDetailsContainer: {
      padding: theme.spacing(5),
      backgroundColor: '#fff'
    },
    fieldSpacing: {
      margin: theme.spacing(1)
    }
  })
);

interface Props {
  setBasketstate: (state: string) => void;
}
const PersonalDetails: React.FC<Props> = ({ setBasketstate }) => {
  const classes = useStyles();

  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();

  const [state, setState] = useState<User>(user);

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  const [showForm, setFormVisibility] = useState(true);

  return (
    <Container className={classes.personalDetailsContainer} style={{ display: showForm === true ? 'block' : 'none' }}>
      <Typography variant="h5" component="p">
        Personal Details
      </Typography>
      <form autoComplete="off">
        <TextField
          name="firstname"
          className={classes.fieldSpacing}
          fullWidth
          required
          label="Enter first name"
          placeholder="First name"
          value={state.firstname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStateChange(e)}
        />
        <TextField
          name="lastname"
          className={classes.fieldSpacing}
          fullWidth
          required
          label="Enter last name"
          placeholder="Last name"
          value={state.lastname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStateChange(e)}
        />
        <TextField
          name="emailaddress"
          className={classes.fieldSpacing}
          fullWidth
          type="email"
          required
          label="Enter email"
          placeholder="email"
          value={state.emailaddress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStateChange(e)}
        />
        <TextField
          name="address"
          inputProps={{ 'data-cy-address': '' }}
          className={classes.fieldSpacing}
          fullWidth
          label="Address"
          placeholder="Address"
          value={state.address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStateChange(e)}
        />
        <TextField
          name="postcode"
          inputProps={{ 'data-cy-postcode': '' }}
          className={classes.fieldSpacing}
          label="Postcode"
          placeholder="Postcode"
          value={state.postcode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStateChange(e)}
        />

        <div style={{ float: 'right', margin: '2em' }}>
          <Button
            data-cy-save-personal-details
            variant="contained"
            color="secondary"
            onClick={() => {
              if (state.firstname !== '' && state.lastname !== '' && state.emailaddress !== '' && state.postcode !== '') {
                setBasketstate('checkout');
                setFormVisibility(false);
                dispatch({ type: UserActionTypes.UPDATE_USER_DETAILS, payload: state });
              }
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default PersonalDetails;
