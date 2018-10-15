<template>
  <div class="list-scroll">
    <div class="list-box">
      <ul class="list" ref="list">
        <li class="item" v-for="(item, i) in list" :key="i">{{i+1}}</li>
      </ul>
    </div>

    <div class="list-box list-box2">
      <ul class="list">
        <li class="item" v-for="(item, i) in list" :key="i">{{i+1}}</li>
      </ul>
    </div>
    <div class="list-box list-box3">
      <ul class="list">
        <li class="item" v-for="(item, i) in list" :key="i">{{i+1}}</li>
      </ul>
    </div>

    <button ref="btn" @click="drag.scrollTo({x:0, y:0}, 300)">复位</button>
    <div class="info">{{`v:${this.v.toFixed(2)}`}}{{` r:${this.ratio}`}}{{` s:${this.s.toFixed(5)}`}}{{` t:${this.t.toFixed(5)}`}} {{`v*t:${this.v*this.t.toFixed(2)}`}}

    </div>
  </div>
</template>

<script>
/* eslint-disable no-unmodified-loop-condition no-undef */
/* eslint-disable no-undef */
import Drag from './js/drag-init.js'
import './js/iscroll.js'
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return new Array(1000)
      }
    }
  },
  data () {
    return {
      t: 0,
      s: 0,
      ratio: 1,
      v: 0,
      lastTime: '',
      startTime: '',
      lastY: 0,
      startY: 0,
      elSiteArr: [],
      drag: null,
      maxScroll: -(this.list.length) * 50 + 400
    }
  },
  mounted () {
    this.iscroll = new IScroll('.list-box2')
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
    this.drag2 = new Drag({
      el: this.$refs.btn,
      enable: true,
      onStart,
      onMove,
      onEnd
    })
    this.drag2.init()
  },
  methods: {
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
      // e.preventDefault()
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
      if (y > 0 || y < this.maxScroll) { // 下拉--超出
        this.endCb(y)
        return
      }
      let { s, t } = this.getDistanceAndTime(this.v, 16.7)
      this.s = s
      this.t = t
      let currY = this.drag.elSite.y + s
      if (Math.abs(this.v) > 0.4) {
        this.drag.scrollTo({ x: 0, y: currY }, t, 'cubic-bezier(.1,.57,0,1)').then((ev) => {
        })
      }
    },
    endCb (y) {
      if (y >= 0) { // 下拉--超出
        y = 0
      } else if (y <= this.maxScroll) {
        y = this.maxScroll
      }
      this.drag.scrollTo({ x: 0, y }, 100).then(() => {
        this.drag.ratioY = 1
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
    }
      // this.ratio = 1 // 速度系数
      // let n = 0 // 次数
      // let s = 0 // 相对位移
      // let y = s + this.drag.elSite.y // 终点位置
      // while (Math.abs(v) > 0.01 && y <= 0 && y >= this.maxScroll) {
      //   v *= this.ratio
      //   n++
      //   s += v * t
      //   y = s + this.drag.elSite.y
      //   this.ratio *= 0.9999
      //   if (y <= this.maxScroll || y >= 0) {
      //     s = (y <= this.maxScroll) * this.maxScroll - this.drag.elSite.y
      //     break
      //   }
      // }
      // return {
      //   s,
      //   t: t * n
      // }
    },
    step () {
      this.v = this.v * 0.95
      if (Math.abs(this.v) < 0.05) {
        clearInterval(this.timer)
        console.log('结束滚动')
        return
      }
      let s = this.v * 20
      let currY = this.drag.elSite.y + s
      this.drag.scrollTo({ x: 0, y: Math.floor(currY) }, 16.7)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-scroll {
  // width: 100px;
  height: 400px;
  // overflow: hidden;
  position: relative;
  background: #eee;
}
.list-box {
  margin-left: 10px;
  float: left;
  overflow: hidden;
  width: 100px;
  height: inherit;
  // height: 25px;
  background: rgba($color: #ddd, $alpha: 0.5);
  overflow-y: hidden;
  position: relative;
}
.item {
  line-height: 50px;
  height: 50px;
  color: #999;
  border-bottom: 1PX #ccc solid;
  text-align: center;
  box-sizing: border-box;
}
.list-box3 {
  overflow-y: auto;
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
