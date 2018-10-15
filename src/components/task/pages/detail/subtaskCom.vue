<template>
  <div class="subtask bottom-one-px">
    <div class="head">
      <i class="icon iconfont">&#xe65f;</i>
      <span class="text">{{`${data.length}个子任务`}}</span>
    </div>
    <ul class="list">
      <li class="item" v-for="(item, i) in data" :key="i" @click="itemAction(item, i)">
        <span class="text">{{item.desc}}</span>
        <span class="status" :class="{active: item.state==='1'}">{{item.state==='1'?'进行中':'已结束'}}</span>
      </li>
    </ul>
    <div v-if="needAddBtn" class="btn-box clickActive" @click="$router.push({name:'newchildtask'})">添加子任务</div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    needAddBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    itemAction (item, i) {
      console.log('itemAction 执行')
      this.$router.push({ name: this.$route.name, params: { id: item.id } })
    }
  }
}
</script>

<style lang='scss' scoped>
.subtask {
  padding-bottom: 20px;
  font-size: 13px;
}
.head {
  line-height: 48px;
  color: #999;
  .text {
    margin-left: 15px;
  }
}
.list {
  margin-top: -10px;
  .item {
    border-radius: 5px;
    line-height: 48px;
    margin-top: 10px;
    background-color: #f4f3f3;
    padding: 0 10px 0 17px;
    display: flex;
    justify-content: space-between;
    color: #666;
    .status {
      color: #999;
    }
    .status.active {
      color: #88b8f8;
    }
  }
}
.btn-box {
  font-weight: bold;
  margin: 14px auto 0px;
  width: 113px;
  line-height: 25px;
  border-radius: 3px;
  border: solid 1PX #88b8f8;
  color: #88b8f8;
  text-align: center;
}
</style>

