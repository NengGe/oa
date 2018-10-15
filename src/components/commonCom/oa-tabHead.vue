<template>
  <div class="oa-tab-head" :class="{active: $attrs.hasOwnProperty('position')}" :style="{background: bg}">
    <div class="list-box">
      <ul class="list">
        <li class="item" :class="{active: currIndex === i}" v-for="(item, i) in list" :key="i" @click="$emit('action', i)">{{attr?item[attr]:item}}</li>
      </ul>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    },
    attr: {
      type: String,
      default: ''
    },
    currIndex: {
      type: Number,
      default: -1
    },
    bg: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

<style scoped>
.oa-tab-head{
  padding-top: 12px;
}
.oa-tab-head.active{
  z-index: 1;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
.list-box {
  display: flex;
  justify-content: center;
}
.list {
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  overflow: hidden;
  border: solid 1PX #88b8f8;
  border-radius: 15px;
  display: flex;
}
.item {
  font-size: 13px;
  width: 80px;
  height: 30px;
  text-align: center;
  color: #88b8f8;
  border-right: solid 1PX #88b8f8;
}
.item:last-child {
  border-right: 0;
}
.item.active {
  background-color: #88b8f8;
  color: #fffefe;
}
</style>
