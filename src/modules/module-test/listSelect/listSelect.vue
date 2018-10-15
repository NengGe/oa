<template>
  <div class="list-scroll">
    <div class="list-box">
      <div class="center">
        <ul class="list" ref="list">
          <li class="item" v-for="(item, i) in list" :key="i" @click="action(item, i)">{{i+1}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unmodified-loop-condition */
import Drag from './js/drag-init.js'
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
      v: 0,
      startElSite: 0,
      endElSite: 0,
      elSiteArr: [],
      startTime: '',
      endTime: '',
      index: 0,
      drag: null,
      maxScroll: -(this.list.length - 1) * 50
    }
  },
  mounted () {
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
      enableY: true,
      onStart,
      onMove,
      onEnd
    })
    this.drag2.init()
  },
  watch: {
    index () {
      this.scrollToIndex(this.index)
    }
  },
  methods: {
    touchstart (e) {
      // this.drag.transitionend()
    },
    action (item, i) {
      console.log(111)
      this.index = i
    },
    onStart (e, that) {
      // e.preventDefault()
      this.elSiteArr = []
      this.startTime = e.timeStamp
      this.startElSite = that.elSite.y
    },
    onMove (e, that) {
      if (e.timeStamp - this.startTime > 100) {
        this.startTime = e.timeStamp
        this.startElSite = that.elSite.y
      }
      this.elSiteArr.push(that.elSite.y)
    },
    onEnd (e, that) {
      let y = that.elSite.y
      if (y > 0 || y < this.maxScroll) { // 下拉--超出
        this.scrollEndCb(y)
        return
      }
      this.endTime = e.timeStamp
      this.endElSite = that.elSite.y
      this.v = (this.endElSite - this.startElSite) / (this.endTime - this.startTime)
      let { s, t } = this.getDistanceAndTime(this.v, 16.7)
      let currY = this.drag.elSite.y + s
      if (Math.abs(this.v) > 0.4) {
        this.drag.scrollTo({ x: 0, y: currY }, t, 'cubic-bezier(0,1,1,1)').then(() => {
          this.scrollEndCb(that.elSite.y)
        })
      } else {
        this.scrollEndCb(that.elSite.y)
      }
    },
    scrollToIndex (i, time = 100) {
      this.drag.scrollTo({ x: 0, y: -i * 50 }, time)
    },
    scrollEndCb (y) {
      if (y > 0) { // 下拉--超出
        this.index = 0
      } else if (y < this.maxScroll) {
        this.index = this.list.length - 1
      } else {
        this.index = -Math.round(y / 50)
      }
      this.scrollToIndex(this.index)
    },
    getDistanceAndTime (v, t = 16.7) {
      let n = 0
      let s = 0
      let y = s + this.drag.elSite.y
      while (Math.abs(v) > 0.01 && y <= 0 && y >= this.maxScroll) {
        v *= 0.9
        n++
        s += v * t
        y = s + this.drag.elSite.y
      }
      return {
        s,
        t: t * n
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-scroll {
  position: relative;
}
.list-box {
  width: 100px;
  height: 250px;
  background: rgba($color: #ddd, $alpha: 0.5);
  overflow-y: hidden;
  position: relative;
}
.center {
  position: absolute;
  left: 0;
  top: 100px;
  width: 100%;
  height: 50px;
  // background: #ddd;
  border-top: 1PX solid #407bff;
  border-bottom: 1PX solid #407bff;
  box-sizing: border-box;
}
.list {
  // height: 250px;
}
.item {
  line-height: 50px;
  height: 50px;
  color: #999;
  border-bottom: 1PX #ccc solid;
  text-align: center;
  box-sizing: border-box;
}
.list-box2 {
  width: 100px;
  height: 250px;
  background: rgba($color: #ddd, $alpha: 0.5);
  overflow-y: auto;
  position: absolute;
  left: 200px;
  top: 0;
}
</style>
