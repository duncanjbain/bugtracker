import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UserSignup from './components/UserSignup';
import UserLogin from './components/UserLogin';

const UnauthenticatedApp = () => (
  <Switch>
    <Route exact path="/">
      <LandingPage RightSide={UserLogin} />
    </Route>
    <Route exact path="/login">
      <LandingPage RightSide={UserLogin} />
    </Route>
    <Route path="/signup">
      <LandingPage RightSide={UserSignup} />
    </Route>
    <Route path="/*">
      <LandingPage RightSide={UserLogin} />
    </Route>
  </Switch>
);

export default UnauthenticatedApp;
