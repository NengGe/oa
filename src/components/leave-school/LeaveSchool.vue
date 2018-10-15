<template>
  <div class="leave-school">
    <div class="bg"></div>
    <App :bus="bus"></App>
  </div>
</template>

<script>
  import App from '@/app'
  export default {
    name: 'leaveSchool',
    props: ['bus'],
    components: {
      App
    }
  }
</script>

<style scoped>

  @font-face {
    font-family: 'iconfont-leaveSchool';
    src: url('./static/fonts/iconfont-leaveSchool.ttf') format('truetype');
  }
  .leave-school /deep/ .iconfont-leaveSchool {
    font-family: "iconfont-leaveSchool";
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
 .bg{
    z-index: -1;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f0f8fc;
  }


</style>
