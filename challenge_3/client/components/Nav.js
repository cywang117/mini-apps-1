import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, ToolBar, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navLink: {
    padding: theme.spacing(0, 2),
    color: "#fff"
  }
}));

const Nav = () => {
  let location = useLocation();
  let classes = useStyles();
  return (
    <AppBar position="sticky">
      <ToolBar>
        <Link className={classes.navLink} component={RouterLink} to="/">Home</Link>
        {
          location.pathname === '/' ?
            (
              <Link className={classes.navLink} component={RouterLink} to="/checkout/user">Checkout</Link>
            ) : (
              <div>
                <Link className={classes.navLink} component={RouterLink} to="/checkout/user">User</Link>
                <Link className={classes.navLink} component={RouterLink} to="/checkout/shipping">Shipping</Link>
                <Link className={classes.navLink} component={RouterLink} to="/checkout/payment">Payment</Link>
              </div>
            )
        }
      </ToolBar>
    </AppBar>
  )
};

export default Nav;