// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Api from './api'
import 'jquery/src/jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import {ClientTable, Event} from 'vue-tables-2'
import NewBook from './utils/Book'
import FirebaseDao from './utils/FirebaseDao';
import VueSweetAlert2  from 'vue-sweetalert2'
import './assets/css/act.table.css'
import './assets/css/act.custom.css'
//import 'expose-loader?$!expose-loader?jQuery!jquery'

Vue.use(VueSweetAlert2)
Vue.use(ClientTable)

Vue.prototype.api = Api
Vue.prototype.createBook = NewBook;
Vue.prototype.fireStore = new FirebaseDao();

Vue.config.productionTip = false
Vue.config.devtools = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
