<template>
  <div class="teacher-index">
    <div class="cbg page-bg"></div>
    <app></app>
  </div>
</template>
<script>
import app from '@/app'
// import '@/components/teacher-mobile/moralityManage/assets/css/comm.css'
// import '@/components/morality-manager/assets/js/gray.js'
export default {
  name: 'teacherIndex',
  components: {
    app
  },
  created () {
    // console.log(66666)
  }
}
</script>

<style scoped>
@font-face {
  /*字体样式*/
  font-family: 'iconfont-morality';
  src: url('./assets/fonts/iconfont.eot');
  src: url('./assets/fonts/iconfont.eot?#iefix') format('embedded-opentype'),
  url('./assets/fonts/iconfont.woff') format('woff'),
  url('./assets/fonts/iconfont.ttf') format('truetype'),
  url('./assets/fonts/iconfont.svg#iconfont') format('svg');
}
.teacher-index a {
  text-decoration: underline;
  color: blue;
}
.teacher-index .teacher-item {
  padding: 10px;
}
.teacher-index /deep/ .iconfont-morality {
  font-family: "iconfont-morality";
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
}
</style>
