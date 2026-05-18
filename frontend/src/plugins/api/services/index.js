import LoginService from './LoginService.js';
import UserService from './UserService.js';
import OrderService from './OrderService.js';
import ProductService from './productService.js';

export const registerServices = (app) => {
  app.provide('loginService', LoginService);
  app.provide('userService', UserService);
  app.provide('orderService', OrderService);
  app.provide('productService', ProductService);
};