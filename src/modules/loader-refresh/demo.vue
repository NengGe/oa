<template>
<div class="bc">
  <LoaderRefresh ref="vLoaderRefresh" @loadData="loadData" colorTop="white" colorBottom="white">
    <ul class="list">
      <li class="item" v-for="(v,i) in list" :key="i">{{v}}</li>
    </ul>
  </LoaderRefresh>
  <div class="btn-box">
    <button class="btn" @click="refresh">手动顶部刷新1</button>
    <button class="btn" @click="reStart">手动底部重新加载</button>
  </div>
</div>
</template>

<script>
import LoaderRefresh from './LoaderRefresh'
export default {
  data () {
    return {
      list: [1, 2, 3, 4, 5, 6, 7],
      isFinish: 0
    }
  },
  components: {
    LoaderRefresh
  },
  methods: {
    loadData ({type, complete, vLoaderBottom} = {}) {
      /* eslint-disable */
      this.$axios('/test').then(d => {
        if (type === 'refresh') { // 刷新情况
          this.list = d
          // 刷新完成
          complete()
          // 底部加载重置并检测
          vLoaderBottom.reset() // 重置激活

          vLoaderBottom.tryLoad() // 检测是否执行加载
        } else { // 下拉加载情况
          this.list = this.list.concat(d)
          // vLoaderBottom.hide() // 底部加载控件隐藏
          // 进行到底检测。或者传入 true 加载结束
          complete((++this.isFinish > 3))
        }
      })
    },
    refresh () {
      this.$refs.vLoaderRefresh.refresh()
    },
    reStart () {
      this.list = [1, 2, 3, 4, 5, 6, 7],
      this.isFinish = 0

      this.$refs.vLoaderRefresh.reStart()
    },
    // 模拟ajax
    $axios (url) {
      return new Promise(function (resolve) {
        setTimeout(d => {
          resolve([Math.random(), Math.random(), Math.random()])
        }, 1000)
      })
    }
  }
}
</script>

<style scoped>
  .bc {
    background-color:#aaa;
  }
  .list{
    list-style: none;
    padding: 0;
    margin: 0;

  }
  .item{
    height: 60px;
    background-color: #ddd;
    margin: 6px 0;
  }

  .btn-box {
    position: fixed;
    right: 0;
    top: 0;
    .btn{
      float: right;
      clear: both;
    }
  }
</style>
