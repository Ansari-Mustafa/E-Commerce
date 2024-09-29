import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import UploadProducts from '@/components/UploadProducts.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/add-products',
    name: 'UploadProducts',
    component: UploadProducts,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
