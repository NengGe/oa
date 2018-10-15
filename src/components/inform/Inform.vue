<template>
  <div class="inform-container">
    <div class="cbg"></div>
    <App :bus="bus"></App>
    <oa-tabBottom v-show="isTabListShow" :list='tabList' attr='content' @action="tabAction" :currIndex="currIndex"></oa-tabBottom>
  </div>

</template>

<script>
import App from '@/app'
export default {
  name: 'inform',
  props: ['bus'],
  data () {
    return {
      isTabListShow: true,
      currIndex: 0,
      isRouter: 'informIndex',
      tabList: [
        { content: '我收到的', iconClass: 'icon-myReceive iconfont-inform', iconDefault: '&#xe609;', iconActive: '&#xe607;', routerName: 'informIndex' },
        { content: '新公告', iconClass: 'icon-sendInform iconfont-inform', iconDefault: '&#xe7ab;', iconActive: '&#xe63f;', routerName: 'informSend' },
        { content: '我发出的', iconClass: 'icon-mySend iconfont-inform', iconDefault: '&#xe676;', iconActive: '&#xe627;', routerName: 'mySend' }
      ]
    }
  },
  components: {
    App
  },
  watch: {
    '$route' (to, from) {
      this.showHandle(to, from)
    }
  },
  created () {
    this.showHandle(this.$route, {})
  },
  methods: {
    tabAction (item, i) {
      this.currIndex = i
      this.isRouter = item.routerName
      if (item.routerName === 'informSend') {
        this.$router.push({ name: item.routerName, params: { id: '0' } })
        return
      }
      this.$router.replace({ name: item.routerName })
    },
    showHandle (to, from) {
      if (from.name) {
        this.transitionName = 'fade'
      }
      let name = this.$route.name
      if (name === 'informIndex' || name === 'mySend') {
        this.isTabListShow = true
        this.currIndex = name === 'informIndex' ? 0 : 2
        console.log(this.currIndex)
      } else {
        this.isTabListShow = false
      }
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: "iconfont-inform";
  src: url("./informStatic/fonts/iconfont-inform.ttf") format("truetype");
}
.inform-container /deep/ .iconfont-inform {
  font-family: "iconfont-inform";
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.inform-container /deep/ .clearfix:after {
  content: ".";
  height: 0px;
  display: block;
  clear: both;
  overflow: hidden;
  visibility: hidden;
}
.cbg {
  z-index: -1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}
</style>
