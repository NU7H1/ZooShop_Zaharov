import { createRouter, createWebHistory } from 'vue-router';
import mainPage from '../views/mainPage.vue';
import shopPage from '../views/shopPage.vue';

const routes = [
  { path: '/', name: 'main', component: mainPage },
  { path: '/shop', name: 'shop', component: shopPage },
  { path: '/sales', name: 'sales', component: shopPage },     
  { path: '/favorites', name: 'favorites', component: shopPage }, 
  { path: '/contacts', name: 'contacts', component: shopPage },  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;