import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DashboardNavbar from './components/dashboard/DashboardNavbar';
import Projects from './pages/Projects';
import UserProfile from './pages/UserProfile';
import CreateProject from './pages/CreateProject';
import CreateBug from './pages/CreateBug';
import ProjectDetails from './pages/ProjectDetails';
import BugDetails from './pages/BugDetails';
import UserInfo from './pages/UserInfo';

const RedirectHome = () => <Redirect to="/dashboard" />;

const AuthenticatedApp = () => (
  <>
    <DashboardNavbar />
    <Switch>
      <Route exact path="/">
        <RedirectHome />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/projects">
        <Projects />
      </Route>
      <Route path="/project/:projectKey">
        <ProjectDetails />
      </Route>
      <Route path="/createproject">
        <CreateProject />
      </Route>
      <Route path="/createbug">
        <CreateBug />
      </Route>
      <Route path="/bug/:bugKey">
        <BugDetails />
      </Route>
      <Route path="/profile">
        <UserProfile />
      </Route>
      <Route path="/user/:userId">
        <UserInfo />
      </Route>
      <Route exact path="/*">
        <RedirectHome />
      </Route>
    </Switch>
  </>
);

export default AuthenticatedApp;
