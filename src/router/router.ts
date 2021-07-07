import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import NavBar from '../components/NavBar.vue';

Vue.use(VueRouter);
// verlinkt die routes mit den views
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      header: NavBar,
      default: Dashboard,
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/statistics',
    name: 'Statistics',
    components: {
      header: NavBar,
      default: () => import(/* webpackChunkName: "about" */ '../views/Statistics.vue'),
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/calendar',
    name: 'calendar',
    components: {
      header: NavBar,
      default: () => import(/* webpackChunkName: "about" */ '../views/Calendar.vue'),
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/join',
    name: 'Join',
    components: {
      header: NavBar,
      default: () => import(/* webpackChunkName: "about" */ '../views/Join.vue'),
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/captcha',
    name: 'Captcha',
    component: () => import(/* webpackChunkName: "about" */ '../views/Captcha.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import(/* webpackChunkName: "about" */ '../views/Result.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    components: {
      default: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    },
  },
  {
    path: '/register',
    name: 'Register',
    components: {
      default: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    },
  },
  {
    path: '/:pathMatch(.*)*',
    components: {
      header: NavBar,
      default: () => import('../views/404.vue'),
    },
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
