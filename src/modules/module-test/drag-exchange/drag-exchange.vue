<template>
  <div class="box">
    <row :list='list[0]'></row>
    <row :list='list[1]'></row>
    <row :list='list[2]'></row>
  </div>
</template>

<script>
// import Drag from '@/modules/module-test/down-pull/drag.js'
import row from './row'
export default {
  components: { row },
  data () {
    return {
      vmArr: [],
      elSiteData: [],
      currIndex: 0,
      currEL: null,
      currElSite: {},
      list: [
        [1, 2, 3], [4, 5, 6], [7, 8, 9]
      ]
    }
  },
  mounted () {
    // let { onStart, onMove, onEnd } = this
    // this.vmArr = this.$refs.item.map((item, i) => {
    //   let dargVm = new Drag({
    //     el: item,
    //     enable: true,
    //     onStart,
    //     onMove,
    //     onEnd
    //   })
    //   dargVm.init()
    //   return dargVm
    // })
  },
  watch: {
    list: {
      deep: true,
      handler: function () {
        console.log('list 改变')
      }
    }
  },
  methods: {
    onStart (e, that) {

    },
    onMove (e, that) { },
    onEnd (e, that) {

    }
  }
}
</script>

<style lang='scss' scoped>
.box {
  // position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
ul{
   width: 100%;
    display: flex;
    justify-content: space-around;
}
li{
  width: 100px;
  height: 100px;
  border: 2px solid #ccc;
}
</style>
