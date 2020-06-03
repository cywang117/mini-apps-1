import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AppBar, ToolBar, Link, Typography, Breadcrumbs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navLink: {
    padding: theme.spacing(0, 2),
    color: "#fff"
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(2)
  }
}));

const Nav = () => {
  let location = useLocation();
  let classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="sticky">
        <ToolBar>
          <Link className={classes.navLink} component={NavLink} exact to="/" activeClassName="selected">
            <Typography variant="h6">Home</Typography>
          </Link>
          <Link
            className={classes.navLink}
            component={NavLink}
            to="/checkout/account"
            activeClassName="selected"
            isActive={(match, location) => location.pathname.includes('checkout')}
          >
            <Typography variant="h6">Checkout</Typography>
          </Link>
        </ToolBar>
      </AppBar>
      {
        location.pathname.includes('checkout') ?
          <Breadcrumbs separator="-" aria-label="breadcrumb" className={classes.flexBox}>
            <Link component={NavLink} to="/checkout/account" activeClassName="selected">
              <Typography variant="h6">Account</Typography>
            </Link>
            <Link component={NavLink} to="/checkout/shipping" activeClassName="selected">
              <Typography variant="h6">Shipping</Typography>
            </Link>
            <Link component={NavLink} to="/checkout/payment" activeClassName="selected">
              <Typography variant="h6">Payment</Typography>
            </Link>
          </Breadcrumbs> :
          ''
      }

    </React.Fragment>
  )
};

export default Nav;