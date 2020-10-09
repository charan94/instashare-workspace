import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './auth.scss';
export class Auth extends Component {
  render() {
    return (
      <div>
        <p>Welcome to auth!</p>

        <ul>
          <li>
            <Link to="/">auth root</Link>
          </li>
        </ul>
        <Route
          path="/"
          render={() => <div>This is the auth root route.</div>}
        />
      </div>
    );
  }
}
export default Auth;
