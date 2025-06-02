import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {route} from '@/config/route'
// import { AuthProvider } from '@/config/route/authContext';
import AuthRoute from '@/config/route/authRoute';

import Login from '@pages/login';
import Register from '@pages/register';
import Search from '@pages/search';
import Book from '@pages/book';
import Flight from '@pages/flight';
import FlightList from '@pages/flightList';

const AppRoutes = () => {
  return (
    // <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/book" element={<Book />} />
        <Route path="/flight" element={<Flight />} />
        <Route path="/flightList" element={<FlightList />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
    </Router>
    // </AuthProvider>
  );
};

export default AppRoutes;
