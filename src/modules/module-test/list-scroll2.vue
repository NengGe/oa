<template>
    <div class="wrapper-container" ref="wrapperContainer">
      <div class="wrapper" ref="wrapper">
        <div class="wrapper-head">
          <div class="content-box">{{refreshStatusArr[refreshStatus]}}</div>
      </div>
        <slot></slot>
        <div class="wrapper-bottom">
          <div class="content-box">{{loadStatusArr[loadStatus]}}</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      threshold: 30, // 刷新&&加载 阈值
      timer: null,
      isRefreshing: false,
      isLoading: false, // 请求数据中
      // 刷新
      refreshStatusArr: ['下拉刷新', '释放刷新', '正在刷新', '刷新完成'],
      refreshStatus: 0,
      // 加载
      loadStatusArr: ['上拉加载', '释放加载', '正在加载', '加载完成', '没有更多了~'],
      loadStatus: -1,
      num: 5,
      initScrollY: 20,
      curScrollY: '',
      maxScrollY: 0, // 最大滚动距离(+)
      startClientY: 0,
      offsetY: 0,
      curClientY: 0
    }
  },
  watch: {
    'curScrollY': function (curScrollY) {
      this.maxScrollY = this.$refs.wrapperContainer.scrollHeight - this.$refs.wrapperContainer.offsetHeight // 最大滚动
      if (this.curScrollY >= this.maxScrollY - 50) {
        this.loadmore()
      } else {

      }
    },
    'offsetY': function () {
      this.$refs.wrapper.style.transform = 'translateY(' + this.offsetY + 'px)'
    }
  },
  created () {

  },
  mounted () {
    this.curScrollY = 0
    this.$refs.wrapperContainer.addEventListener('scroll', this.scrollAction)
    this.$refs.wrapper.addEventListener('touchstart', this.touchstartAction)
  },
  methods: {
    // 按下
    touchstartAction (ev) {
      this.maxScrollY = this.$refs.wrapperContainer.scrollHeight - this.$refs.wrapperContainer.offsetHeight // 按下更新最大滚动
      ev.stopPropagation()
      this.startClientY = ev.changedTouches[0].clientY
      this.$refs.wrapper.addEventListener('touchmove', this.touchmoveAction)
      this.$refs.wrapper.addEventListener('touchend', this.touchendAction)
    },
    // 移动
    touchmoveAction (ev) {
      if (ev.stopPropagation) {
        ev.stopPropagation()
      } else {
        ev.cancelBubble = true
      }
      this.curClientY = ev.changedTouches[0].clientY
      if (this.curClientY - this.startClientY > 0) { // 下滑
        console.log('下滑')
        if (this.curScrollY > 0) { // 滚动中
          this.startClientY = ev.changedTouches[0].clientY
          return
        }
        ev.preventDefault()
        this.offsetY = (this.curClientY - this.startClientY) / 2.5
        if (this.offsetY >= this.threshold) {
          this.refreshStatus = 1
        } else {
          this.refreshStatus = 0
        }
      }
    },
    // 松开
    touchendAction () {
      if (this.curScrollY === 0) { // 下拉
        if (this.refreshStatus === 0) { // 下拉不够
          this.transitionYAction(0, true)
        } else if (this.refreshStatus === 1) { // 下拉满足条件
          this.refresh()
        }
      } else {
        // this.transitionYAction(0, true)
      }
      this.$refs.wrapper.removeEventListener('touchmove', this.touchmoveAction)
      this.$refs.wrapper.removeEventListener('touchend', this.touchendAction)
    },
    // 滚动
    scrollAction (e) {
      this.curScrollY = this.$refs.wrapperContainer.scrollTop
    },
    // 延时移除--过渡
    delayRemoveAni (time) {
      setTimeout(() => {
        this.$refs.wrapper.className = 'wrapper'
      }, time)
    },
    transitionYAction (num, bl) { // ps: bl ? 移除过渡 ：保留过渡
      this.$refs.wrapper.className = 'wrapper ani'
      this.offsetY = num
      if (bl) {
        this.delayRemoveAni(300)
      }
    },
    // 尝试加载更多
    tryLoad () {
      console.log('尝试加载更多')
      let isCanScroll = this.$refs.wrapper.offsetHeight + 30 + 30 - this.$refs.wrapperContainer.offsetHeight > 0
      if (!isCanScroll) { // 还未有滚动条--内容不够
        this.loadmore()
      }
    },
    // 加载更多
    loadmore () {
      this.loadStatus = 2
      if (this.isLoading) return // 若 正在请求--等待请求结束才能发送下次刷新请求
      this.isLoading = true
      this.$emit('loadMoreAction', this.loadMoreChangeStatus) // 加载更多
    },
    // 刷新
    refresh () {
      this.loadStatus = -1
      this.refreshStatus = 2
      this.transitionYAction(this.threshold, true)
      if (this.isRefreshing) return // 若 正在请求--等待请求结束才能发送下次加载更多请求
      this.isRefreshing = true
      this.$emit('refreshAction', this.refreshDelayDisplay) // 刷新
    },
    // 加载更多完成回调--加载更多改变状态
    loadMoreChangeStatus (num) {
      if (num) {
        this.loadStatus = 3
        this.$nextTick(() => {
          this.isLoading = false
          this.tryLoad()
        })
      } else {
        this.loadStatus = 4
        this.isLoading = false
      }
    },
    // 刷新完成回调--刷新延时显示
    refreshDelayDisplay () {
      this.refreshStatus = 3
      this.$nextTick(() => {
        this.isRefreshing = false
        this.tryLoad()
      })
      setTimeout(() => {
        this.transitionYAction(0, true)
      }, 800)
    }
  }
}
</script>

<style lang="scss" scoped>
  // .caigou{
    // background-color: #efefef;
    // position: fixed;
    // left: 0;
    // top: 0;
    // right: 0;
    // bottom: 0;
    // display: flex;
    // flex-direction: column;
    // .head{
    //   width: 100%;
    //   height: 70px;
    //   background-color: #3c70a2;
    //   display: flex;
    //   flex-wrap: wrap;
    //   p{
    //     width: 50%;
    //   }
    // }
    .wrapper-container{
      flex: 1;
      width: 100%;
      height: 100%;
      background-color: #fff;
      transition: all 3s;
      overflow-y: auto;
      // position: relative;
      .wrapper{
        // height: 100%;
        position: relative;
        // overflow: hidden;
          .wrapper-head{
          position: absolute;
          top: -30px;
          left: 0;
          right: 0;
          height: 30px;
          line-height: 30px;
          // background-color: #ccc;
          display: flex;
          justify-content: center;
        }
        .wrapper-bottom{
          // position: absolute;
          bottom: -50px;
          left: 0;
          right: 0;
          height: 30px;
          line-height: 30px;
          // background-color: #ccc;
          display: flex;
          justify-content: center;
        }
        &.ani{
          transition: all 0.3s;
        }
      }
    }
    // .bottom{
    //   width: 100%;
    //   height: 54px;
    //   background-color: rgb(43, 163, 137);
    // }
  // }
</style>
