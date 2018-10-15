<template>
  <div class="homePage-container">
    <div class="cbg page-bg"></div>
    <tabBottom v-show="isShowtabBottom"></tabBottom>
    <App class="cmain" :bus="bus"></App>
  </div>
</template>

<script>
import tabBottom from '@/components/index/pages/index/tabBottom'
import App from '@/app'
export default {
  name: 'homePage',
  components: {
    App,
    tabBottom
  },
  props: ['bus'],
  data () {
    return {
      isShowtabBottom: true
    }
  },
  mounted () {
    // window.addEventListener('scroll', () => {
    //   console.log(document.scrollingElement.scrollTop)
    // })
  },
  watch: {
    '$route': function (to, from) {
      // console.log('$route')
      this.routeHandle(to)
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('进入home')
    next(vm => {
      vm.routeHandle(to)
    })
  },
  methods: {
    routeHandle (to) {
      let n = to.name
      if (n === 'index' || n === 'personal') {
        this.isShowtabBottom = true
      } else {
        this.isShowtabBottom = false
      }
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: "iconfont-homePage";
  src: url("./static/fonts/iconfont-homePage.ttf") format("truetype");
}
.homePage-container /deep/ .iconfont-homePage {
  font-family: "iconfont-homePage";
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
.cmain {
  position: relative;
}
</style>
