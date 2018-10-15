<template>
  <div class="all-app">
    <div class="app-box" v-for="(app, i) in data" :key="'appList'+i">
      <div class="name">{{app.name}}</div>
      <iconBtnContainer add attr='name' :data="app.module_list" @action="action"  :needHeadIcon="isEdite"></iconBtnContainer>
    </div>
  </div>
</template>
<script>
import iconBtnContainer from '@/components/index/pages/com/iconBtnContainer'
export default {
  components: {
    iconBtnContainer
  },
  props: {
    isEdite: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array
    }
  },
  data () {
    return {
      appList: [
        {
          name: '办公室',
          module_list: [
            { content: '审批', routerName: 'approvalCom', iconClass: 'iconfont', icon: '&#xe605;', bg: '#45a8fe' },
            { content: '考勤', routerName: 'attendanceIndex', iconClass: 'iconfont', icon: '&#xe767;', bg: '#69d1eb' },
            { content: '公告', routerName: 'informIndex', iconClass: 'iconfont', icon: '&#xe63f;', bg: '#ff8888' },
            { content: '会议', routerName: 'ConferenceIndex', iconClass: 'iconfont', icon: '&#xe60a;', bg: '#fb6bae' },
            { content: '请假', routerName: 'qingjia', iconClass: 'iconfont', icon: '&#xe61d;', bg: '#f4bf63' },
            { content: '加班', routerName: '', iconClass: 'iconfont', icon: '&#xe6fb;', bg: '#9988ff' },
            { content: '班队', routerName: 'leaveSchoolIndex', iconClass: 'iconfont', icon: '&#xe639;', bg: '#6bb7f8' },
            { content: '全部', routerName: '', iconClass: 'iconfont', icon: '&#xe622;', bg: '#d3d6eb' }
          ]
        },
        {
          name: '教务处',
          module_list: [
            { content: '审批', routerName: 'approvalCom', iconClass: 'iconfont', icon: '&#xe605;', bg: '#45a8fe' },
            { content: '考勤', routerName: 'attendanceIndex', iconClass: 'iconfont', icon: '&#xe767;', bg: '#69d1eb' },
            { content: '公告', routerName: 'informIndex', iconClass: 'iconfont', icon: '&#xe63f;', bg: '#ff8888' },
            { content: '会议', routerName: 'ConferenceIndex', iconClass: 'iconfont', icon: '&#xe60a;', bg: '#fb6bae' },
            { content: '请假', routerName: 'qingjia', iconClass: 'iconfont', icon: '&#xe61d;', bg: '#f4bf63' },
            { content: '加班', routerName: '', iconClass: 'iconfont', icon: '&#xe6fb;', bg: '#9988ff' },
            { content: '班队', routerName: 'leaveSchoolIndex', iconClass: 'iconfont', icon: '&#xe639;', bg: '#6bb7f8' },
            { content: '全部', routerName: '', iconClass: 'iconfont', icon: '&#xe622;', bg: '#d3d6eb' }
          ]
        },
        {
          name: '德育',
          module_list: [
            { content: '审批', routerName: 'approvalCom', iconClass: 'iconfont', icon: '&#xe605;', bg: '#45a8fe' },
            { content: '考勤', routerName: 'attendanceIndex', iconClass: 'iconfont', icon: '&#xe767;', bg: '#69d1eb' },
            { content: '公告', routerName: 'informIndex', iconClass: 'iconfont', icon: '&#xe63f;', bg: '#ff8888' },
            { content: '会议', routerName: 'ConferenceIndex', iconClass: 'iconfont', icon: '&#xe60a;', bg: '#fb6bae' },
            { content: '请假', routerName: 'qingjia', iconClass: 'iconfont', icon: '&#xe61d;', bg: '#f4bf63' },
            { content: '加班', routerName: '', iconClass: 'iconfont', icon: '&#xe6fb;', bg: '#9988ff' },
            { content: '班队', routerName: 'leaveSchoolIndex', iconClass: 'iconfont', icon: '&#xe639;', bg: '#6bb7f8' },
            { content: '全部', routerName: '', iconClass: 'iconfont', icon: '&#xe622;', bg: '#d3d6eb' }
          ]
        }
      ]
    }
  },
  created () {
    // console.log('myApp', this.data)
  },
  methods: {
    action (item, i) {
      if (this.isEdite) {
        this.$emit('add', item, i)
      } else {
        this.$emit('action', item, i)
      }
    },
    aaa () {
      // console.log(111)
    }
  }
}
</script>

<style lang='scss' scoped>
.all-app {
  min-height: 300px;
  margin-top: 12px;
  background-color: #fff;
}
.app-box {
  // padding: 12px 0;
  .name {
    padding: 12px 20px;
    font-size: 15px;
    color: #666;
    font-weight: bold;
  }
}
.iconfont.rightTop {
  border: 1PX solid #fff;
  color: #fff;
  background: #00aeff;
  right: -5px;
  top: -5px;
  line-height: 22px;
}
</style>
