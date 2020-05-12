import Vue from 'vue';

import Buefy from 'buefy';
import axios from 'axios';
import VueAxios from 'vue-axios';
import InlineSvg from 'vue-inline-svg';

import IlhaLogin from '@/components/views/IlhaLogin.vue';
import IlhaIcon from '@/components/core/IlhaIcon.vue';
import IlhaHeader from '@/components/core/IlhaHeader.vue';
import IlhaTable from '@/components/core/IlhaTable.vue';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Buefy);
Vue.use(VueAxios, axios);
Vue.component('inline-svg', InlineSvg);
Vue.component('ilha-login', IlhaLogin);
Vue.component('ilha-icon', IlhaIcon);
Vue.component('ilha-header', IlhaHeader);
Vue.component('ilha-table', IlhaTable);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
