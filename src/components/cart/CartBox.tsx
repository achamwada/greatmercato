import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cartContainer: {
      textAlign: 'center',
      height: '50px',
      width: '50px',
      cursor: 'pointer'
    },
    faIcon: {
      //padding: '5px',
      fontSize: '25px',
      margin: 'auto'
    },
    badge: {
      margin: theme.spacing(1),
      marginRight: theme.spacing(2)
    }
  })
);

const CartBox: React.FC = () => {
  const classes = useStyles();
  const cart = useSelector((state: AppState) => state.cart);
  const router = useRouter();
  return (
    <div
      data-cy-gotocart
      className={classes.cartContainer}
      onClick={() => router.push('/cart')}
    >
      <Badge
        className={classes.badge}
        badgeContent={cart.length}
        color="secondary"
        data-cy-cartlength={cart.length}
      >
        <FontAwesomeIcon icon={faCartArrowDown} className={classes.faIcon} />
      </Badge>
    </div>
  );
};

export default CartBox;
