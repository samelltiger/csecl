import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/pages/Home'
import Direction from 'components/pages/Direction'
import Resource from 'components/pages/Resource'
import Join from 'components/pages/Join'
// import Admin from 'components/pages/Admin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      // 默认的跳转
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/direction',
      component: Direction
    },
    {
      path: '/resource',
      component: Resource
    },
    {
      path: '/join',
      component: Join
    }
  ]
})
