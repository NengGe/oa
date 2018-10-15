import '@/assets/css/comm.css'
import '@/assets/css/animate.min.css'
import '@/modules/css-base/transition.css'

import '@/modules/corejs/em-auto'
import '@/js/Polyfill'
import Vue from 'vue'
// import vuex from 'vuex'
import router from './router'
import App from './app.vue'
import directive from '@/assets/js/directive.js'
import eventBus from '@/assets/js/eventBus.js'

import simpleMsg from '@/modules/toast/plugin'
import Loading from '@/modules/loading/plugin'
import Vconfirm from '@/modules/confirm/plugin'

import click from '@/modules/corejs/dom/click.vue'
import popup from '@/modules/popup/popup-vue'
import axios from '@/modules/ajax-mid/axios-vue'
import vuePlugin from '@/js/vue-plugin'

import '@/js/picture-zoom-popup-init' // 放大看图初始
import '@/js/global-components' // 注册全局组件
directive(Vue) // 指令
eventBus(Vue)
let bus = new Vue({
  data: {}
})
let unCacheComponets = ['classBehavior'] // 不缓存的组件

// let $managerBus = new Vue({ // 自我管理班级需要共享的变量
//   data: {
//     gradeIndex: 0,
//     classIndex: 0,
//     classId: '',
//     periodId: '', // 时段id
//     isHaveGroup: true // 是否有小组
//   }
// })
// Vue.prototype.$managerBus = $managerBus

Vue.use(simpleMsg)
Vue.use(Loading)
Vue.use(popup)
Vue.use(axios)
Vue.use(click)
Vue.use(vuePlugin)
Vue.use(Vconfirm)

let { loading } = Vue

router.beforeEach((to, from, next) => {
  loading.show()
  document.title = to.meta.title || ''
  next()
})
router.afterEach(() => {
  loading.close()
})
/* eslint-disable no-new */
new Vue({
  data: {
    bus,
    unCacheComponets
  },
  el: '#app',
  router,
  // 根实例用可实现替换绑定的元素
  template: '<app :bus="bus"/>',
  components: {
    App
  }
})

// router.push({name: 'ConferenceCreate'})
// import('@/modules/popup/debug-msg').then(({default: debug}) => {
//   debug(navigator.userAgent)
// })
