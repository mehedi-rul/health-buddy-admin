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
    rapidProUrl(state) {
      return `${state.serverUrl}proxy/rapidpro/`;
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
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
