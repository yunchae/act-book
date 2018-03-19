import Vue from 'vue'
import Router from 'vue-router'
import Table from '@/components/Table'
import BookList from '@/components/BookList'
import BookRequest from '@/components/BookRequest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/table',
      name: 'Table',
      component: Table
    },
    {
      path: '/booklist',
      name:'BookList',
      component: BookList
    },
    {
      path: '/bookrequest',
      name:'BookRequest',
      component: BookRequest
    }
  ],
  mode: 'history'
})
