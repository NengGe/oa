<template>
  <div class="index page-bg">
    <div class="top">
      <Banner></Banner>
      <Module ref="Module"></Module>
    </div>
    <Message ref="Message"></Message>
    <!-- <Schedule></Schedule> -->
    <!-- <tabBottom></tabBottom> -->
    <!-- <Whole v-show="isShowWhole"></Whole> -->
    <App class="cmain"></App>
  </div>
</template>

<script>
import App from '@/app'
import Banner from './index/Banner'
import tabBottom from './index/tabBottom'
import Module from './index/Module'
import Message from './index/Message'
import Schedule from './index/Schedule'
// import Whole from './index/Whole'
// import { saveTokenAndOpenid } from '@/modules/ajax-mid/web.js'
export default {
  name: 'index',
  components: {
    App,
    Banner,
    tabBottom,
    Module,
    Message,
    Schedule
  },
  data () {
    return {
      isRefreshModule: false
    }
  },
  created () {
    // document.title = '123'
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log('this.isRefreshModule', vm.isRefreshModule)
      vm.refreshModule()
      vm.$refs.Message.getNotifList()
    })
  },
  methods: {
    refreshModule () {
      if (this.isRefreshModule) { // 已经更新module
        this.$refs.Module.getLocalStorage('myAppList')
        return
      } // 未更新module
      this.$refs.Module.getAppModuleLists().then(d => {
        d = d || []
        this.isRefreshModule = true
        this.setLocalStorage('myAppList', d)
      })
    },
    setLocalStorage (k, d) {
      d = typeof d === 'string' ? d : JSON.stringify(d)
      localStorage.setItem(k, d)
    }
  }
}
</script>

<style lang='scss' scoped>
.index {
  padding-bottom: 68px;
}
.top {
  padding-top: 12px;
  background-color: #fff;
}
</style>
