import Vue from 'vue';
import App from './App';
import router from '@/router/index';
import Vuetify from 'vuetify';
import axios from 'axios';
import VueCookies from 'vue-cookies';

import '@fortawesome/fontawesome-free/css/all.css';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify,{
  iconfont: 'fa'
});
Vue.use(VueCookies);
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
