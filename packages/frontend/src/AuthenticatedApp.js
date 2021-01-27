import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DashboardNavbar from './components/DashboardNavbar';
import Projects from './pages/Projects';

const RedirectHome = () => <Redirect to="/dashboard" />;

const AuthenticatedApp = () => (
  <Switch>
    <Route exact path="/">
      <RedirectHome />
    </Route>
    <Route path="/dashboard">
      <DashboardNavbar />
      <Dashboard />
    </Route>
    <Route path="/projects">
      <DashboardNavbar />
      <Projects />
    </Route>
    <Route exact path="/*">
      <RedirectHome />
    </Route>
  </Switch>
);

export default AuthenticatedApp;
