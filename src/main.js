import Vue from 'vue';
import Buefy from 'buefy';
import InlineSvg from 'vue-inline-svg';
import IlhaLogin from '@/components/views/IlhaLogin.vue';
import IlhaIcon from '@/components/core/IlhaIcon.vue';
import IlhaHeader from '@/components/core/IlhaHeader.vue';
import IlhaTable from '@/components/core/IlhaTable.vue';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Buefy);
Vue.component('inline-svg', InlineSvg);
Vue.component('IlhaLogin', IlhaLogin);
Vue.component('IlhaIcon', IlhaIcon);
Vue.component('IlhaHeader', IlhaHeader);
Vue.component('IlhaTable', IlhaTable);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
