<template>
  <div class="behavior-item">
    <ul class="item-ul" v-show="sysList.length">
      <li class="item" 
        v-for="(item, index) in sysList"
        :key="index"
      >
        <div class="class-obj">
          <div class="left" >
            <span class="grade">{{item.grade_name || item.build_name}}{{item.class_name || item.dorm_name}}</span>
            <!-- <span class="name">({{item.object_name}})</span> -->
          </div>
          <div class="right">
            {{item.class_total || item.dorm_total}}
          </div>
        </div>
        <div class="sysContent">
          <p 
            class="system-block" 
            v-for="(ele, ind) in item.rules"
            :key="'sys' + ind"
          >
            <span class="span-l">{{ele.rule_name}}: {{ele.rule_count}}</span>
          </p>
        </div>
      </li>
    </ul>
    <div class="no-data" v-show="!sysList.length">没有更多数据......</div>
  </div>
</template>
<script>

export default {
  name: 'behaviorItem',
  props: {
    sysList: Array,
    type: String
  },
  watch: {
    // sysList () {
    // console.log(this.sysList)
    // }
  }
}
</script>
<style scoped>
.behavior-item {
  margin-top: 10px;
  margin-bottom: 54px;
  overflow: auto;
  height: 560px;
  /* border-bottom: 1px solid #ccc; */
  /* height: calc(100% - 10px - 20px - 54px); */
}
.item-ul {
  background: #ffffff;
}
.item {
  padding: 16px 14px 21px 14px;
  border-bottom: 0.5px solid #f7f7f9;
}
.class-obj {
  display: flex;
  margin-bottom: 16px;
}
.class-obj .left {
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.class-obj .right {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #ff6600;
}
.grade,
.name {
  font-size: 16px;
  color: #555555;
  font-weight: bold;
}
.name {
  margin-left: 8px;
  color: #999999;
}
.span-l,
.span-r {
  color: #999999;
  font-size: 13px;
}
.span-l {
  float: left;
}
.span-r {
  float: right;
}
.system-block::after {
  display: block;
  clear: both;
  content: "";
}
.system-block {
  margin-bottom: 16px;
}
.system-block:last-of-type {
  margin-bottom: 0px;
}
.sysContent {
  display: flex;
  flex-wrap: wrap;
}
.sysContent .system-block {
  width: 50%;
}
.no-data {
  text-align: center;
  padding: 10px 0px;
}
</style>