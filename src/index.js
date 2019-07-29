/* eslint-disable */
import Vue from 'vue'
import App from './modules/app.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
// NOTE: 采取懒加载的模式
// import Antd from "ant-design-vue"
// import 'ant-design-vue/dist/antd.css'
// Vue.use(Antd)

// NOTE: 全局引入 `iview` 的样式
import "iview/dist/styles/iview.css";

import i18nManager from '@/utils/i18n'

import 'normalize.css'

// 将路由状态同步到store中
sync(store, router)

router.beforeEach((to, from, next) => {
  const lang = to.params.lang || navigator.language || 'zh-CN'
  i18nManager.loadLanguageAsync(lang).then(() => next())
})

new Vue({
  el: '#app',
  router,
  store,
  i18n: i18nManager.i18n,
  render: h => h(App)
})
