import LoginService from './LoginService.js';
import UserService from './UserService.js';
import OrderService from './OrderService.js';

export const registerServices = (app) => {
  app.provide('loginService', LoginService);
  app.provide('userService', UserService);
  app.provide('orderService', OrderService);
};