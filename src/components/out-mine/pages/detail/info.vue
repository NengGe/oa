<template>
  <div class="info">
    <div class="content">{{data.desc}}</div>
    <div class="row">
      <span class="l">外出类型：</span>
      <span class="r">{{data.type}}</span>
    </div>
    <div class="row">
      <span class="l">外出时间：</span>
      <span class="r">{{data.time}}</span>
    </div>
    <div class="row">
      <span class="l">外出人员：</span>
      <span class="r">{{data.person}}</span>
    </div>
    <div class="row">
      <span class="l">外出地点：</span>
      <span class="r">{{data.destination}}</span>
    </div>
    <div class="row">
      <span class="l">预算金额：</span>
      <span class="r orange">{{data.budget}}元</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  }
}
</script>


<style lang="scss" scoped>
.content {
  font-size: 18px;
  color: #555;
  font-weight: bold;
  line-height: 24px;
  padding: 10px 0;
}
.row {
  font-size: 13px;
  color: #999;
  line-height: 28px;
  display: flex;
  .r{
    flex: 1;
  }
}
.orange{
  color: #ff6600;
}
</style>
