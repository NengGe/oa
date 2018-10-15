<template>
  <div class="wrapper-container" ref="wrapperContainer">
    <div class="wrapper" ref="wrapper">
      <div class="wrapper-head">
        <div class="content-box">{{refreshStatusArr[refreshStatus]}}</div>
      </div>
      <slot></slot>
      <div class="wrapper-bottom">
        <div class="content-box">{{'底部'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Drag from './drag.js'
export default {
  data () {
    return {
      curScrollY: 0,

      dragVm: null,
      refreshStatusArr: ['下拉刷新', '释放刷新', '正在刷新', '刷新完成'],
      refreshStatus: 0
    }
  },
  mounted () {
    this.$refs.wrapperContainer.addEventListener('scroll', this.scrollAction)
    let { onStart, onMove, onEnd } = this
    this.dragVm = new Drag({
      el: this.$refs.wrapper,
      enableY: true,
      onStart,
      onMove,
      onEnd,
      ratioY: 0.4
    })
    this.dragVm.init()
  },
  methods: {
    onStart (e) {
      // e.preventDefault()
    },
    onMove (e) {
      if (this.dragVm.dir !== 'bottom' || this.curScrollY !== 0) { // 手势方向不是下滑
        return false
      }
      if (this.dragVm.elSite.y < 50) {
        this.refreshStatus = 0
      } else if (this.dragVm.elSite.y > 50) {
        this.refreshStatus = 1
      }
    },
    onEnd () {
      if (this.dragVm.elSite.y < 50) { // 下拉不够
        this.refreshStatus = 0
        this.dragVm.scrollTo({ x: 0, y: 0 }, 300)
      } else if (this.dragVm.elSite.y > 50) { // 下拉足够
        this.refreshStatus = 2
        this.dragVm.scrollTo({ x: 0, y: 30 }, 300)
      }
    },
    scrollAction (e) {
      this.curScrollY = this.$refs.wrapperContainer.scrollTop
      this.dragVm.disable = this.curScrollY > 0
    }
  }
}
</script>


<style lang="scss" scoped>
.wrapper-container {
  flex: 1;
  width: 100%;
  height: 100%;
  // background-color: #fff;
  transition: all 3s;
  overflow-y: auto;
  .wrapper {
    position: relative;
    .wrapper-head {
      position: absolute;
      top: -30px;
      left: 0;
      right: 0;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: center;
    }
    .wrapper-bottom {
      bottom: -50px;
      left: 0;
      right: 0;
      height: 30px;
      line-height: 30px;
      // background-color: #ccc;
      display: flex;
      justify-content: center;
    }
    &.ani {
      transition: all 0.3s;
    }
  }
}
</style>
