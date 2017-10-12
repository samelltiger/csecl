
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'

// 去除点击300毫秒延迟
fastClick.attach(document.body)

Vue.config.productionTip = false

import 'assets/css/index.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
