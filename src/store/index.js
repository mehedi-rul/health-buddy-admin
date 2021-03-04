import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serverUrl: process.env.VUE_APP_SERVER_URL,
    api: process.env.VUE_APP_API_URL,
    authTokenKey: 'healthHuddy:authToken',
    refreshTokenKey: 'healthHuddy:refreshToken',
    loginAfterRouteName: 'DashboardAdmin',
    passwordResetRequestAfterRouteName: 'PasswordResetConfirmation',
    passwordResetConfirmationAfterRouteName: 'Login',
  },
  getters: {
    usersUrl(state) {
      return `${state.api}users`;
    },
    flowsUrl(state) {
      return `${state.api}flows`;
    },
    rapidProUrl(state) {
      return `${state.serverUrl}rapidpro/`;
    },
    rapidProProxyUrl(state) {
      return `${state.serverUrl}rapidpro/proxy/`;
    },
    rapidProRunUrl(state) {
      return `${state.serverUrl}rapidpro/runs/`;
    },
    googleAnalyticsUrl(state) {
      return `${state.serverUrl}google_analytics/ga`;
    },
    passwordResetRequestUrl(state) {
      return `${state.api}password_reset/`;
    },
    passwordResetConfirmationUrl(state, getters) {
      return `${getters.passwordResetRequestUrl}confirm/`;
    },
    rapidProLabelsCountUrl(state) {
      return `${state.serverUrl}rapidpro/labels_count/`;
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
