import React, { Component } from 'react';
import './app.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import TopBar from './components/shared/top-bar/top-bar';
import PrivateRoute from './components/private-route/private-route';
import Dashboard from './components/dashboard/dashboard';
import Auth from './components/auth/auth';
import InstaAlert from './components/shared/insta-alert/insta-alert';

export class App extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <InstaAlert />
        <Switch>
            <Route key="authKey" path={`/auth/:name`} component={Auth}  />
            <PrivateRoute path="/" component={Dashboard} />
            <Redirect key="login-redirect" to="/auth/login" />
        </Switch>
      </div>
    );
  }
}
export default App;
