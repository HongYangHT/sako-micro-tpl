/* eslint-disable */
import Vue from "vue";
import App from "./modules/app.vue";
import router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
import singleSpaVue from "@/micro"
import PackageJson from '../package.json'
// NOTE: 采取懒加载的模式
// import Antd from "ant-design-vue"
// import 'ant-design-vue/dist/antd.css'
// Vue.use(Antd)

// NOTE: 全局引入 `iview` 的样式
import "iview/dist/styles/iview.css";

import i18nManager from "@/utils/i18n";

import "normalize.css";

// 将路由状态同步到store中
sync(store, router);

router.beforeEach((to, from, next) => {
  const lang = to.params.lang || navigator.language || "zh-CN";
  i18nManager.loadLanguageAsync(lang).then(() => next());
});

Vue.config.productionTip = false;

if (module.hot) module.hot.accept();

const SET_SINGLE_SPA = "setSingleSpa";

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    name: `${PackageJson.name}`,
    // el: "#app",
    router,
    store,
    i18n: i18nManager.i18n,
    render: h => h(App) // loadRootComponent: h => h(App)
  }
});

export function bootstrap(props) {
  createDomElement(props.domElement.replace(/#/, ""));
  store.commit(SET_SINGLE_SPA, props.singleSpa);
  return vueLifecycles.bootstrap(props);
}

export function mount(props) {
  createDomElement(props.domElement.replace(/#/, ""));
  return vueLifecycles.mount(props);
}

export function unmount(props) {
  removeDomElement(props.domElement.replace(/#/, ""));
  return vueLifecycles.unmount(props);
}

let el = null;
function createDomElement(domEl = "app") {
  // Make sure there is a div for us to render into
  el = document.getElementById(domEl);

  if (!el) {
    el = document.createElement("div");
    el.id = domEl;
    el.classList.add(`${PackageJson.name}`);
    document.body.appendChild(el);
  }
  return el;
}

function removeDomElement(domEl = "app") {
  el = document.getElementById(domEl);
  if (el) {
    document.body.removeChild(el);
  }
}
