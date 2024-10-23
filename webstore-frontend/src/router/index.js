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
import NotFound from '@/pages/NotFound.vue'
import { auth } from '@/firebase/firebase.config';

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
  {
    path: '/:catchAll(.*)', // This will match all routes not defined above
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


const admins = ref(import.meta.env.VITE_ADMINS.split(','));

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if the route requires authentication
  if ((to.name === 'Login' || to.name === 'Register') && user) {
    next('/');
  } else if (to.name === 'UploadProducts') {
    // Check if user is logged in
    if (user) {
      // Check if the user is an admin
      if (admins.value.includes(user.uid)) {
        next(); // Allow access to UploadProducts
      } else {
        next('/'); // Redirect to Home if not an admin
      }
    } else {
      next('/login'); // Redirect to login if not logged in
    }
  } else {
    next(); // Allow access to other routes
  }
});

export default router;
