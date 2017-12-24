import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '../components/login'
import Person from '../components/person'
import Goods from '../components/goods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/index/person',
          name: 'person',
          component: Person
        },
        {
          path: '/index/goods',
          name: 'goods',
          component: Goods
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
