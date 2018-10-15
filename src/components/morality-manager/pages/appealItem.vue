<template>
  <div class="appeal-item">
    <div class="app-content">
      <div class="left">
        <span class="app-head">申诉：</span>
        <span class="grade-obj">{{itemData.grade_name}}{{itemData.class_name}}</span>
      </div>
      <div class="center">
        <p class="system">{{itemData.rule_name}}/{{itemData.rule_item_name}}</p>
      </div>
      <div class="right">
        <span class="apping">{{['申诉中', '已经修改', '已经删除', '已经驳回'][parseInt(itemData.states)]}}</span>
        <i class="iconfont-morality">&#xe640;</i>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'appealItem',
  props: {
    itemData: Object
  },
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
    // console.log(this.itemData)
  }
}
</script>

<style scoped>
.appeal-item {
  /* margin: 11.5px 0px; */
  /* width: 750px; */
  margin-top: 11.5px;
  background-color: #ffffff;
}
.app-content {
  height: 54.5px;
  line-height: 54.5px;
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
}
.app-head {
  display: inline-block;
  font-size: 15px;
  color: #333333;
  font-family: PingFang-SC-Heavy;
  font-weight: bold;
}
.center {
  width: 90px;
  /* font-family: PingFang-SC-Bold; */
  font-size: 13px;
  color: #999999;
}
.system {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.right {
  overflow: hidden;
}
.right i.iconfont-morality {
  display: inline-block;
  font-size: 14px;
  color: #999999;
  opacity: 0.75;
}
.apping {
  font-size: 13px;
  color: #9bc1ff;
}
</style>