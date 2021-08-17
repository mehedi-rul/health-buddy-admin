import Vue from 'vue';

import Buefy from 'buefy';
import AdminBuddy, { initVeeValidate } from 'admin-buddy';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';
import router from './router';
import store from './store';

initVeeValidate();

Vue.use(Buefy);
Vue.use(AdminBuddy);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

axios.interceptors.request.use(
  (config) => {
    try {
      let token = localStorage.getItem(store.state.authTokenKey);

      const currentHash = window.location.hash;
      if (currentHash.includes('#/iframe-dashboard?token=')) {
        token = currentHash.replace('#/iframe-dashboard?token=', '');
      }

      if (token) {
        // eslint-disable-next-line
        config.headers['Authorization'] = `Bearer ${ token }`;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === 401) {
      localStorage.removeItem(store.state.authTokenKey);
      localStorage.removeItem(store.state.refreshTokenKey);
    }
    return Promise.reject(error);
  },
);

new Vue({
  data() {
    return {
      link: '',
    };
  },
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
