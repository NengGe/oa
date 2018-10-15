<template>
  <div class="applyChildPage caigou">
    <div class="head">
      <p>maxScrollY:{{maxScrollY}}</p>
      <p>curScrollY:{{curScrollY}}</p>
      <p>startClientY:{{startClientY}}</p>
      <p>curClientY:{{curClientY}}</p>
      <p>offsetY:{{offsetY}}</p>
    </div>
    <div class="wrap" ref="wrap">
      <div class="wrapper" ref="wrapper">
        <div class="wrap-head">
          <div class="content-box">{{refreshStatusArr[refreshStatus]}}</div>
      </div>
        <ul class="list" ref="list">
          <li class="item" v-for="(id, i) in num" :key="i">
            id：{{id}}
          </li>
        </ul>
        <div class="wrap-bottom">
          <div class="content-box">{{loadStatusArr[loadStatus]}}</div>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timer: null,
      isLoading: false, // 请求数据中
      // 刷新
      refreshStatusArr: ['下拉刷新', '释放刷新', '正在刷新'],
      refreshStatus: 0,
      // 加载
      loadStatusArr: ['上拉加载', '释放加载', '正在加载'],
      loadStatus: 0,
      num: 30,
      initScrollY: 20,
      curScrollY: '',
      maxScrollY: 0, // 最大滚动距离(+)
      startClientY: 0,
      offsetY: 0,
      curClientY: 0
    }
  },
  watch: {
    curScrollY: function (curScrollY) {
      if (this.curScrollY === 0 || this.curScrollY === this.maxScrollY) {
        if (!this.$refs.wrapper) return
        this.$refs.wrapper.addEventListener('touchstart', this.touchstartAction)
      } else {
        this.$refs.wrapper.removeEventListener('touchstart', this.touchstartAction)
      }
    }
  },
  created () {

  },
  mounted () {
    this.curScrollY = 0
    this.$refs.wrap.addEventListener('scroll', this.scrollAction)
    this.maxScrollY = this.$refs.wrap.scrollHeight - this.$refs.wrap.offsetHeight
    // this.$refs.wrapper.addEventListener('touchstart', this.touchstartAction)
  },
  methods: {
    // 按下
    touchstartAction (ev) {
      this.isLoading = false
      // console.log('按下')
      // ev.preventDefault()
      this.$refs.wrapper.style.transform = 'translateY(' + 0 + 'px)'
      if (this.curScrollY === 0 || this.curScrollY === this.maxScrollY) {
        this.$refs.wrapper.addEventListener('touchmove', this.touchmoveAction)
        this.$refs.wrapper.addEventListener('touchend', this.touchendAction)
      }
    },
    // 移动
    touchmoveAction (ev) {
      // console.log('ev.changedTouches[0]', ev)
      this.$refs.wrapper.className = 'wrapper' // 移动前 移除过渡
      clearTimeout(this.tiemr)
      if (this.curScrollY === 0) { // 刷新拖拽
        if (this.$refs.wrapper.style.transform === 'translateY(' + 0 + 'px)') {
          this.startClientY = ev.changedTouches[0].clientY
        }
        this.curClientY = ev.changedTouches[0].clientY
        this.offsetY = (this.curClientY - this.startClientY) / 2.5 + 1
        this.$refs.wrapper.style.transform = 'translateY(' + this.offsetY + 'px)'
        if (this.offsetY >= 30) { // 改变刷新状态
          this.refreshStatus = 1
        } else {
          this.refreshStatus = 0
        }
      } else if (this.curScrollY === this.maxScrollY) { // 加载拖拽
        if (this.$refs.wrapper.style.transform === 'translateY(' + 0 + 'px)') {
          this.startClientY = ev.changedTouches[0].clientY
        }
        this.curClientY = ev.changedTouches[0].clientY
        this.offsetY = (this.curClientY - this.startClientY) / 2.5 + 1
        this.$refs.wrapper.style.transform = 'translateY(' + this.offsetY + 'px)'
        if (this.offsetY <= -30) { // 改变刷新状态
          this.loadStatus = 1
        } else {
          this.loadStatus = 0
        }
      }
    },
    // 松开
    touchendAction () {
      if (this.curScrollY === 0) { // 刷新回弹
        if (this.refreshStatus === 0) { // 下拉--不够
          this.$refs.wrapper.className += ' ani'
          this.$refs.wrapper.style.transform = 'translateY(' + 0 + 'px)'
          this.timer = setTimeout(() => { // 移除过渡
            this.$refs.wrapper.className = 'wrapper'
          }, 300)
        } else if (this.refreshStatus === 1) { // 开始--刷新
          this.isLoading = true
          this.refreshStatus = 2
          this.$refs.wrapper.className += ' ani'
          this.$refs.wrapper.style.transform = 'translateY(' + 0 + 'px)'
          // 请求数据
          this.getData().then((data) => {
            // this.$refs.wrap.scrollTop = 20
            if (!this.isLoading) return // 取消请求数据
            console.log('请求数据')
            this.refreshStatus = 0
            this.$refs.wrapper.style.transform = 'translateY(' + 0 + 'px)'
            this.timer = setTimeout(() => { // 移除过渡
              this.$refs.wrapper.className = 'wrapper'
            }, 300)
          })
        }
      } else if (this.curScrollY === this.maxScrollY) { // 加载回弹
        if (this.loadStatus === 0) { // 上拉--不够
          this.$refs.wrapper.className += ' ani'
          this.$refs.wrapper.style.transform = 'translateY(' + 0 + 'px)'
          this.timer = setTimeout(() => {
            this.$refs.wrapper.className = 'wrapper'
          }, 300)
        } else if (this.loadStatus === 1) { // 开始--加载
          this.isLoading = true
          this.loadStatus = 2
          this.$refs.wrapper.className += ' ani'
          this.$refs.wrapper.style.transform = 'translateY(' + 0 + 'px)'
          this.getData().then((data) => {
            if (!this.isLoading) return // 取消请求数据
            console.log('请求数据')
            this.loadStatus = 0
            this.$refs.wrapper.style.transform = 'translateY(' + 0 + 'px)'
            this.timer = setTimeout(() => { // 移除过渡
              this.$refs.wrapper.className = 'wrapper'
            }, 300)
          })
        }
      } else {
        this.$refs.wrapper.style.transform = 'translateY(' + 0 + 'px)'
      }
      // this.$refs.wrapper.style.transform = 'translateY(' + 0 + 'px)'
      this.$refs.wrapper.removeEventListener('touchmove', this.touchmoveAction)
      this.$refs.wrapper.removeEventListener('touchend', this.touchendAction)
      // this.$refs.wrapper.removeEventListener('touchmove',this.touchmoveAction)
    },
    // 滚动
    scrollAction (e) {
      // console.log(e.pageY)
      this.curScrollY = this.$refs.wrap.scrollTop
      // console.dir(this.curScrollY)
      // console.log('wrap-scroll高', this.$refs.wrap.scrollHeight)
      // console.log('wrap高', this.$refs.wrap.offsetHeight)
      // console.log('list高', this.$refs.wrapper.offsetHeight)
      // console.log('差', this.$refs.wrapper.offsetHeight - this.$refs.wrap.offsetHeight)
    },
    // 模拟请求
    getData () {
      return new Promise((resolve, reject) => {
        this.timer = setTimeout(() => {
          resolve(true)
        }, 2000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .caigou{
    background-color: #efefef;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .head{
      width: 100%;
      height: 70px;
      background-color: #3c70a2;
      display: flex;
      flex-wrap: wrap;
      p{
        width: 50%;
      }
    }
    .wrap{
      flex: 1;
      width: 100%;
      height: 70px;
      background-color: #fff;
      transition: all 3s;
      overflow-y: auto;
      // position: relative;
      .wrapper{
        position: relative;
        // overflow: hidden;
          .wrap-head{
          // position: absolute;
          top: -20px;
          left: 0;
          right: 0;
          height: 20px;
          background-color: #ccc;
          display: flex;
          justify-content: center;
        }
        .wrap-bottom{
          // position: absolute;
          bottom: -20px;
          left: 0;
          right: 0;
          height: 20px;
          background-color: #ccc;
          display: flex;
          justify-content: center;
        }
        &.ani{
          transition: all 0.3s;
        }
        .list{
          overflow: hidden;
          .item{
            background-color: #fff;
            padding: 15px;
            border-radius: 10px;
            margin: 10px;
          }
        }
      }
    }
    .bottom{
      width: 100%;
      height: 54px;
      background-color: rgb(43, 163, 137);
    }
  }
</style>
