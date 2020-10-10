import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './top-bar.scss';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { getAuthState, triggerLogout } from '../../../reducer/auth.slice';
import { getUploadState, showUploadModalAction } from '../../../reducer/upload.slice';

export const TopBar = () => {
  const dispatch = useDispatch();
  const authState = useSelector(getAuthState);
  const updateState = useSelector(getUploadState);
  const [upload, setUpload] = useState(false);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (logout) {
      dispatch(triggerLogout(logout));
      setLogout(false);
    }
    if(upload) {
      dispatch(showUploadModalAction(true));
      setUpload(false);
    }
  }, [dispatch, logout, setLogout, upload, setUpload]);


  function getActionButtons() {
    return authState.isAuthenticated ? (
      <ul className="navbar-nav align-items-lg-center ml-auto">
        <li className="nav-item d-none d-block ml-lg-4">
          <Button variant="link" color="dark" className="upload-btn" onClick={() => setUpload(true)}>
            <span>
              <i className="fa fa-cloud-upload mr-2"></i>
            </span>
            <span>Upload</span>
          </Button>
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
