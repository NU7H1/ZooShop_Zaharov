import { createRouter, createWebHistory } from 'vue-router';
import mainPage from '../views/mainPage.vue';
import shopPage from '../views/shopPage.vue';
import salesPage from '../views/salesPage.vue';

const routes = [
  { path: '/', name: 'main', component: mainPage },
  { path: '/shop', name: 'shop', component: shopPage },
  { path: '/sales', name: 'sales', component: salesPage },
  { path: '/contacts', name: 'contacts', component: mainPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;