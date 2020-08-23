import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AuthContext from '../Context/authentication/AuthContext';
import User from '../store/types/User';

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

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles({});

  const rawUserData = localStorage.getItem('appuser');

  let user: User;
  if (typeof rawUserData === 'string') {
    user = JSON.parse(rawUserData);
  }

  const authCntx = useContext(AuthContext);

  const { authenticated, loginUser } = authCntx;

  const [state, setState] = useState<Partial<User>>({});
  console.log('state', state);

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  return authenticated === false ? (
    <Grid container direction="row">
      <Grid item sm={12} md={6} className={classes.paperContainer}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="p">
            Login
          </Typography>
          <form autoComplete="off">
            <TextField
              name="emailaddress"
              className={classes.fieldSpacing}
              fullWidth
              type="email"
              label="Email"
              placeholder="Email Address"
              value={state.emailaddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStateChange(e)}
            />

            <TextField
              name="password"
              className={classes.fieldSpacing}
              fullWidth
              type="password"
              label="Password"
              placeholder="Password"
              value={state.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStateChange(e)}
            />

            <Button
              className={classes.btn}
              variant="contained"
              color="secondary"
              onClick={() => {
                console.log('test1');
                if (user && state.emailaddress === user.emailaddress && state.password === user.password && loginUser) {
                  loginUser(user);
                }
              }}
            >
              Login
            </Button>
            <Button className={classes.btn} variant="contained" color="primary" onClick={() => history.push('/signup')}>
              Sign Up
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  ) : (
    <div>test</div>
  );
};

export default withRouter(Login);
