import { ReactElement } from 'react';

export interface LoginFormData {
  username: string;
  password: string;
}

export type TokenType = {
  id: number; // 编号
  accessToken: string; // 访问令牌
  refreshToken: string; // 刷新令牌
  userId: number; // 用户编号
  userType: number; //用户类型
  clientId: string; //客户端编号
  expiresTime: number; //过期时间
};

export interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  region: string;
}

export interface SearchFormData {
  flightNumber: string;
  departureDateFrom: string;
  departureDateTo: string;
  departureAirportId: string;
  destinationAirportId: string;
  departmentDateFrom: string;
  departmentDateTo: string;
  returnDateFrom: string;
  returnDateTo: string;
  passenger: string;
}

export interface FlightFormData {}

export interface FlightListFormData {}

export interface BookingData {
  userId: string | undefined;
  flightId: string;
  reference: string;
  stauts: string;
  bookingTime: string;
  totalPrice: string;
}

export interface OrderData {
  key: string;
  orderId: string;
  route: {
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
  };
  flightNumber: string;
  departureAirport: string;
  terminal: string;
  passenger: string;
  price: string;
  status: string;
  createTime: string;
}

export interface SearchFormData {
  departure: string;
  arrival: string;
  date: string;
}

export interface FlightData {
  id: string;
  flightNumber: string;
  airline: string;
  airlineIcon: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  durationH: string;
  durationM: string;
  price: string;
  terminal: string;
}
export interface TagIconData {
  icon: ReactElement;
  color: string;
  text: string;
}

export interface SelectData {
  value: string;
  label: string;
}
