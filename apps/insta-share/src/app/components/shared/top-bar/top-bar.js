import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './top-bar.scss';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
export class TopBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar bg="bg-transparent" variant="light">
        <div className="navbar-container d-flex">
          <Navbar.Brand href="/" >InstaShare</Navbar.Brand>
            <ul className="navbar-nav align-items-lg-center ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="https://www.facebook.com" target="_blank">
                  <i className="fa fa-facebook-square"></i>
                  <span className="nav-link-inner--text d-none">Facebook</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://www.instagram.com" target="_blank">
                  <i className="fa fa-instagram"></i>
                  <span className="nav-link-inner--text d-none">Instagram</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://twitter.com" target="_blank">
                  <i className="fa fa-twitter-square"></i>
                  <span className="nav-link-inner--text d-none">Twitter</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://github.com" target="_blank">
                  <i className="fa fa-github"></i>
                  <span className="nav-link-inner--text d-none">Github</span>
                </a>
              </li>
              <li className="nav-item d-none d-block ml-lg-4">
                <Button variant="link" className="upload-btn">
                  <span>
                    <i className="fa fa-cloud-upload mr-2"></i>
                  </span>
                  <span>Upload</span>
                </Button>
              </li>
            </ul>
        </div>
      </Navbar>
    );
  }
}
export default TopBar;
