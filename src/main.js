import Vue from 'vue'
import store from './store/index'
import App from './App.vue'
import router from './router'
import lazyLoad from 'vue-lazyload'
import lazyLoadSetting from 'common/lazyLoad'
import Toast from 'components/common/toast/index'
import FastClick from 'fastclick'
FastClick.attach(document.body)
Vue.use(Toast)
Vue.use(lazyLoad, lazyLoadSetting)
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
