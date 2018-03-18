// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Api from './api'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ClientTable, Event} from 'vue-tables-2';

Vue.use(ClientTable);

Vue.prototype.$api = Api;

Vue.config.productionTip = false
Vue.config.devtools = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
