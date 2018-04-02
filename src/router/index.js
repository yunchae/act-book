import Vue from 'vue'
import Router from 'vue-router'
import RegisterBookFunction from '@/components/RegisterBookFunction'
import Table from '@/components/Table'
import BookList from '@/components/BookList'
import BookRequest from '@/components/BookRequest'
import BookRequestList from '@/components/BookRequestList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'RegisterBookFunction',
      component: RegisterBookFunction
    },
    // {
    //   path: '/table',
    //   name: 'Table',
    //   component: Table
    // },
    {
      path: '/booklist',
      name:'BookList',
      component: BookList,
      alias: '/'
    },
    {
      path: '/bookrequest',
      name:'BookRequest',
      component: BookRequest
    },
    {
      path: '/bookrequestlist',
      name: 'BookRequestList',
      component: BookRequestList
    }
  ],
  mode: 'history'
})
