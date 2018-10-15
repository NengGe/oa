<template>
  <ul class="list" :class="{active: $attrs.hasOwnProperty('position')}">
    <li class="item" v-for="(item, i) in list" :key="i" :class="{'active': currIndex===i}" @click="$emit('action',item, i)">
      <span class="text">{{item}}</span>
      <div class="line" v-show="currIndex===i"></div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: Array,
    currIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang='scss' scoped>
.list {
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  height: 44px;
  line-height: 44px;
  &.active {
    z-index: 1;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  }
}
.item {
  position: relative;
  color: #999;
  font-size: 14px;
  &.active {
    color: #88b8f8;
  }
}
.line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 3px;
  width: 75%;
  height: 2px;
  background-color: #88b8f8;
  border-radius: 1PX;
}
</style>
