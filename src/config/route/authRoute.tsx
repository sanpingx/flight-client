import React, { ReactElement } from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
// import { useAuth } from './authContext';

const AuthRoute = ({ ...rest }) => {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = false;
  return (
    <Route
      {...rest}
      render={() => (isAuthenticated ? <ReactElement {...props} /> : <Navigate to="/login" />)}
    />
  );
};

export default AuthRoute;
