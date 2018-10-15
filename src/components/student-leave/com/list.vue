<template>
  <ul class="list">
    <li class="item bottom-one-px clickActive" v-for="(item, i) in data" :key="i" @click="$emit('action', item, i)" :class="{hide:item.hide}">
    <!-- <li class="item bottom-one-px clickActive" v-for="(item, i) in data" :key="i" @click="aaa(item, i)" :class="{hide:item.hide}"> -->
      <div class="title-box">
        <div class="title ep">
          <span class="gradeClass">{{item.grade_name}}</span>
          <span class="class">{{item.class_name}}</span>
          <span class="name">{{item.user_name}}</span>
          <span class="type">{{item.typeName}}</span>
        </div>
        <span v-show="isNeedStatus" class="status" :class="status[item.states].className">{{status[item.states].content}}</span>
      </div>
      <div class="row">
        <span class="l">请假时间：</span>
        <span class="r">{{$getTimeStr(item.start_leave_on,'yy-mm-dd hh:mm', false)}}~{{$getTimeStr(item.end_leave_on,'yy-mm-dd hh:mm', false)}}</span>
      </div>
      <div class="row">
        <span class="l">备注内容：</span>
        <span class="r">{{item.description}}</span>
      </div>
      <div class="row">
        <span class="l">宿舍信息：</span>
        <span class="r"></span>
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
        { content: '已删除', className: 'bg-gray' }
      ]
    }
  },
  methods: {
    aaa (item, i) {
      this.$set(item, 'hide', true)
    }
  }
}
</script>

<style lang='scss' scoped>
.list{
  overflow: hidden;
}
.item {
  height: 140px;
  background-color: #fff;
  padding: 15px 12px 15px 14px;
  overflow: hidden;
  transition: all 0.3s 0.3s,transform 0.3s;
  box-sizing: border-box;
}
.hide {
  transform: translateX(100%);
  padding: 0 12px 0 14px;
  height: 0px;
  // background: #ed5564;
}
.title-box {
  line-height: 28px;
  font-size: 18px;
  color: #555;
  font-weight: bold;
  display: flex;
}
.title {
  padding-right: 10px;
  flex: 1;
}
.row {
  line-height: 27px;
  display: flex;
  color: #999;
  .r {
    flex: 1;
  }
}
.status {
  align-self: center;
  height: 24px;
  margin-right: 30px;
  font-weight: normal;
  line-height: 24px;
  font-size: 13px;
  // display: inline-block;
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
