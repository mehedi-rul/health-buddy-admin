import Vue from 'vue';
import VueRouter from 'vue-router';
import userService from '../services/users';

Vue.use(VueRouter);

const checkAuth = (to, from, next) => {
  userService.getCurrentUser().then(() => {
    next();
  }).catch(() => {
    next({ path: '/login' });
  });
};

const checkAdmin = (to, from, next) => {
  userService.getCurrentUser().then((user) => {
    if (user.is_staff) {
      next();
    } else {
      next({ path: '/admin' });
    }
  }).catch(() => {
    next({ path: '/login' });
  });
};

const checkLogged = (to, from, next) => {
  userService.getCurrentUser().then(() => {
    next({ path: '/admin' });
    next();
  }).catch(() => {
    next();
  });
};

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login',
    beforeEnter: checkLogged,
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    beforeEnter: checkLogged,
  },
  {
    path: '/admin',
    name: 'Admin',
    beforeEnter: checkAuth,
    component: () => import(/* webpackChunkName: "login" */ '../views/Admin.vue'),
    children: [
      {
        path: '',
        redirect: 'dashboard',
      },
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
        beforeEnter: checkAdmin,
        component: () => import(/* webpackChunkName: "login" */ '../views/Users.vue'),
      },
      {
        path: 'users/:id',
        name: 'UserEdit',
        beforeEnter: checkAdmin,
        component: () => import(/* webpackChunkName: "login" */ '../views/User.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
