<template>
  <div class="weekly-work">
    <div class="cbg page-bg"></div>
    <App class="cmain" :bus="bus"></App>
  </div>
</template>

<script>
import App from '@/app'
export default {
  name: 'weeklyWork',
  props: ['bus'],
  components: {
    App
  }
}
</script>

<style scoped>
/* @font-face {
  font-family: "iconfont-task";
  src: url("./static/fonts/iconfont-weeklyWork.ttf") format("truetype");
} */
.weekly-work {
  /* padding-bottom: 66px; */
}
.weekly-work /deep/ .iconfont-weeklyWork {
  font-family: "iconfont-weeklyWork";
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

