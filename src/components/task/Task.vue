<template>
  <div class="task-container">
    <div class="cbg page-bg"></div>
    <App class="cmain" :bus="bus"></App>
    <oa-tabBottom v-show="isTabListShow" :list='tabList' attr='content' @action="tabAction" :currIndex="currIndex"></oa-tabBottom>
    <!-- <ul class="tabList" v-show="isTabListShow">
      <li v-for="(item,index) in tabList" :key='index' @click="()=>tabAction(item.com)" :class="{active:isCom === item.com}">
        <span class="iconfont-task" :class='[item.iconClass]'></span>
        <span>{{item.content}}</span>
      </li>
    </ul> -->
  </div>
</template>

<script>
import App from '@/app'
export default {
  name: 'task',
  props: ['bus'],
  data () {
    return {
      isTabListShow: false,
      currIndex: 0,
      tabList: [
        { content: '我处理的', iconClass: 'iconfont-task', iconDefault: '&#xe6d1;', iconActive: '&#xe602;', com: 'dealwith' },
        { content: '我发起的', iconClass: 'iconfont-task', iconDefault: '&#xe606;', iconActive: '&#xe605;', com: 'sponsor' },
        { content: '抄送我的', iconClass: 'iconfont-task', iconDefault: '&#xe609;', iconActive: '&#xe607;', com: 'copysend' },
        { content: '新建任务', iconClass: 'iconfont-task', iconDefault: '&#xe676;', iconActive: '&#xe627;', com: 'newtask' }
      ]
    }
  },
  created () {
    this.showHandle(this.$route, {})
  },
  watch: {
    '$route' (to, from) {
      this.showHandle(to, from)
    }
  },
  methods: {
    tabAction (item, i) {
      this.currIndex = i
      i === 3 ? this.$router.push({ name: item.com }) : this.$router.replace({ name: item.com })
    },
    showHandle (to, from) {
      if (from.name) {
        this.transitionName = 'fade'
      }
      let name = this.$route.name
      if (name === 'dealwith' || name === 'sponsor' || name === 'copysend') {
        this.isTabListShow = true
        this.currIndex = name === 'dealwith'
          ? 0 : name === 'sponsor'
            ? 1 : name === 'copysend'
              ? 2 : 0
      } else {
        this.isTabListShow = false
      }
    }
  },
  components: {
    App
  }
}
</script>

<style scoped>
@font-face {
  font-family: "iconfont-task";
  src: url("./static/fonts/iconfont-task.ttf") format("truetype");
}
.task-container {
  /* padding-bottom: 66px; */
}
.task-container /deep/ .iconfont-task {
  font-family: "iconfont-task";
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.cbg {
  z-index: -1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* background-color: #fff; */
}
.cmain {
  position: relative;
}
</style>
