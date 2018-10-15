<template>
  <div class="whole  page-bg">
    <myApp @edite="onEdite" :isEdite="isEdite" :data='myApp' @action="onAction"></myApp>
    <allApp :isEdite="isEdite" :data="allApp" @action="onAction" @add="onadd"></allApp>
  </div>
</template>
<script>
import myApp from './Whole/myApp'
import allApp from './Whole/allApp'
export default {
  components: {
    myApp,
    allApp
  },
  data () {
    return {
      isEdite: false,
      allApp: [],
      myApp: [],
      btnData: [
        { name: '审批', routerName: 'approvalCom', iconClass: 'iconfont', icon: '&#xe605;', bg: '#45a8fe', display_order: '1' },
        { name: '考勤', routerName: 'attendanceIndex', iconClass: 'iconfont', icon: '&#xe767;', bg: '#69d1eb', display_order: '2' },
        { name: '公告', routerName: 'informIndex', iconClass: 'iconfont', icon: '&#xe63f;', bg: '#ff8888', display_order: '3' },
        { name: '会议', routerName: 'ConferenceIndex', iconClass: 'iconfont', icon: '&#xe60a;', bg: '#fb6bae', display_order: '4' },
        { name: '请假', routerName: 'qingjia', iconClass: 'iconfont', icon: '&#xe61d;', bg: '#f4bf63', display_order: '5' },
        { name: '加班', routerName: '', iconClass: 'iconfont', icon: '&#xe6fb;', bg: '#9988ff', display_order: '6' },
        { name: '班队', routerName: 'leaveSchoolIndex', iconClass: 'iconfont', icon: '&#xe639;', bg: '#6bb7f8', display_order: '7' }
        // { name: '全部', routerName: '', iconClass: 'iconfont', icon: '&#xe622;', bg: '#d3d6eb' }
      ]
    }
  },
  watch: {
    isEdite (newV, oldV) {
      if (!newV && oldV) {
        this.postSaveUserAppModuleRelList()
      }
    }
  },
  created () {
    this.getAppModuleLists()
  },
  methods: {
    setLocalStorage (k, d) { // LocalStorage 存储
      d = typeof d === 'string' ? d : JSON.stringify(d)
      localStorage.setItem(k, d)
    },
    // 保存我的应用修改
    postSaveUserAppModuleRelList () {
      let data = {
        'platform_mode': '6',
        'user_appmodule_rel_list': this.myApp.map((app, i) => {
          return {
            module_id: app.id,
            display_order: app.display_order
          }
        })
      }
      this.$preloaderFull.show()
      return this.$axios.post(`/schoolorg/v1/saveUserAppModuleRelList`, data).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          // console.log(111)
          this.setLocalStorage('myAppList', this.myApp)
        }
      })
    },
    onAction (item, i) {
      if (this.isEdite) return // 编辑状态不跳转
      let url = item.url.replace('index.html#', '')
      if (url === '/attendance') { // 考勤--原生界面
        window.oa.goNativeInterface('attend')
      } else { // H5界面
        this.$router.push(url)
      }
    },
    onadd (item, i) {
      if (this.myApp.length === 7) {
        this.$simpleMsg('最多能添加7个应用')
        return
      }
      let flag = false
      let arr = new Array(7)
      this.myApp.forEach(app => {
        if (app.id === item.id) { // 判断重复
          flag = true
        }
        arr[app.display_order - 1] = 1 // 整理插入顺序
      })
      if (flag) {
        this.$simpleMsg('该应用已存在')
        return
      }
      let index = arr.findIndex(item => {
        return item !== 1
      })
      item.display_order = index + 1 + ''
      this.myApp.push(item)
    },
    onEdite () {
      this.isEdite = !this.isEdite
    },
    // 获取应用列表
    getAppModuleLists () {
      this.$preloaderFull.show()
      return this.$axios.get(`/schoolorg/v1/getAppModuleLists/3`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          // console.log('获取应用列表', data)
          let appList = data.result.data.app_list
          let myAppListg = data.result.data.common_app_module_list
          // 所有应用
          this.allApp = appList.map((app, i) => {
            app.module_list.forEach(md => {
              let iconAndBg = md.icon.split('_')
              md.icon = iconAndBg[0]
              md.bg = iconAndBg[1]
            })
            return app
          })
          // 我的应用
          this.myApp = myAppListg.map((md, i) => {
            md.bg = '#45a8fe'
            let iconAndBg = md.icon.split('_')
            md.icon = iconAndBg[0]
            md.bg = iconAndBg[1]
            return md
          })
          // this.myApp = this.btnData
        }
      })
    }
  }
}
</script>

<style scoped>
.whole {
  /* background-color: #fff; */
  overflow-y: auto;
  /* -webkit-overflow-scrolling: touch; */
}
</style>
