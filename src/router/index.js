import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      if (localStorage.getItem('token')) {
        next(); // to valid authenticated user
      } else {
        next({ path: '/login' });
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "login" */ '../views/Admin.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'DashboardAdmin',
        component: () => import('../views/Dasboard.vue'),
      },
      {
        path: 'content-manager',
        name: 'ContentManagerAdmin',
        component: () => import(/* webpackChunkName: "login" */ '../views/ContentManager.vue'),
      },
      {
        path: 'users',
        name: 'UsersAdmin',
        component: () => import(/* webpackChunkName: "login" */ '../views/Users.vue'),
      },
      {
        path: 'users/:id',
        name: 'UserEdit',
        component: () => import(/* webpackChunkName: "login" */ '../views/User.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
