<template>
  <div class="attendance-container">
    <div class="cbg"></div>
    <App class="cmain" :bus="bus"></App>
  </div>
</template>

<script>
  import App from '@/app'
  export default {
    name: 'attendance',
    props: ['bus'],
    data () {
      return {}
    },
    components: {
      App
    }
  }
</script>

<style scoped>
  /* @font-face {
    font-family: 'iconfont-attendance';
    src: url('./static/fonts/iconfont-attendance.ttf') format('truetype');
  } */
  .attendance-container /deep/ .iconfont-attendance {
    font-family: "iconfont-attendance";
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .cbg{
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
