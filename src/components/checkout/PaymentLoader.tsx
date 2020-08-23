import { Container, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
      backgroundColor: '#fff',
      textAlign: 'center'
    },
    reviewInfo: {
      padding: theme.spacing(2)
    }
  })
);

const PaymentLoader = () => {
  const classes = useStyles({});

  return (
    <Container className={classes.container}>
      <Container>
        <div className={classes.reviewInfo}>
          <CircularProgress disableShrink />
          <Typography variant="h6" component="p" color="textSecondary">
            Please waiting while payment is taking place...
          </Typography>
        </div>
      </Container>
    </Container>
  );
};

export default PaymentLoader;
