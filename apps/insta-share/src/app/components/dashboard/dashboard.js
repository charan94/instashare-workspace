import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './dashboard.scss';
import TopBar from '../shared/top-bar/top-bar';
export class Dashboard extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <Route
          path="/"
          render={() => <div>This is the dashboard root route.</div>}
        />
      </div>
    );
  }
}
export default Dashboard;
