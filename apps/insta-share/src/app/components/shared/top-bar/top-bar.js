import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './top-bar.scss';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { getAuthState, triggerLogout } from '../../../reducer/auth.slice';

export const TopBar = () => {
  const dispatch = useDispatch();
  const authState = useSelector(getAuthState);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (logout) {
      dispatch(triggerLogout(logout));
      setLogout(false);
    }
  }, [dispatch, logout, setLogout]);

  function getTitle() {
    return `Welcome ${authState.user.firstName} ${authState.user.lastName}`
  }

  function getActionButtons() {
    return authState.isAuthenticated ? (
      <ul className="navbar-nav align-items-lg-center ml-auto">
        <li className="nav-item d-none d-block ml-lg-4">
          <span className="text-white">{getTitle()}</span>
        </li>
        <li className="nav-item d-none d-block ml-lg-4">
          <Button variant="link" color="dark" className="logout-btn" onClick={(e) => setLogout(true)}>
            <span>
              <i className="fa fa-sign-out mr-2"></i>
            </span>
            <span>Logout</span>
          </Button>
        </li>
      </ul>
    ) : null;
  }


  return (
    <Navbar bg={`${authState.isAuthenticated ? 'dark' : 'bg-transparent'}`} variant={`${authState.isAuthenticated ? 'dark' : 'light'}`}>
      <div className="navbar-container d-flex">
        <Navbar.Brand href="/" >InstaShare</Navbar.Brand>
        {getActionButtons()}
      </div>
    </Navbar>
  );
}
export default TopBar;
