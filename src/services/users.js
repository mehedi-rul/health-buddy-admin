import Vue from 'vue';
import store from '../store/index';

export default {
  getUsersUrl() {
    return `${store.state.api}users`;
  },
  getCurrentUser() {
    return Vue.axios.get(`${this.getUsersUrl()}/my_profile`);
  },
  list() {
    return Vue.axios.get(`${this.getUsersUrl()}/`);
  },
  login(credentials) {
    return Vue.axios.post(`${store.state.serverUrl}token/`, credentials).then(({ data }) => {
      localStorage.setItem(store.state.authTokenKey, data.access);
      localStorage.setItem(store.state.refreshTokenKey, data.refresh);
      return data;
    });
  },
  getAdminUrl() {
    return store.state.serverUrl;
  },
};
