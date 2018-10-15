<template>
  <div class="box">
    <ul class="list row " ref="list">
      <li class="item" v-for="(item, i) in list" :key="i" ref="item" refs='item'>
        <div class="icon">{{item}}</div>
      </li>
    </ul>
    <div class="icon-box" v-for="i in list" :key="i+11111" ref="box">{{i}}</div>
  </div>
</template>

<script>
import Drag from '@/modules/module-test/down-pull/drag.js'
export default {
  props: {
    list: Array
  },
  data () {
    return {
      elArr: null,
      elSiteArr: []
    }
  },
  mounted () {
    this.elArr = this.$refs.box.map((item, i) => {
      let dargVm = new Drag({
        el: item,
        enable: true,
        onMove: this.onMove,
        onEnd: this.onEnd
      })
      dargVm.init()
      return dargVm
    })
    let itemArr = this.$refs.item
    this.$nextTick(function () {
      itemArr.forEach(item => {
        this.elSiteArr.push({
          x: item.offsetLeft,
          y: item.offsetTop
        })
      })
      this.initSite()
      // console.log(this.elSiteArr)
    })
  },
  methods: {
    initSite () {
      this.elArr.map((item, i) => {
        item.scrollTo(this.elSiteArr[i], 0)
      })
    },
    onMove (e, that) {
      // console.log('that.touchMoveSite', that.touchMoveSite)
      // console.log('that.el.offsetLeft', that.el.offsetLeft)
      // console.log('that.el.offsetTop', that.el.offsetTop)
    },
    onEnd (e, that) {
      console.dir(that.el)
      console.log('that.el.offsetLeft', that.el.offsetLeft)
      console.log('that.el.offsetTop', that.el.offsetTop)
    }
  }
}
</script>

<style lang='scss' scoped>
.row {
  padding: 30px 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.item {
  // float: left;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  border: 2px solid #000;
  padding: 5px;
  .icon {
    background: #ccc;
    height: 100%;
    font-size: 56px;
    text-align: center;
    line-height: 90px;
  }
}
.icon-box {
  background: #999;
  width: 100px;
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  font-size: 30px;
}
</style>

