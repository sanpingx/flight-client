// Import page element
import OrderPage from '@pages/book';
import Flight from '@pages/flight';
import FlightList from '@pages/flightList';
import Login from '@pages/login';
import Register from '@pages/register';
// import Search from '@pages/search';
import CompletionPage from '@pages/completion';
import OrderList from '@pages/orderList';
import PaymentPage from '@pages/payment';
import FlightSearch from '@pages/search';

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
    requireAuth: true,
    element: <FlightSearch />,
  },
  {
    path: '/book',
    requireAuth: true,
    element: <OrderPage />,
  },
  {
    path: '/flight',
    requireAuth: true,
    element: <Flight />,
  },

  {
    path: '/flightList',
    requireAuth: true,
    element: <FlightList />,
  },

  {
    path: '/orderList',
    requireAuth: true,
    element: <OrderList />,
  },

  {
    path: '/payment',
    requireAuth: true,
    element: <PaymentPage />,
  },

  {
    path: '/completion',
    requireAuth: true,
    element: <CompletionPage />,
  },
];
