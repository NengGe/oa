<template>
  <div class="list-scroll" ref="list">
    <div class="info">{{`v: ${v0}`}}</div>
    <slot></slot>
  </div>
</template>

<script>
/* eslint-disable no-unmodified-loop-condition no-undef */
/* eslint-disable no-undef */
import Drag from './js/drag-init.js'
import Animation from './js/animation.js'
// let rAF = window.requestAnimationFrame ||
//   window.webkitRequestAnimationFrame ||
//   window.mozRequestAnimationFrame ||
//   window.oRequestAnimationFrame ||
//   window.msRequestAnimationFrame ||
//   function (callback) { window.setTimeout(callback, 1000 / 60) }
export default {
  data () {
    return {
      v0: 0,
      a: 0.0006,
      n: 0,
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
      animation: null,
      maxScroll: 0,
      startT: ''
    }
  },
  mounted () {
    this.animation = new Animation(this.step, {})
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
      // e.preventDefault()
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
      if (Math.abs(this.v) > 0.4) {
        this.animation.run()
        // let { s, t } = this.getDistanceAndTime(this.v, 16.7)
        // let currY = this.drag.elSite.y + s
        // this.drag.scrollTo({ x: 0, y: currY }, t, 'cubic-bezier(.1,.57,0,1)').then((ev) => {
        // this.drag.scrollTo({ x: 0, y: currY }, t, 'cubic-bezier(.21,.8,.3,1)')
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
    step () {
      this.v = -0.1
      this.drag.translate({ x: 0, y: Math.round(this.drag.elSite.y + this.v * 20) })
    }
    // step (e) {
    //   if (!this.startT) this.startT = e
    //   let currT = e
    //   let t = currT - this.startT
    //   this.startT = currT
    //   // this.v *= this.a
    //   // let s = this.v * this.a * t
    //   // this.a *= 0.999
    //   let s = this.v * t + 0.5 * this.a * t * t
    //   this.a *= 1.001
    //   this.v += this.a
    //   let flag = this.v / Math.abs(this.v)
    //   if (s * flag >= 0) {
    //     let currY = this.drag.elSite.y + s
    //     if (currY > 0 || currY < this.maxScroll) {
    //       currY = (currY < this.maxScroll) * this.maxScroll
    //       this.drag.translate({ x: 0, y: Math.round(currY) })
    //       return
    //     }
    //     this.drag.translate({ x: 0, y: Math.round(currY) })
    //     rAF(this.step)
    //     // step()
    //   } else {
    //     console.log('else')
    //   }
    // },
    // animation () {
    //   console.log('执行动画')
    //   this.v0 = this.v
    //   this.$simpleMsg(`v: ${this.v0}`)
    //   let flag = this.v / Math.abs(this.v)
    //   this.a = -flag * 0.5 / 60
    //   // this.a = -this.v / 60
    //   this.startT = null
    //   rAF(this.step)
    // }
  }
}
</script>

<style lang="scss" scoped>
.list-scroll {
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
  top: 0;
  left: 36px;
  opacity: 0.6;
}
</style>
