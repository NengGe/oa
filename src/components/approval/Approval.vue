<template>
  <div class="approval-container">
    <div class="cbg"></div>
    <App class="cmain" :bus="bus"></App>
    <oa-tabBottom v-show="isTabListShow" :list='tabList' attr='content' @action="tabAction" :currIndex="currIndex"></oa-tabBottom>
  </div>
</template>

<script>
import App from '@/app'
export default {
  name: 'approval',
  props: ['bus'],
  data () {
    return {
      isTabListShow: true,
      currIndex: 0,
      isCom: 'approvalIndex',
      tabList: [
        { content: '新申请', iconClass: 'iconfont-approval', iconDefault: '&#xe6d1;', iconActive: '&#xe602;', com: 'approvalIndex' },
        { content: '我审批的', iconClass: 'iconfont-approval', iconDefault: '&#xe606;', iconActive: '&#xe605;', com: 'approvalCom' },
        { content: '我提交的', iconClass: 'iconfont-approval', iconDefault: '&#xe609;', iconActive: '&#xe607;', com: 'commitCom' },
        { content: '抄送我的', iconClass: 'iconfont-approval', iconDefault: '&#xe676;', iconActive: '&#xe627;', com: 'sendCom' }
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
      console.log(111)
      this.currIndex = i
      this.isCom = item.com
      this.$router.replace({ name: item.com })
    },
    showHandle (to, from) {
      if (from.name) {
        this.transitionName = 'fade'
      }
      let name = this.$route.name
      if (name === 'approvalIndex' || name === 'approvalCom' || name === 'commitCom' || name === 'sendCom') {
        this.isTabListShow = true
        this.currIndex = name === 'approvalIndex'
          ? 0 : name === 'approvalCom'
            ? 1 : name === 'commitCom'
              ? 2 : name === 'sendCom'
                ? 3 : 0
        this.isCom = name
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
  font-family: "iconfont-approval";
  src: url("./approvalStatic/fonts/iconfont-approval.ttf") format("truetype");
}
.approval-container /deep/ .iconfont-approval {
  font-family: "iconfont-approval";
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
  background-color: #fff;
}
.cmain {
  position: relative;
}
</style>
