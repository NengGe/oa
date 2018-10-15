<template>
  <transition name="more">
    <div class="more page-fixed" v-show="show">
      <!-- logo -->
      <transition name="top-mask">
        <div class="top-mask" v-show="show"></div>
      </transition>
      <transition name="logo">
        <oa-logo class="logo" v-show="show"></oa-logo>
      </transition>
      <!-- 图标btn -->
      <transition name="bottom-mask">
        <div class="bottom-mask" v-show="show"></div>
      </transition>
      <div class="iconBtnContainer-box">
        <transition name="iconBtnContainer">
          <iconBtnContainer attr="menu_name" v-show="show" class="iconBtnContainer" :data="btnData" @action="action"></iconBtnContainer>
        </transition>
      </div>

    </div>
  </transition>
</template>

<script>
import iconBtnContainer from '@/components/index/pages/com/iconBtnContainer'
// import '@/components/index/static/css/animate.min.css'
export default {
  components: {
    iconBtnContainer
  },
  props: {
    show: Boolean
  },
  data () {
    return {
      btnData: [
        // { content: '审批', routerName: 'approvalCom', iconClass: 'iconfont', icon: '&#xe605;', bg: '#45a8fe' },
        // { content: '考勤', routerName: 'attendanceIndex', iconClass: 'iconfont', icon: '&#xe767;', bg: '#69d1eb' },
        // { content: '公告', routerName: 'informIndex', iconClass: 'iconfont', icon: '&#xe63f;', bg: '#ff8888' },
        // { content: '会议', routerName: 'ConferenceIndex', iconClass: 'iconfont', icon: '&#xe60a;', bg: '#fb6bae' },
        // { content: '请假', routerName: 'qingjia', iconClass: 'iconfont', icon: '&#xe61d;', bg: '#f4bf63' },
        // { content: '加班', routerName: '', iconClass: 'iconfont', icon: '&#xe6fb;', bg: '#9988ff' },
        // { content: '班队', routerName: 'leaveSchoolIndex', iconClass: 'iconfont', icon: '&#xe639;', bg: '#6bb7f8' },
        // { content: '全部', routerName: '', iconClass: 'iconfont', icon: '&#xe622;', bg: '#d3d6eb' }
      ]
    }
  },
  created () {
    this.getQuickMenuList()
  },
  methods: {
    action (item) {
      let url = item.url.replace('index.html#', '')
      if (url.indexOf('attendance') !== -1) { // 考勤--原生界面
        window.oa.goNativeInterface('attend')
      } else { // H5界面
        this.$router.push(url)
      }
    },
    getQuickMenuList () {
      return this.$axios.get(`/schoolorg/v1/getQuickMenuList`).then(({ data }) => {
        if (data.status === 200) {
          let mdList = data.result.data
          this.btnData = mdList.map((md, i) => {
            let iconAndBg = md.icon.split('_')
            md.icon = iconAndBg[0]
            md.bg = iconAndBg[1]
            return md
          })
          // let btn = { menu_name: '扫一扫', url: '/schoolTeacherIndex/behaviroEntryIndex/2', bg: '#45a8fe', icon: '&#xe63b;' }
          // this.btnData.unshift(btn)
        }
      })
    }
  }
}
</script>

<style scoped>
.more {
}
.top-mask {
  z-index: -1;
  position: absolute;
  width: 100%;
  top: 0;
  height: 50%;
  background-color: rgba(255, 255, 255, 0.97);
}
.logo {
  padding-top: 60px;
  padding-bottom: 120px;
}
.bottom-mask {
  z-index: -1;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 50%;
  background-color: rgba(255, 255, 255, 0.97);
}
.iconBtnContainer-box {
  height: 350px;
  overflow: hidden;
}
.iconBtnContainer {
  padding-bottom: 200px;
}
.top-mask-enter-active {
  animation: slideInDown 0.05s;
}
.top-mask-leave-active {
  animation: slideOutUp 0.3s;
}
.logo-enter-active {
  animation: bounceInDown 1s;
}
.logo-leave-active {
  animation: slideOutUp 0.5s;
}

.bottom-mask-enter-active {
  animation: slideInUp 0.05s;
}
.bottom-mask-leave-active {
  animation: slideOutDown 0.3s;
}
.iconBtnContainer-enter-active {
  animation: bounceInUp 1s;
}
.iconBtnContainer-leave-active {
  animation: slideOutDown 0.3s;
  transition: opacity .3s;
  opacity: 1;

}
.iconBtnContainer-leave-to {
  opacity: 0;
}

.more-enter-active {
  animation: bounce-in 1s;
}
.more-leave-active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    /* opacity: 0; */
  }
  50% {
    /* opacity: 1; */
    /* transform: translate3d(0, 0, 0); */
  }
  100% {
    /* opacity: 0; */
    /* transform: translate3d(100%, 0, 0); */
  }
}
</style>
