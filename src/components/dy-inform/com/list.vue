<template>
  <ul class="list">
    <li class="item bottom-one-px clickActive" v-for="(item, i) in data" :key="i" @click="$emit('action', item, i)" :class="{hide:item.hide}">
      <div class="title-box">
        <span class="title ep">{{item.title}}</span>
        <span class="time">{{item.time}}</span>
      </div>
      <div class="row">
        <span class="text">公告类型：</span>
        <span class="text">{{item.target_id==='0'?'学校公告':'班级公告'}}</span>
      </div>
      <div class="content ep" v-html="item.content">
      </div>

    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: Array,
    isNeedStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      status: [
        { content: '待审核', className: 'bg-blue' },
        { content: '已通过', className: 'bg-green' },
        { content: '已驳回', className: 'bg-red' },
        { content: '已删除', className: 'bg-grad' }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.list {
  overflow: hidden;
}
.item {
  background-color: #fff;
  padding: 15px 12px 15px 14px;
  overflow: hidden;
  transition: all 0.3s 0.3s, transform 0.3s;
  height: 122px;
}
.hide {
  transform: translateX(100%);
  padding: 0 12px 0 14px;
  height: 0px;
  // background: #ed5564;
}
.title-box {
  line-height: 28px;
  display: flex;
}
.title {
  font-weight: bold;
  font-size: 18px;
  color: #555;
  flex: 1;
}
.time {
  margin-left: 10px;
  color: #999;
  font-size: 13px;
}
.row {
  margin-top: 12px;
  font-size: 13px;
  color: #999;
}
.content {
  overflow: hidden;
  line-height: 24px;
  font-size: 13px;
  color: #999;
  height: 24px;
  margin-top: 12px;
}
.status {
  float: right;
  margin-right: 30px;
  font-weight: normal;
  line-height: 24px;
  font-size: 13px;
  display: inline-block;
  padding: 0 5px;
  border-radius: 4px;
  color: #fff;
}
.status.bg-blue {
  background-color: #6aa2d7;
}
.status.bg-red {
  background-color: #ed5564;
}
.status.bg-green {
  background-color: #1ab394;
}
.status.bg-gray {
  color: #999;
  border: #999 1px solid;
  box-sizing: border-box;
}
</style>
