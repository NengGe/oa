<template>
  <div class="list-select">
    <ul class="list" ref="list">
      <li class="item" v-for="(item, i) in list" :key="i">{{item[attr]||item}}</li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable no-unmodified-loop-condition */
import Drag from '../js/drag-init.js'
export default {
  props: {
    i: {
      type: Number,
      default: 0
    },
    itemHeight: {
      type: [Number, String],
      default: 50
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    attr: {
      type: String,
      default: 'content'
    }
  },
  watch: {
    list (newv) {
      console.log('watch')
      this.reset()
      this.initMaxScroll()
      this._emit()
    }
  },
  data () {
    return {
      index: 0,
      itemStyle: {
        lineHeight: this.itemHeight + 'px',
        height: this.itemHeight + 'px'
      },
      ratio: 1,
      v: 0,
      lastTime: '',
      startTime: '',
      lastY: 0,
      startY: 0,
      drag: null,
      maxScroll: 0
    }
  },
  mounted () {
    this.initMaxScroll()
    let { onStart, onMove, onEnd } = this
    let el = this.$refs.list
    el.addEventListener('touchstart', this.touchstart)
    this.drag = new Drag({
      el,
      enableY: true,
      onStart,
      onMove,
      onEnd
    })
    this.drag.init()
    this.reset()
  },
  methods: {
    reset () {
      this.index = this.i
      this.drag.scrollTo({ y: -this.index * this.itemHeight }, 0)
    },
    initMaxScroll () {
      let el = this.$refs.list
      el.clientHeight < this.$el.parentNode.clientHeight && (el.style.minHeight = this.$el.parentNode.clientHeight + 'px') // 给定最小高度 执行一次
      this.$nextTick(() => {
        this.maxScroll = this.$el.parentNode.clientHeight - el.clientHeight
      })
    },
    touchstart (e) {
      if (this.drag.isRunning) {
        let elSite = this.getComputedPosition()
        this.drag.transitionend()
        this.drag.translate(elSite)
      }
    },
    getComputedPosition () {
      let matrix = window.getComputedStyle(this.drag.el, null)
      matrix = matrix['transform'].split(')')[0].split(',')
      return { x: Number(matrix[4]), y: Number(matrix[5]) }
    },
    onStart (e, that) {
      e.preventDefault()
      this.startTime = e.timeStamp
      this.startY = that.elSite.y
    },
    onMove (e, that) {
      if (e.timeStamp - this.startTime > 300) {
        this.startTime = e.timeStamp
        this.startY = that.elSite.y
      }
    },
    onEnd (e, that) {
      this.v = (that.elSite.y - this.startY) / (e.timeStamp - this.startTime)
      let y = that.elSite.y
      if (y > 0 || y < this.maxScroll) { // 下拉or上拉--超出
        y = this.maxScroll * (y < this.maxScroll)
        this.scrollToIndex(y)
        return
      }
      if (Math.abs(this.v) > 0.4) {
        let { s, t } = this.getDistanceAndTime(this.v, 16.7)
        let currY = this.drag.elSite.y + s
        // this.drag.scrollTo({ x: 0, y: currY }, t, 'cubic-bezier(.1,.57,0,1)').then((ev) => {
        this.drag.scrollTo({ x: 0, y: currY }, t, 'cubic-bezier(.21,.8,.3,1)').then((ev) => {
          this.scrollToIndex(currY)
        })
        return
      }
      this.scrollToIndex(y)
    },
    endCb (y) {
      if (y >= 0) { // 下拉--超出
        y = 0
      } else if (y <= this.maxScroll) {
        y = this.maxScroll
      }
      this.scrollToIndex(y)
    },
    scrollToIndex (y) {
      this.index = Math.round(Math.abs(y) / this.itemHeight)
      this.drag.scrollTo({ x: 0, y: -this.index * this.itemHeight }, 100).then(() => {
        this._emit()
      })
    },
    _emit () {
      this.$emit('selectData', {
        value: this.list[this.index],
        i: this.index
      })
    },
    getDistanceAndTime (v) {
      let a = 0.001
      let t = Math.abs(v) / a
      let s = v * t / 2
      let y = s + this.drag.elSite.y
      if (y <= this.maxScroll || y >= 0) {
        s = (y <= this.maxScroll) * this.maxScroll - this.drag.elSite.y
        let f = -v / Math.abs(v)
        let t1 = (-v - Math.sqrt(v * v + 2 * f * a * s)) / (f * a)
        let t2 = (-v + Math.sqrt(v * v + 2 * f * a * s)) / (f * a)
        t = Math.min(t1, t2)
      }
      return {
        s,
        t
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.list-select {
  flex: 1;
  position: relative;
  // height: inherit;
}
.list {
  // height: 250px;
}
.item {
  line-height: 50px;
  height: 50px;
  color: #999;
  // border-bottom: 1px #ccc solid;
  text-align: center;
  box-sizing: border-box;
}
</style>
