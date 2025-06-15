import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

interface AuthRouteProps {
  route: any;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ route }) => {
  const { loginInfo, isAuthenticated } = useAuth();
  // const isAuthenticated = () => loginInfo && loginInfo.token;
  console.log(route);
  console.log('isAuthenticated:' + !!isAuthenticated());
  console.log('route.requireAuth:' + !!!route.requireAuth);
  return !!!route.requireAuth || !!isAuthenticated() ? (
    route.element
  ) : (
    // <Login />
    <Navigate to="/login" />
  );
};

export default AuthRoute;
