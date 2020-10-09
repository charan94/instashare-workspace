import React, { Component } from 'react';
import './app.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import TopBar from './components/shared/top-bar/top-bar';
import Login from './components/auth/login/login';
import PrivateRoute from './components/private-route/private-route';
import Dashboard from './components/dashboard/dashboard';
import Register from './components/auth/register/register';

export class App extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <Switch>
            <Route key="login" path="/login" component={Login}  />
            <Route key="register" path="/register" component={Register} />
            <PrivateRoute path="/" component={Dashboard} />
            <Redirect key="login-redirect" to="/login" />
        </Switch>
      </div>
    );
  }
}
export default App;
