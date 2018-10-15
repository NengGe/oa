<template>
  <div class="out-container">
    <div class="cbg page-bg"></div>
    <App class="cmain" :bus="bus"></App>
  </div>
</template>

<script>
import App from '@/app'
export default {
  name: 'out',
  components: {
    App
  },
  props: ['bus'],
  data () {
    return {

    }
  },
  created () {

  },
  watch: {

  },
  methods: {

  }
}
</script>

<style scoped>
/* @font-face {
  font-family: "iconfont-out";
  src: url("./approvalStatic/fonts/iconfont-out.ttf") format("truetype");
} */
/* .out-container {
  padding-bottom: 66px;
} */
.out-container /deep/ .iconfont-out {
  font-family: "iconfont-out";
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
