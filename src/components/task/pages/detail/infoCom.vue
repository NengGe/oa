<template>
  <div class="info bottom-one-px">
    <div class="title">{{data.desc}}</div>
    <ul class="list">
      <li class="item" v-for="(item, i) in data.imgList" :key="i">
        <img class="img" :src="item.src">
      </li>
    </ul>
    <div class="row">
      <span class="l">时间：</span>
      <span class="r">{{data.timeStr}}</span>
    </div>
    <div class="row">
      <span class="l">发起人：</span>
      <span class="r">{{data.create_user_name}}</span>
    </div>
    <div class="row" @click="$emit('excuStatus')">
      <span class="l">执行人：</span>
      <span class="r"></span>
      <div class="btn-r">
        <i class="num">{{data.exe_finished}}</i>
        <i class="text">{{`/${data.exe_total}已完成`}}</i>
        <i class="icon iconfont">&#xe616;</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  created () {

  }
}
</script>

<style lang='scss' scoped>
.info {
  padding: 10px 0;
}
.title {
  font-size: 18px;
  color: #555;
  line-height: 36px;
  font-weight: bold;
}
.list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: -18px;
  .item {
    overflow: hidden;
    width: 54px;
    height: 54px;
    background: #ededed;
    border-radius: 5px;
    margin: 8px 0;
    margin-left: 18px;
    .img {
      width: 54px;
      height: 54px;
    }
  }
}
.row {
  color: #999;
  font-size: 13px;
  line-height: 35px;
  .btn-r {
    float: right;
    .num {
      margin-right: -3px;
      color: #88b8f8;
    }
  }
}
</style>

