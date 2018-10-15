<template>
  <div class="info-caigou">
    <div class="row" v-for="(item,i) in data.contentArr" :key="'contentArr'+i">
      <div class="l">{{item[0]+':'}}</div>
      <div class="r">{{item[1]}}</div>
    </div>
    <div class="form" v-for="(list,i) in data.formList" :key="'formList'+i">
      <div class="head">{{'明细清单'+(i+1)}}</div>
      <div class="row" v-for="(item,i) in list" :key="'list'+i">
        <div class="l">{{item[0]+':'}}</div>
        <div class="r">{{item[1]}}</div>
      </div>
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

<style scoped>
.row {
  display: flex;
  line-height: 30px;
  font-size: 13px;
}
.l {
  width: 75px;
  color: #999;
}
.r {
  flex: 1;
  color: #666;
  word-break: break-all;
}
.form{
  margin-top: 12px;
  background: #efefef;
}
.head{
  color: #666;
  padding: 5px 0;
}
</style>

