<template>
  <div class="assets">
    <div class="cbg"></div>
    <App :bus="bus"></App>
  </div>

</template>

<script>
  import App from '@/app'
  export default {
    name: 'assets-manage',
    props: ['bus'],
    components: {
      App
    }
  }
</script>

<style scoped>
  /* @font-face {
    font-family: 'iconfont-assets';
    src: url('./fonts/iconfont.ttf') format('truetype');
  } */
  .assets /deep/ .iconfont-assets {
    font-family: "iconfont-assets";
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
</style>
