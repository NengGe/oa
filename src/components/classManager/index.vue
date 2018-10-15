<template>
  <div class="index-wrapper">
    <app></app>
  </div>
</template>
<script>
import app from '@/app'
// import '@/components/classManager/assets/font/iconfont.css'

export default {
  name: 'indexWrapper',
  components: {
    app
  },
  created () {
    // console.log('hehe')
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
</style>


