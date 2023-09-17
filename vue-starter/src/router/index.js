import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: false },
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      meta: { requiresAuth: false },
      component: () => import('../views/SigninView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      meta: { requiresAuth: false },
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { requiresAuth: true },
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/create-product',
      name: 'CreateProduct',
      meta: { requiresAuth: true },
      component: () => import('../views/CreateProductView.vue')
    }
  ]
})

//authorized

const auth = () => {

  const userStore = new useUserStore();

  if (userStore.token) {

    return true;
  }
  else {
    return false;
  }
}

router.beforeEach((to, from, next) => {

  const isAuth = auth();


  if (to.meta.requiresAuth && !isAuth) {

    next({ name: 'signin' })
  }
  next();
})

export default router
