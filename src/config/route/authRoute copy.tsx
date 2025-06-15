import Login from '@pages/login';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './authContext';
import { routes } from './routes';

const AuthRoute1: React.FC<[]> = ({}) => {
  const { loginInfo } = useAuth();
  const isAuthenticated = () => loginInfo && loginInfo.token;

  return (
    <Routes>
      {routes.map((route: any, index: any) => (
        <Route
          key={index}
          path={route.path}
          element={((route: any, index: any) => {
            return route.meta && route.meta.requireAuth && isAuthenticated() ? (
              // <AuthProvider>
                route.element
                // </AuthProvider>
            ) : (
              // <AuthProvider>
                <Login />
                // </AuthProvider>
            );
          })(route, index)}
        />
      ))}
    </Routes>
  );
};

export default AuthRoute1;
