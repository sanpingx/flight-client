import request from '@/config/axios'
import type * as types from './types'

// 登录
export const login = (data: types.UserLogin) => {
  return request.get({ url: '/auth/login', data })
}

// 注册
export const register = (data: types.Register) => {
  return request.post({ url: '/auth/register', data })
}

// 登出
export const loginOut = () => {
  return request.post({ url: '/auth/logout' })
}

// 检索
export const searchFlights = (data: types.searchFlights) => {
  return request.get({ url: '/flight/getFlights', data })
}

// 检索book
export const getBook = () => {
  return request.get({ url: '/booking/getBookings' })
}




