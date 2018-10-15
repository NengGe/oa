<template>
  <div class="box">
    <grid ref="grid" :row="4" :column="4"></grid>
    <div ref="item" class="item" v-for="i in 16" :key="i">{{i}}</div>
  </div>
</template>

<script>
import grid from './com/grid'
import Drag from './js/drag.js'
export default {
  components: {
    grid
  },
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      gridSiteArr: null, // 网格位置
      dragArr: null,
      currDrag: null,
      lastDrag: null,
      index: ''
    }
  },
  mounted () {
    this.dragBind()
    this.$nextTick(() => {
      this.gridSiteArr = this.$refs.grid.getElSite('1D')
      this.initElSite()
    })
  },
  methods: {
    initElSite () {
      this.dragArr.map((drag, i) => {
        drag.el.i = i
        drag.scrollTo(this.gridSiteArr[i], 0)
      })
    },
    dragBind () {
      let { onStart, onMove, onEnd } = this
      this.dragArr = this.$refs.item.map((item, i) => {
        let dargVm = new Drag({
          el: item,
          enable: true,
          onStart,
          onMove,
          onEnd
        })
        dargVm.init()
        return dargVm
      })
    },
    testCrash (currDrag) {
      let elSize = {
        x: currDrag.el.offsetWidth,
        y: currDrag.el.offsetHeight
      }
      let center = {
        x: elSize.x / 2 + currDrag.elSite.x,
        y: elSize.y / 2 + currDrag.elSite.y
      }
      // console.log('center', center)
      // console.log('elSize', elSize)
      return this.gridSiteArr.findIndex(elSite => {
        return (center.x > elSite.x &&
          center.x < elSite.x + elSize.x &&
          center.y > elSite.y &&
          center.y < elSite.y + elSize.y)
      })
    },
    onStart (e, that) {
      that.el.style['z-index'] = 1
    },
    onMove (e, that) {
      this.index = this.testCrash(that)
      let i = this.index
      console.log(i)
      let dragIsExchanged = this.dragArr.find(drag => {
        return drag.el.i === i
      })
      if (this.lastDrag && this.lastDrag.el.i !== i) {
        this.lastDrag.scrollTo(this.gridSiteArr[this.lastDrag.el.i], 300)
        this.lastDrag = null
      }
      if (i !== -1) { // 进入模板区域
        if (i !== that.el.i) { // 不是当前元素本身区域
          dragIsExchanged.scrollTo(this.gridSiteArr[that.el.i], 300)
          this.lastDrag = dragIsExchanged
        }
      }
      // if (dragIsExchanged === undefined) { // 没进入模板区域
      //   console.log('if')
      //   // this.lastDrag && this.lastDrag.scrollTo(this.gridSiteArr[this.lastDrag.el.i], 300)
      // } else { // 进入模板区域
      //   console.log('else')
      //   if (this.lastDrag !== dragIsExchanged) {
      //     dragIsExchanged.scrollTo(this.gridSiteArr[that.el.i], 300)
      //     // console.log(this.gridSiteArr[that.el.i], dragIsExchanged.elSite)
      //   }
      //   this.lastDrag = dragIsExchanged
      // }
    },
    onEnd (e, that) {
      that.el.style['z-index'] = 0
      if (this.index >= 0 && that.el.i !== this.index) {
        let i = that.el.i
        that.el.i = this.lastDrag.el.i
        this.lastDrag.el.i = i
        that.scrollTo(this.gridSiteArr[this.index], 300)
      } else {
        that.scrollTo(that.elSitetouchStart, 300)
      }
      console.log(this.dragArr)
    }
  }
}
</script>

<style scoped>
.item {
  width: 55px;
  height: 55px;
  background-color: #119696;
  position: fixed;
  left: 0;
  top: 0;
  font-size: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 55px;
}
</style>


