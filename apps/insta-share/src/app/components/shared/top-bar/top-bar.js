import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './top-bar.scss';
import Navbar from 'react-bootstrap/Navbar';

export class TopBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">InstaShare</Navbar.Brand>
      </Navbar>
    );
  }
}
export default TopBar;
