import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Nav from './Nav';
import Home from './Home';
import UserForm from './UserForm';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import NotFound from './NotFound';

const styles = theme => ({
  '@global': {
    body: {
      height: '100vh'
    },
    html: {
      height: '100vh'
    },
    '#app': {
      height: '100%'
    },
    '.centeredFlexBox': {
      height: 'calc(100% - 56px - 48px)',
      [theme.breakpoints.up('sm')]: {
        height: 'calc(100% - 64px - 48px)'
      },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    '.formFlex': {
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',
      paddingTop: theme.spacing(2),
      width: '50ch'
    },
    '.white': {
      color: '#fff'
    },
    '.selected': {
      textDecoration: 'underline'
    },
    '.halfWidthInput': {
      width: '24ch'
    },
    '.spaceBetweenFlex': {
      display: 'flex',
      justifyContent: 'space-between'
    },
    '.centerFlex': {
      display: 'flex',
      justifyContent: 'center'
    }
  }
});

const App = () => {
  const [account, setAccount] = useState('');

  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Nav />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/checkout/account">
            <UserForm account={account} setAccount={setAccount} />
          </Route>
          <Route exact path="/checkout/shipping">
            <ShippingForm account={account} />
          </Route>
          <Route exact path="/checkout/payment">
            <PaymentForm account={account} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  )
};

export default withStyles(styles)(App);

