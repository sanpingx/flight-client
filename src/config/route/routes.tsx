import { Navigate } from 'react-router-dom';

// Import page element
import Login from '@pages/login';
import Register from '@pages/register';
import Search from '@pages/search';
import Book from '@pages/book';
import Flight from '@pages/flight';
import FlightList from '@pages/flightList';

export const routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/search',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    element: <Search />,
  },
  {
    path: '/book',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    element: <Book />,
  },
  {
    path: '/flight',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    element: <Flight />,
  },

  {
    path: '/flightList',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    element: <FlightList />,
  },
];
