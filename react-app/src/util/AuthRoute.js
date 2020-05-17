import React, { useContext } from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

import { AuthContext } from '../context/auth';

export const PublicRoute = ({component: Component, restricted, ...rest}) => {
  const { user } = useContext(AuthContext);

  return (
    <Route {...rest} render={props => (
      user && restricted 
      ? <Redirect to="/" />
      : <Component {...props} />
    )} />
  );
};

export const PrivateRoute = ({component: Component, ...rest}) => {
  const { user } = useContext(AuthContext);

  return (
    <Route {...rest} render={props => (
      user 
      ? <Component {...props} />
      : <Redirect to="/login" />
    )} />
  );
};