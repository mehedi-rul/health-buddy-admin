import Vue from 'vue';
import VueRouter from 'vue-router';
import { usersMixin } from 'admin-buddy';
import store from '../store';

Vue.use(VueRouter);

const auth = new Vue({
  mixins: [
    usersMixin,
  ],
  store,
});

const checkAuth = (to, from, next) => {
  auth.getCurrentUser().then(() => {
    next();
  }).catch(() => {
    next({ path: '/login' });
  });
};

const checkAdmin = (to, from, next) => {
  auth.getCurrentUser().then((user) => {
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
  auth.getCurrentUser().then(() => {
    next({ path: '/admin' });
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
    path: '/reset-password',
    name: 'PasswordReset',
    component: () => import('../views/PasswordReset.vue'),
    beforeEnter: checkLogged,
  },
  {
    path: '/confirm-password-reset',
    name: 'PasswordResetConfirmation',
    component: () => import('../views/PasswordResetConfirmation.vue'),
    beforeEnter: checkLogged,
  },
  {
    path: '/iframe-dashboard',
    name: 'IframeDashboard',
    component: () => import('../views/Dasboard.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    beforeEnter: checkAuth,
    component: () => import('../views/Admin.vue'),
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
        path: 'manage-polls',
        name: 'ManageAdmin',
        beforeEnter: checkAdmin,
        component: () => import('../views/managePolls.vue'),
      },
      {
        path: 'manage-polls/:id',
        name: 'ManageEdit',
        beforeEnter: checkAdmin,
        component: () => import('../views/managePoll.vue'),
      },
      {
        path: 'users',
        name: 'UsersAdmin',
        beforeEnter: checkAdmin,
        component: () => import('../views/Users.vue'),
      },
      {
        path: 'users/:id',
        name: 'UserEdit',
        beforeEnter: checkAdmin,
        component: () => import('../views/User.vue'),
      },
      {
        path: 'flows',
        name: 'FlowsAdmin',
        beforeEnter: checkAdmin,
        component: () => import('../views/Flows.vue'),
      },
      {
        path: 'flows/:id',
        name: 'FlowEdit',
        beforeEnter: checkAdmin,
        component: () => import('../views/Flow.vue'),
      },
      {
        path: 'active-poll/:id',
        name: 'Active_polls',
        component: () => import('../views/activePoll.vue'),
      },
      {
        path: 'archived-polls/:id',
        name: 'Archived_polls',
        component: () => import('../views/archivedPolls.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
