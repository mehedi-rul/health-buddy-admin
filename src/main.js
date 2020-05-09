import Vue from 'vue';
import Buefy from 'buefy';
import InlineSvg from 'vue-inline-svg';
import Icon from '@/components/Icon.vue';
import ManagerPanel from '@/components/ManagerPanel.vue';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Buefy);
Vue.component('inline-svg', InlineSvg);
Vue.component('Icon', Icon);
Vue.component('ManagerPanel', ManagerPanel);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
