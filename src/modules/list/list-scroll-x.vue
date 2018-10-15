<template>
  <div class="list-scroll" ref="list">
    <slot></slot>
  </div>
</template>

<script>
/* eslint-disable no-unmodified-loop-condition no-undef */
/* eslint-disable no-undef */
import Drag from './js/drag-init.js'
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      index: 0,
      ratio: 1,
      v: 0,
      startTime: '',
      moveTime: '',
      lastTime: '',
      startX: 0,
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
      enableX: true,
      onStart,
      onMove,
      onEnd
    })
    this.drag.init()
  },
  updated () {
    this.initMaxScroll()
    this.drag.scrollTo({ x: this.maxScroll }, 100)
  },
  methods: {
    initMaxScroll () {
      let el = this.$refs.list
      el.style.minWidth = el.parentNode.clientWidth + 'px' // 给定最小高度 执行一次
      this.maxScroll = el.parentNode.clientWidth - el.clientWidth
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
      this.initMaxScroll()
      this.startTime = e.timeStamp
      this.startX = that.elSite.x
    },
    onMove (e, that) {
      this.moveTime = e.timeStamp
      if (e.timeStamp - this.startTime > 300) {
        this.startTime = e.timeStamp
        this.startX = that.elSite.x
      }
    },
    onEnd (e, that) {
      e.preventDefault()
      this.v = (that.elSite.x - this.startX) / (e.timeStamp - this.startTime)
      let x = that.elSite.x
      if (x > 0 || x < this.maxScroll) { // 下拉--超出
        x = this.maxScroll * (x < this.maxScroll)
        this.drag.scrollTo({ x }, 300)
        return
      }
      if (e.timeStamp - this.moveTime < 100 && Math.abs(this.v) > 0.4) {
        this.animation()
      }
    },
    endCb (x) {
      if (x >= 0) { // 下拉--超出
        x = 0
      } else if (x <= this.maxScroll) {
        x = this.maxScroll
      }
      this.drag.scrollTo({ x }, 300)
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
    animation () {
      let { s, t } = this.getDistanceAndTime(this.v)
      let currX = this.drag.elSite.x + s
      this.drag.scrollTo({ x: currX }, t, 'cubic-bezier(.21,.8,.3,1)')
    }
  }
}
</script>

<style lang="scss" scoped>
.list-scroll {
  display: inline-block;
  white-space: nowrap;
  // height: inherit;
  // overflow: hidden;
  // position: absolute;
  // left: 0;
  // right: 0;
  // top: 0;
  // bottom: 0;
}
.list-box {
  // height: inherit;
  // height: 25px;
}
button {
  position: fixed;
  left: 0;
  top: 36px;
  opacity: 0.5;
}
.info {
  position: fixed;
  left: 50px;
  top: 0;
  opacity: 0.6;
}
</style>
