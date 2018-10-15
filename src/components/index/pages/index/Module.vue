<template>
  <iconBtnContainer attr="name" class="box" :data="appList" @action="action"></iconBtnContainer>
</template>

<script>
import iconBtnContainer from '@/components/index/pages/com/iconBtnContainer'
export default {
  components: {
    iconBtnContainer
  },
  data () {
    return {
      temp: [
        { name: '德育资源', url: '/dysource', iconClass: 'iconfont', icon: '&#xe605;', bg: '#45a8fe' },
        { name: '德育公告', url: '/dyinform', iconClass: 'iconfont', icon: '&#xe767;', bg: '#69d1eb' },
        { name: '班级管理', url: '/classManagerindex', iconClass: 'iconfont', icon: '&#xe63f;', bg: '#ff8888' },
        { name: '德育请假', url: '/studentleave', iconClass: 'iconfont', icon: '&#xe60a;', bg: '#fb6bae' },
        { name: '学校管理', url: '/schoolTeacherIndex', iconClass: 'iconfont', icon: '&#xe60a;', bg: '#fb6bae' },
        { name: '学校管理录入', url: '/schoolTeacherIndex/behaviroEntryIndex/1', iconClass: 'iconfont', icon: '&#xe60a;', bg: '#fb6bae' },
        { name: '学校管理录入', url: '/schoolTeacherIndex/behaviroEntryIndex/2', iconClass: 'iconfont', icon: '&#xe60a;', bg: '#fb6bae' },
        { name: '学校管理录入', url: '/schoolTeacherIndex/behaviroEntryIndex/3', iconClass: 'iconfont', icon: '&#xe60a;', bg: '#fb6bae' }
      ],
      myApp: [
        // { content: '审批', routerName: 'approvalCom', iconClass: 'iconfont', icon: '&#xe605;', bg: '#45a8fe' },
        // { content: '考勤', routerName: 'attendanceIndex', iconClass: 'iconfont', icon: '&#xe767;', bg: '#69d1eb' },
        // { content: '公告', routerName: 'informIndex', iconClass: 'iconfont', icon: '&#xe63f;', bg: '#ff8888' },
        // { content: '会议', routerName: 'ConferenceIndex', iconClass: 'iconfont', icon: '&#xe60a;', bg: '#fb6bae' },
        // { content: '请假', routerName: 'qingjia', iconClass: 'iconfont', icon: '&#xe61d;', bg: '#f4bf63' },
        // { content: '加班', routerName: '', iconClass: 'iconfont', icon: '&#xe6fb;', bg: '#9988ff' },
        // { content: '班队', routerName: 'leaveSchoolIndex', iconClass: 'iconfont', icon: '&#xe639;', bg: '#6bb7f8' },
        // { content: '全部', routerName: 'whole', iconClass: 'iconfont', icon: '&#xe622;', bg: '#d3d6eb' }
      ],
      defaultMd: { name: '全部', url: '/whole', iconClass: 'iconfont', icon: '&#xe622;', bg: '#d3d6eb' }
    }
  },
  computed: {
    'appList': function () {
      return this.myApp.concat(this.defaultMd)
    }
  },
  created () {
    this.getLocalStorage('myAppList')
  },
  methods: {
    getLocalStorage (k) {
      console.log('getLocalStorage')
      let d = localStorage.getItem(k)
      d = d ? JSON.parse(d) : []
      this.myApp = this.arrSort(d, 'display_order')
    },
    action (item) {
      let url = item.url.replace('index.html#', '')
      if (url === '/attendance') { // 考勤--原生界面
        window.oa.goNativeInterface('attend')
      } else { // H5界面
        this.$router.push(url)
      }
    },
    getAppModuleLists () {
      // console.log('getAppModuleLists')
      return this.$axios.get(`/schoolorg/v1/getAppModuleLists/3`).then(({ data }) => {
        // this.$preloaderFull.close()
        // console.log(data)
        if (data.status === 200) {
          let myAppListg = data.result.data.common_app_module_list.slice(0, 7)
          // 我的应用
          let myApp = myAppListg.map((md, i) => {
            let iconAndBg = md.icon.split('_')
            md.icon = iconAndBg[0]
            md.bg = iconAndBg[1]
            return md
          })
          myApp = this.arrSort(myApp, 'display_order')
          this.myApp = myApp
          if ((process.env.NODE_ENV !== 'production') || (process.env.APP_TEST === 'true')) {
            this.myApp = this.temp
          }
          return this.myApp
        }
      })
    },
    arrSort (arr, attr) {
      let a = []
      arr.forEach((item, i) => {
        let index = a.findIndex((m, j) => {
          return m[attr] > item[attr]
        })
        index === -1 ? a.push(item) : a.splice(index, 0, item)
      })
      return a
    }
  }
}
</script>

<style scoped>
.box {
  /* height: 238px; */
  background-color: #fff;
}
</style>



