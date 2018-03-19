import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Table from '@/components/Table'
import BookList from '@/components/BookList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/table',
      name: 'Table',
      component: Table
    },
    {
      path: '/booklist',
      name:'BookList',
      component: BookList
    }
  ],
  mode: 'history'
})
