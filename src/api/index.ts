import request from '@config/axios';
import type * as types from '@/types';

// 登录
export const login = (data: types.LoginFormData) => {
  return request.post({ url: '/auth/login', data });
};

// 注册
export const register = (data: types.RegisterFormData) => {
  return request.post({ url: '/auth/register', data });
};

// 登出
export const loginOut = () => {
  return request.post({ url: '/auth/logout' });
};

// 检索
export const searchFlights = (data: types.FlightListFormData) => {
  return request.get({ url: '/flight/getFlights', data });
};

// 检索book
export const getBookings = () => {
  return request.get({ url: '/booking/getBookings' });
};

// 检索airport
export const getAirports = () => {
  return request.get({ url: '/airport/page' });
};

// 追加订单
export const addBooking = (data: types.BookingData) => {
  return request.post({ url: '/booking/create', data });
};
