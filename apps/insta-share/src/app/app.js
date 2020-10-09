import React, { Component } from 'react';
import './app.scss';
import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';
import { Route, Link } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';

export class App extends Component {
  render() {
    return (
      <div>
        <Route
          path="/"
          exact
          component={Dashboard}
        />
        <Route
          path="/page-2"
          exact
          render={() => (
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          )}
        />
        {/* END: routes */}
      </div>
    );
  }
}
export default App;
