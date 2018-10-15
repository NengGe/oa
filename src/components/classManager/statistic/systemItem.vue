<template>
  <div class="behavior-item">
    <ul class="item-ul">
      <li class="item" 
        v-for="(item, index) in sysList"
        :key="index"
      >
        <div class="class-obj">
          <div class="left" v-if="type==='student'">
            <span class="grade">{{item.grade_name}}{{item.class_name}}</span>
            <span class="name">({{item.object_name}})</span>
          </div>
          <div class="left" v-else>
            <span class="grade">{{item.object_name}}</span>
          </div>
          <div class="right">
            {{item.object_total}}
          </div>
        </div>
        <div class="sysContent">
          <div
            class="system-block" 
            v-for="(ele, ind) in item.rules"
            :key="'sys' + ind"
          >
            <span class="span-l">{{ele.rule_name}}: {{ele.rule_count}}</span>
          </div>
        </div>
      </li>
    </ul>
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
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}
.class-obj .left {
}
.class-obj .right {
  color: #ff6600;
}
.grade,
.name {
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
</style>