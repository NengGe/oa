<template>
  <div class="statistics">
    <div class="bg"></div>
    <App :bus="bus"></App>
  </div>
</template>

<script>
  import App from '@/app'
  export default {
    name: 'statistics',
    props: ['bus'],
    components: {
      App
    }
  }
</script>

<style scoped>

  @font-face {
    font-family: 'iconfont-statistics';
    src: url('./assets/fonts/iconfont-statistics.ttf') format('truetype');
  }
  .statistics /deep/ .iconfont-statistics {
    font-family: "iconfont-statistics";
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
