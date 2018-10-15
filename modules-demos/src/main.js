import '@/assets/css/comm.css'
import '@/modules/corejs/em-auto'
import Vue from 'vue'
import router from './router'
import App from './app.vue'
import click from '@/modules/corejs/dom/click.vue'
import popup from '@/modules/popup/popup-vue'

import simpleMsg from '@/modules/toast/plugin'
import loading from '@/modules/loading/plugin'

Vue.use(simpleMsg)
Vue.use(loading)
Vue.use(popup)
Vue.use(click)

router.beforeEach((to, from, next) => {
  // preloaderFull.show()
  document.title = to.meta.title || ''
  next()
})
router.afterEach(() => {
  // preloaderFull.close()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 根实例用可实现替换绑定的元素
  template: '<app/>',
  components: {
    App
  }
})
