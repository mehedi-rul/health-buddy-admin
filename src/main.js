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
    const token = localStorage.getItem(store.state.authTokenKey);
    if (token) {
      // eslint-disable-next-line
      config.headers['Authorization'] = `Bearer ${ token }`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
