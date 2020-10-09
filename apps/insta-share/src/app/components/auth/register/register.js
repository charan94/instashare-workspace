import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './register.scss';
export class Register extends Component {
  render() {
    return (
      <div>
        <p>Welcome to register!</p>

        <ul>
          <li>
            <Link to="/">register root</Link>
          </li>
        </ul>
        <Route
          path="/"
          render={() => <div>This is the register root route.</div>}
        />
      </div>
    );
  }
}
export default Register;
