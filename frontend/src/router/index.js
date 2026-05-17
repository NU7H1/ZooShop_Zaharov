import { createRouter, createWebHistory } from 'vue-router';
import mainPage from '../views/mainPage.vue';
import shopPage from '../views/shopPage.vue';
import salesPage from '../views/salesPage.vue';
import LoginPage from '../views/loginPage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import AdminPage from '../views/AdminPage.vue';

const routes = [
  { path: '/login', name: 'login', component: loginPage },
  { path: '/', name: 'main', component: mainPage },
  { path: '/shop', name: 'shop', component: shopPage },
  { path: '/sales', name: 'sales', component: salesPage },
  { path: '/profile', name: 'profile', component: ProfilePage },
  { path: '/admin', name: 'admin', component: AdminPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;