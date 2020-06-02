import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import Nav from './Nav';
import Home from './Home';
import UserForm from './UserForm';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import NotFound from './NotFound';

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Nav />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/checkout/user">
            <UserForm />
          </Route>
          <Route exact path="/checkout/shipping">
            <ShippingForm />
          </Route>
          <Route exact path="/checkout/payment">
            <PaymentForm />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  )
};

export default App;

