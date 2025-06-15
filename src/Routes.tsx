import { AuthProvider } from '@/config/route/authContext';
import AuthRoute from '@/config/route/authRoute';
import { routes } from '@/config/route/routes';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {routes.map((route: any, index: any) => (
            <Route
              key={index} //
              path={route.path} //
              element={<AuthRoute route={route} />}
            />
          ))}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
