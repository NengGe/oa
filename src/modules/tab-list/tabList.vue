<template>
  <div class="tab-list">
    <!-- :style="{'transform': `translate3d(${-currIndex*100}%, 0, 0)`}" -->
    <div ref="wrapper" class="wrapper" >
      <!-- :style="{'transform': `translate3d(${i*100*0}px, 0, 0)`}" -->
      <div class="item" v-for="(list, i) in dataArr" :key="'dataArr' + i" :style="{'transform': `translate3d(${i*100}%, 0, 0)`}">
        <slot :name="i"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { drag } from './js/drag.js'
export default {
  props: {
    currIndex: {
      type: Number,
      default: 0
    },
    dataArr: {
      type: Array
    }
  },
  data () {
    return {

    }
  },
  watch: {
    'currIndex': function () {

    }
  },
  mounted () {
    let el = this.$refs.wrapper
    this.maxScrollY = el.clientHeight
    let { onStart, onMove, onEnd } = this
    this.unBindDrag = drag({
      el,
      onStart,
      onMove,
      onEnd,
      enableX: true,
      enableY: false,
      enable: false
    })
    // el.addEventListener('transitionend', this.onTransitionend)
  }
}
</script>

<style scoped>
.wrapper {
  /* transition: all 0.3s; */
  /* width: 100%;
  height: 200px; */
  position: relative;
  /* transform: translate3d(100%, 0, 0) */
}
.item {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
