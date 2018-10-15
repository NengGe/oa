<template>
  <div class="inform-container">
    <div class="cbg page-bg"></div>
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
      informInfo: false, // 查看权限
      classInformManage: false,
      classInformSend: false,
      schoolInformManage: false,
      schoolInformSend: false,
      isTabListShow: true,
      currIndex: 0,
      routeList: [
        { content: '全部公告', iconClass: 'icon-myReceive iconfont-inform', iconDefault: '&#xe609;', iconActive: '&#xe607;', routerName: 'dy-inform-whole' },
        { content: '新公告', iconClass: 'icon-sendInform iconfont-inform', iconDefault: '&#xe7ab;', iconActive: '&#xe63f;', routerName: 'newBuild', type: [] },
        { content: '我发出的', iconClass: 'icon-mySend iconfont-inform', iconDefault: '&#xe676;', iconActive: '&#xe627;', routerName: 'dy-inform-mySend' }
      ],
      tabList: []
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
    this.getAuthority()
  },
  methods: {
    initTabList (d) {
      let { tabList, routeList } = this
      if (d.indexOf('706') !== -1) {
        this.informInfo = true
      }
      if (d.indexOf('703') !== -1) {
        this.classInformManage = true
      }
      if (d.indexOf('705') !== -1) {
        this.classInformSend = true
      }
      if (d.indexOf('702') !== -1) {
        this.schoolInformManage = true
      }
      if (d.indexOf('704') !== -1) {
        this.schoolInformSend = true
      }

      if (this.informInfo) {
        tabList.push(routeList[0])
      }
      if (this.classInformSend && this.schoolInformSend) {
        tabList.push(routeList[1], routeList[2])
        this.classInformSend && routeList[1].type.push('学校公告')
        this.schoolInformSend && routeList[1].type.push('班级公告')
      }
      if (tabList[0]) {
        this.$router.replace({ name: tabList[0].routerName })
      } else {
        this.$simpleMsg('无公告模块权限')
      }
    },
    getAuthority () {
      this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/module`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          let d = data.result.all_module[0].module_ids
          this.initTabList(d)
        } else {
          this.$simpleMsg('初始化公告模块失败')
        }
      })
    },
    tabAction (item, i) {
      this.currIndex = i
      if (item.routerName === 'newBuild') {
        this.$router.push({ name: item.routerName, params: { id: '0', type: item.type } })
        return
      }
      this.$router.replace({ name: item.routerName })
    },
    showHandle (to, from) {
      if (from.name) {
        this.transitionName = 'fade'
      }
      let name = this.$route.name
      if (name === 'dy-inform-whole' || name === 'newBuild' || name === 'dy-inform-mySend') {
        this.isTabListShow = true
        this.currIndex = name === 'dy-inform-whole' ? 0 : name === 'newBuild' ? 1 : 2
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
  /* background-color: #fff; */
}
</style>
