<template>
  <div class="test-refreshLoad">
    <div class="head">
      <button @click="action">按钮</button>
    </div>
    <!-- <div class="box">
      <ul @click="ulAction">
        <li class="item" v-for="item in 10" :key="item">
          <span>{{`id:${item}`}}</span>
        </li>
      </ul>
    </div> -->
    <!-- <richText/> -->
    <div class="content">
      <LoaderRefresh ref="LoaderRefresh" @loadData="loadData" colorTop="black" colorBottom="black">
        <ul class="list">
          <!-- <li v-for="(item, i) in num" :key="i">{{'id：' + i}}</li> -->
        </ul>
      </LoaderRefresh>
    </div>

    <div class="bottom"></div>
  </div>
</template>

<script>
import richText from '@/modules/module-test/richText'
import LoaderRefresh from '@/modules/loader-refresh/LoaderRefresh'
export default {
  components: {
    LoaderRefresh,
    richText
  },
  data () {
    return {
      num: 1
    }
  },
  methods: {
    action () {
      var body = document.querySelector('body')
      body.style.height = 1000 + 'px'
      setTimeout(() => {
        console.log('document.body.clientHeight', document.body.clientHeight)
        console.log('document.documentElement.clientHeight', document.body.clientHeight)
      }, 100)
    },
    loadData ({ type, complete, vLoaderBottom }) {
      if (type === 'refresh') { // 刷新情况
        this.num = 5
        console.log('刷新')
        this.axios(0).then(flag => {
          console.log(flag)
          this.$nextTick(() => {
            // 元素渲染就绪后，下拉加载重置并检测
            vLoaderBottom.reset() // 重置激活
            vLoaderBottom.tryLoad() // 检测是否执行加载
          })
          complete()
        })
      } else { // 下拉加载情况
        this.axios().then(flag => {
          this.$nextTick(() => {
            if (vLoaderBottom.$el.offsetTop + 90 < window.innerHeight) {
              vLoaderBottom.hide()
            }
            complete((flag === false))
          })
          // complete((dataLength === 0))
        })
      }
    },
    ulAction (ev) {
      console.log(ev)
      if (ev.target.tagName === 'LI') {
        // console.log('这是li')
      }
      if (ev.target.tagName === 'SPAN') {
        // console.log('这是span')
      }
    },
    axios (num = 1) {
      // console.log('aaa')
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.num += num
          // console.log(this.num)
          resolve(false)
        }, 100)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  overflow: hidden;
}
li {
  margin: 10px;
  border-radius: 9px;
  line-height: 50px;
  background: #fff;
  text-align: center;
}
.yongche {
  .box {
    // height: 1000px;
    // background: #ccc;
  }
  .item {
    text-align: center;
    padding: 15px 10px;
    margin: 10px;
    background: #fff;
    border-radius: 10px;
  }
}
.head,
.bottom {
  height: 80px;
  background: #ccc;
}
.content{
  overflow: auto;
  width: 100%;
  // position: fixed;
  top: 80px;
  bottom: 80px;
  left: 0px;
}
.bottom{
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;

}
</style>
