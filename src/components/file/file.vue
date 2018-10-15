<template>
  <div class="file-container">
    <div class="cbg"></div>
    <App class="cmain" :bus="bus"></App>
  </div>
</template>

<script>
  import App from '@/app'
  export default {
    name: 'file',
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
  @font-face {
    font-family: 'iconfont-file';
    src: url('./static/fonts/iconfont-file.ttf') format('truetype');
  }
  .file-container /deep/ .iconfont-file {
    font-family: "iconfont-file";
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
