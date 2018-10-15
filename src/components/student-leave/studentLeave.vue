<template>
  <div class="studentLeave-container">
    <div class="cbg page-bg"></div>
    <App class="cmain" :bus="bus"></App>
    <oa-tabBottom v-show="isTabListShow" :list='tabList' attr='content' @action="tabAction" :currIndex="currIndex"></oa-tabBottom>

  </div>
</template>

<script>
import App from '@/app'
export default {
  name: 'studentLeave',
  props: ['bus'],
  data () {
    return {
      isInit: false,
      canApprove: false,
      canNewBuild: false,
      isSchool: false,
      isTabListShow: false,
      currIndex: 0,
      routeList: [
        { content: '我审批的', iconClass: 'iconfont-studentLeave', iconDefault: '&#xe607;', iconActive: '&#xe605;', com: 'approval' },
        { content: '新添加', iconClass: 'iconfont-studentLeave', iconDefault: '&#xe6d1;', iconActive: '&#xe602;', com: 'newLeave' },
        { content: '我添加的', iconClass: 'iconfont-studentLeave', iconDefault: '&#xe609;', iconActive: '&#xe608;', com: 'myLeave' },
        { content: '全校请假', iconClass: 'iconfont-studentLeave', iconDefault: '&#xe676;', iconActive: '&#xe627;', com: 'schoolLeave' },
        { content: '全班请假', iconClass: 'iconfont-studentLeave', iconDefault: '&#xe676;', iconActive: '&#xe627;', com: 'schoolLeave' }
      ],
      tabList: []
    }
  },
  created () {
    // console.log('请假模块 created')
    this.getAuthority()
    this.showHandle(this.$route, {})
  },
  watch: {
    '$route' (to, from) {
      this.showHandle(to, from)
    }
  },
  methods: {
    initTabList () {
      let { tabList, routeList } = this
      this.canApprove && tabList.push(routeList[0])
      this.canNewBuild && tabList.push(routeList[1], routeList[2])
      this.isSchool ? tabList.push(routeList[3]) : tabList.push(routeList[4])
      this.$router.replace({ name: this.tabList[0].com })
      // console.log('this.route', this.$route)
    },
    getAuthority () {
      this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/moduleid?module_id=804`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          let d = data.result
          this.canApprove = d.isAppeal === '1'
          this.canNewBuild = d.isApply === '1'
          this.isSchool = d.isSchool === '1'
          this.initTabList()
        } else {
          this.$simpleMsg('初始化请假模块失败')
        }
      })
    },
    tabAction (item, i) {
      this.currIndex = i
      this.$router.replace({ name: item.com, query: { isSchool: this.isSchool } })
    },
    showHandle (to, from) {
      // console.log('执行 showHandle')
      if (from.name) {
        this.transitionName = 'fade'
      }
      let name = this.$route.name
      let index = this.tabList.findIndex((item, i) => {
        return item.com === name
      })
      this.isTabListShow = index !== -1
      this.currIndex = index
    }
  },
  components: {
    App
  }
}
</script>

<style scoped>
@font-face {
  font-family: "iconfont-studentLeave";
  src: url("./static/fonts/iconfont-studentLeave.ttf") format("truetype");
}
.studentLeave-container {
  /* padding-bottom: 66px; */
}
.studentLeave-container /deep/ .iconfont-studentLeave {
  font-family: "iconfont-studentLeave";
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
