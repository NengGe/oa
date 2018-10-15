<template>
  <div class="list-scroll" ref="list">
    <div class="top-content">{{this.refreshStatusArr[this.refreshStatus]}}</div>
    <slot></slot>
    <div v-show="showBottom" class="bottom-content">{{this.loadStatusArr[this.loadStatus]}}</div>
  </div>
</template>

<script>
/* eslint-disable no-unmodified-loop-condition no-undef */
/* eslint-disable no-undef */
import Drag from './js/drag-init.js'
export default {
  data () {
    return {
      showBottom: false,
      loading: false,
      // 刷新
      refreshStatusArr: ['下拉刷新', '释放刷新', '正在刷新', '刷新完成'],
      refreshStatus: 0,
      // 加载
      loadStatusArr: ['上拉加载', '释放加载', '正在加载', '加载完成', '没有更多了~'],
      loadStatus: 0,
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
  watch: {
    refreshStatus (n) {
      // this.drag.ratioY = n === 1 ? 0.5 : 1
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
      return !this.loading
    },
    onMove (e, that) {
      if (that.dir === 'left' || that.dir === 'right') return false
      this.showBottom = that.dir === 'top'
      if (that.elSite.y >= 50) { // 刷新
        this.refreshStatus = 1
      } else {
        this.refreshStatus = 0
      }

      if (that.elSite.y <= this.maxScroll) {
        this.loadStatus = 1
      } else {
        this.loadStatus = 0
      }

      this.moveTime = e.timeStamp
      if (e.timeStamp - this.startTime > 300) {
        this.startTime = e.timeStamp
        this.startY = that.elSite.y
      }
    },
    onEnd (e, that) {
      if (that.dir === 'left' || that.dir === 'right') return false
      let y = that.elSite.y
      if (y > 0 && y < 50) { // 刷新
        this.drag.scrollTo({ x: 0, y: 0 }, 300)
        return
      } else if (y >= 50) {
        this.drag.scrollTo({ x: 0, y: 50 }, 300)
        this.refreshStatus = 2
        this.loading = true
        this.$emit('refresh', this.refreshFinish)
        return
      }

      if (y <= this.maxScroll) { // 加载--上拉--超出
        this.loadStatus = 2
        this.drag.scrollTo({ x: 0, y: this.maxScroll }, 300)
        this.loading = true
        this.$emit('load', this.loadFinish)
        return
      }

      this.v = (that.elSite.y - this.startY) / (e.timeStamp - this.startTime)
      if (e.timeStamp - this.moveTime < 100 && Math.abs(this.v) > 0.4) { // 需要惯性
        this.animation().then(() => {
          if (that.elSite.y <= this.maxScroll) { // 加载
            this.loadStatus = 2
            this.loading = true
            this.$emit('load', this.loadFinish)
          }
        })
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
      return this.drag.scrollTo({ y: currY }, t, 'cubic-bezier(.21,.8,.3,1)')
    },
    refreshFinish () {
      this.refreshStatus = 3
      this.loadStatus = 0
      setTimeout(() => {
        this.loading = false
        this.drag.scrollTo({ y: 0 }, 300)
      }, 1000)
    },
    loadFinish (isFinish) {
      this.loading = false
      if (isFinish === true) {
        this.loadStatus = 4
        return
      }
      this.loadStatus = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.list-scroll {
  position: relative;
}
.top-content {
  width: 100%;
  background: #ccc;
  line-height: 50px;
  height: 50px;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-100%);
  text-align: center;
  // top: 100%;
  // margin-top: 100%;
}
.bottom-content {
  width: 100%;
  background: #ccc;
  line-height: 50px;
  height: 50px;
  text-align: center;
}
</style>

