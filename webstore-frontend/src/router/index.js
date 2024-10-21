import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import ProductsPage from  '@/pages/Products.vue';
import CategoriesPage from  '@/pages/Categories.vue';
import ServicesPage from  '@/pages/Services.vue';
import AboutPage from  '@/pages/About.vue';
import UploadProducts from '@/components/UploadProducts.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import VerifyEmail from '@/components/VerifyEmail.vue'
import UIComp from '@/components/UIComp.vue'
import ResetPassword from '@/components/ResetPassword.vue'

const routes = [
  {
    path: '/ui',
    name: 'UICOMP',
    component: UIComp,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/reset-password',
    name: 'Password Reset',
    component: ResetPassword,
  },
  { path: '/verify-email', component: VerifyEmail },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsPage, // replace with your actual component
  },
  {
    path: '/categories',
    name: 'Categories',
    component: CategoriesPage, // replace with your actual component
  },
  {
    path: '/services',
    name: 'Services',
    component: ServicesPage, // replace with your actual component
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage, // replace with your actual component
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
