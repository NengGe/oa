<template>
  <LoaderRefresh ref="vLoaderRefresh" @bottomLoad="onBottomLoad" @refreshLoad="onRefreshLoad" colorTop="black" colorBottom="black">
    <ul class="list">
      <li class="item clickActive" v-for="(item, i) in data" :key="item.id" @click="$emit('action', item, i)">
        <div class="content bottom-one-px">
          <div class="title-box">
            <span class="title ep">{{item.desc}}</span>
            <span class="icon-message iconfont-task clickActive" v-if="item.has_new_comments">&#xe6be;</span>
            <span class="status clickActive" v-if="item.is_overdue">已逾期</span>
          </div>
          <div class="row">
            <span class="l">发起人：</span>
            <span class="r">{{item.create_user_name}}</span>
          </div>
          <div class="row">
            <span class="l">结束时间：</span>
            <span class="r">{{item.expect_complete_time}}</span>
          </div>
          <div class="row">
            <span class="l">执行人：</span>
            <span class="r">{{item.stateStr}}</span>
            <span class="time">{{item.create_time}}</span>
          </div>
        </div>
      </li>
    </ul>
    <!-- 背景图片 -->
    <oa-bg-nodata v-show="showBg"></oa-bg-nodata>
  </LoaderRefresh>
</template>

<script>
import LoaderRefresh from '@/modules/loader-refresh/LoaderRefresh2.vue'
export default {
  components: {
    LoaderRefresh
  },
  props: {
    data: Array,
    getData: Function
  },
  data () {
    return {
      showBg: false
    }
  },
  computed: {
    begin () {
      return this.data.length
    }
  },
  methods: {
    // 加载
    onBottomLoad ({ isRefresh, complete, vLoaderBottom }) {
      this.getData(this.begin).then(d => {
        d = d || []
        this.data.push(...d)
        complete(d.length === 0)
        this.showBg = !this.begin && !d.length
        !d.length && vLoaderBottom.hide()
      })
    },
    // 刷新
    onRefreshLoad ({ isRefresh, complete, vLoaderBottom }) {
      this.getData(0).then(d => {
        d = d || []
        this.data.splice(0, this.data.length, ...d)
        complete(false)
        this.showBg = !this.begin && !d.length
      })
    },
    reStart () {
      console.log('********    reStart   *******', this.$attrs.aaa)
      this.$refs.vLoaderRefresh.reStart()
    }
  }
}
</script>

<style lang='scss' scoped>
.list {
}
.item {
  background-color: #fff;
  padding: 15px 12px 0 14px;
}
.content {
  padding-bottom: 15px;
}
.title-box {
  .title {
    max-width: 250px;
    display: inline-block;
    vertical-align: middle;
    line-height: 28px;
    font-size: 18px;
    color: #555;
    font-weight: bold;
  }
  .icon-message {
    font-size: 15px;
    color: #f8b788;
  }
  .status {
    display: inline-block;
    width: 60px;
    height: 20px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: bold;
    color: #fd939b;
    border: 1PX solid #fd939b;
    text-align: center;
    vertical-align: middle;
    line-height: 20px;
    float: right;
  }
}
.row {
  font-size: 13px;
  color: #999;
  line-height: 28px;
  .time {
    float: right;
  }
}
</style>
