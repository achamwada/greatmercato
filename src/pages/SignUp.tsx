import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AuthContext from '../Context/authentication/AuthContext';
import { AppState } from '../store/reducers';
import User, { UserActionTypes } from '../store/types/User';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperContainer: {
      padding: theme.spacing(5),
      backgroundColor: '#fff',
      margin: 'auto',
      marginTop: '30vh'
    },
    paper: {
      padding: theme.spacing(3)
    },
    fieldSpacing: {
      margin: theme.spacing(1)
    },
    btn: {
      display: 'inline-block',
      margin: '1em'
    }
  })
);

const SignUp: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles({});

  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();

  const [state, setState] = useState<User>(user);

  const authContx = useContext(AuthContext);

  const { loginUser } = authContx;

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  return user.firstname === '' && user.lastname === '' && user.emailaddress === '' && user.password === '' ? (
    <Grid container direction="row">
      <Grid item sm={12} md={6} className={classes.paperContainer}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="p">
            SignUp
          </Typography>
          <form
            autoComplete="off"
            onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {
              e.preventDefault();

              if (state.firstname !== '' && state.lastname !== '' && state.emailaddress !== '' && state.password !== '') {
                dispatch({ type: UserActionTypes.CREATE_ACCOUNT, payload: state });
                loginUser && loginUser(state);
                history.push('/');
              }
            }}
          >
            <TextField
              inputProps={{ 'data-cy-firstname': '' }}
              name="firstname"
              className={classes.fieldSpacing}
              fullWidth
              required
              type="text"
              label="First name"
              placeholder="First name"
              value={state.firstname}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStateChange(e)}
            />
            <TextField
              inputProps={{ 'data-cy-lastname': '' }}
              name="lastname"
              className={classes.fieldSpacing}
              fullWidth
              required
              type="text"
              label="Last name"
              placeholder="Surname"
              value={state.lastname}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStateChange(e)}
            />
            <TextField
              name="emailaddress"
              inputProps={{ 'data-cy-emailaddress': '' }}
              className={classes.fieldSpacing}
              fullWidth
              required
              type="email"
              label="Email"
              placeholder="Email Address"
              value={state.emailaddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStateChange(e)}
            />

            <TextField
              inputProps={{ 'data-cy-password': '' }}
              name="password"
              className={classes.fieldSpacing}
              fullWidth
              required
              type="password"
              label="Password"
              placeholder="Password"
              value={state.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStateChange(e)}
            />

            <Button variant="contained" color="primary" type="submit" data-cy-signup>
              SignUp
            </Button>

            <Button className={classes.btn} variant="contained" color="secondary" onClick={() => history.push('/login')}>
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  ) : null;
};

export default withRouter(SignUp);
