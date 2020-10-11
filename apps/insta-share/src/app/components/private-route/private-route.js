import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../reducer/auth.slice';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const authState = useSelector(getAuthState);
  return <Route {...rest} render={props => {
    return (
      authState.isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
    )
  }
  } />
};

export default PrivateRoute;