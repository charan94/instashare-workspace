import React, { useEffect, useState } from 'react';
import './insta-alert.scss';
import Toast from 'react-bootstrap/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthState, updateError } from '../../../reducer/auth.slice';

export const InstaAlert = (props) => {
  const dispatch = useDispatch();
  const authState = useSelector(getAuthState);
  const [closeError, errorClosed] = useState(false);

  useEffect(() => {
    if (closeError) {
      dispatch(updateError(closeError));
      errorClosed(false);
    }
  }, [dispatch, closeError, errorClosed]);

  return (
    <Toast style={{
      position: 'absolute',
      zIndex: 9999,
      top: 0,
      right: 0,
    }}
      show={authState.error || closeError} onClose={() => { errorClosed(true) }} delay={7000} autohide={true}>
      <Toast.Body className="bg-danger"><strong className="mr-auto text-light">{authState.error}</strong></Toast.Body>
    </Toast>
  );
};
export default InstaAlert;
