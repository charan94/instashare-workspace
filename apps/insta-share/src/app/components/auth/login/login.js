import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './login.scss';
export class Login extends Component {
  render() {
    return (
      <div>
        <p>Welcome to login!</p>

        <ul>
          <li>
            <Link to="/">login root</Link>
          </li>
        </ul>
        <Route
          path="/"
          render={() => <div>This is the login root route.</div>}
        />
      </div>
    );
  }
}
export default Login;
