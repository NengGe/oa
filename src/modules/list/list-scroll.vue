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
  data () {
    return {
      index: 0,
      itemStyle: {
        lineHeight: this.itemHeight + 'px',
        height: this.itemHeight + 'px'
      },
      ratio: 1,
      v: 0,
      startTime: '',
      moveTime: '',
      lastTime: '',
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
  },
  updated () {
    this.initMaxScroll()
  },
  methods: {
    initMaxScroll () {
      let el = this.$refs.list
      el.clientHeight < el.parentNode.clientHeight && (el.style.minHeight = el.parentNode.clientHeight + 'px') // 给定最小高度 执行一次
      this.$nextTick(() => {
        this.maxScroll = el.parentNode.clientHeight - el.clientHeight
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
      // e.stoppropagation()
      this.initMaxScroll()
      this.startTime = e.timeStamp
      this.startY = that.elSite.y
    },
    onMove (e, that) {
      e.preventDefault()
      this.moveTime = e.timeStamp
      if (e.timeStamp - this.startTime > 300) {
        this.startTime = e.timeStamp
        this.startY = that.elSite.y
      }
    },
    onEnd (e, that) {
      this.v = (that.elSite.y - this.startY) / (e.timeStamp - this.startTime)
      let y = that.elSite.y
      if (y > 0 || y < this.maxScroll) { // 下拉 or 上拉--超出
        y = this.maxScroll * (y < this.maxScroll)
        this.drag.scrollTo({ x: 0, y }, 300)
        return
      }
      if (e.timeStamp - this.moveTime < 100 && Math.abs(this.v) > 0.4) { // 需要惯性
        this.animation()
      }
    },
    endCb (y) {
      if (y >= 0) { // 下拉--超出
        y = 0
      } else if (y <= this.maxScroll) {
        y = this.maxScroll
      }
      this.drag.scrollTo({ x: 0, y }, 300)
    },
    // getIndex (y) {
    //   return Math.round(Math.abs(y) / this.itemHeight)
    // },
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
      let currY = this.drag.elSite.y + s
      // this.drag.scrollTo({ x:currX }, t, 'cubic-bezier(.1,.57,0,1)').then((ev) => {
      this.drag.scrollTo({ y: currY }, t, 'cubic-bezier(.21,.8,.3,1)')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
