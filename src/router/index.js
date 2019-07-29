import Vue from 'vue'
import Router from 'vue-router'
import packageJson from '../../package.json'
import Home from './module/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: `/${packageJson.name}/`,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "crm-index" */ '@/modules/index.vue'),
      meta: {},
      props: route => ({ query: route.query.id }),
      children: [...Home]
    },
    {
      // 会匹配所有路径
      path: '/403/:lang',
      name: '403',
      component: () => import(/* webpackChunkName: "crm-403" */ '@/modules/exception/403.vue')
    },
    {
      // 会匹配所有路径
      path: '/500/:lang',
      name: '500',
      component: () => import(/* webpackChunkName: "crm-500" */ '@/modules/exception/500.vue')
    },
    {
      // 会匹配所有路径
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: "crm-404" */ '@/modules/exception/404.vue')
    }
  ]
})
