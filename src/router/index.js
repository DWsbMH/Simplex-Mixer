import Vue from 'vue'
import Router from 'vue-router'
import Application from '@/components/Application'
import Application0 from '@/components/Application0'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Application',
      component: Application
    },
    {
      path: '/test',
      name: 'Application0',
      component: Application0
    }
  ]
})
