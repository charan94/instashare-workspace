import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './footer.scss';
export class Footer extends Component {
  render() {
    return (
      <div>
        <p>Welcome to footer!</p>

        <ul>
          <li>
            <Link to="/">footer root</Link>
          </li>
        </ul>
        <Route
          path="/"
          render={() => <div>This is the footer root route.</div>}
        />
      </div>
    );
  }
}
export default Footer;
