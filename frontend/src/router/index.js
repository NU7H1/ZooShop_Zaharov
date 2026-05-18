import { createRouter, createWebHistory } from 'vue-router';
import mainPage from '../views/mainPage.vue';
import shopPage from '../views/shopPage.vue';
import salesPage from '../views/salesPage.vue';
import profilePage from '../views/profilePage.vue';
import adminPage from '../views/adminPage.vue';

const routes = [
  { path: '/', name: 'main', component: mainPage },
  { path: '/shop', name: 'shop', component: shopPage },
  { path: '/sales', name: 'sales', component: salesPage },
  { path: '/contacts', name: 'contacts', component: mainPage },
  { path: '/profile', name: 'profile', component: profilePage, meta: { requiresAuth: true } },
  { path: '/admin', name: 'admin', component: adminPage, meta: { requiresAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const userId = sessionStorage.getItem('userId');
  const role = sessionStorage.getItem('userRole');

  if (to.meta.requiresAuth && !userId) {
    return { path: '/' };
  }
  if (to.meta.requiresAdmin && role !== 'admin') {
    return { path: '/' };
  }
  return true;
});

export default router;
