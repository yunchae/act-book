// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Api from './api'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootstrapVue from 'bootstrap-vue'
import {ClientTable, Event} from 'vue-tables-2'
import NewBook from './utils/Book'

Vue.use(ClientTable)
Vue.use(BootstrapVue)

Vue.prototype.$api = Api
Vue.prototype.createBook = NewBook;

Vue.config.productionTip = false
Vue.config.devtools = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
