import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serverUrl: process.env.VUE_APP_SERVER_URL,
    api: process.env.VUE_APP_API_URL,
    authTokenKey: 'healthHuddy:authToken',
    refreshTokenKey: 'healthHuddy:refreshToken',
    loginAfterRouteName: 'Admin',
  },
  getters: {
    usersUrl(state) {
      return `${state.api}users`;
    },
    articlesUrl(state) {
      return `${state.api}articles`;
    },
    uploadUrl(state) {
      return `${state.serverUrl}upload/`;
    },
    rapidProUrl(state) {
      return `${state.serverUrl}proxy/rapidpro/`;
    },
    googleAnalyticsUrl(state) {
      return `${state.serverUrl}google_analytics/ga`;
    },
    uploadHeadersReq(state) {
      const token = localStorage.getItem(state.authTokenKey);
      return {
        Authorization: `Bearer ${token}`,
      };
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
