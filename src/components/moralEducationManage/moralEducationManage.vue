<template>
  <div class="dy-manage">
    <div class="cbg page-bg"></div>
    <App class="cmain" :bus="bus"></App>
    <ul v-if="isShow">
      <input type="number" v-model="type" />
      <li v-for="(item,i) in btnList" :key="i">
        <button @click="btnAction(item, i)">{{item.content}}</button>
      </li>
    </ul>
    <!-- <button @click="aaa">扫一扫</button>
    <div>id:{{id}}</div> -->
    <!-- <oa-tabBottom v-show="isTabListShow" :list='tabList' attr='content' @action="tabAction" :currIndex="currIndex"></oa-tabBottom> -->
  </div>
</template>

<script>
import App from '@/app'
export default {
  name: 'moralEducationManage',
  props: ['bus'],
  components: {
    App
  },
  data () {
    return {
      id: '',
      type: 2,
      isShow: true,
      btnList: [
        { content: '行为入录', routerName: 'behaviorEntry' },
        { content: '申诉处理', routerName: 'appealDealWith' }
      ]
    }
  },
  watch: {
    '$route': {
      handler (to, from) {
        this.isShow = to.name === 'moralEducationManage'
      },
      immediate: true
    }
  },
  methods: {
    aaa () {
      window.getQRCodeData = function (d) {
        this.id = d
      }
      window.oa.OpenScan('getQRCodeData')
    },
    btnAction (item, i) {
      this.$router.push({ name: item.routerName, params: { type: this.type } })
    }
  }
}
</script>

<style scoped>
/* @font-face {
  font-family: "iconfont-morality";
  src: url("./approvalStatic/fonts/iconfont-morality.ttf") format("truetype");
} */
.dy-manage /deep/ .iconfont-morality {
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


