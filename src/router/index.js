import Vue from 'vue'
import Router from 'vue-router'
import BookList from '@/components/BookList'
import BookRequest from '@/components/BookRequest'
import BookRequestList from '@/components/BookRequestList'

Vue.use(Router)

export default new Router({
  routes: [
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
