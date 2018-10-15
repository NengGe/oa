<template>
  <!-- <div class="tab-bottom-box"> -->
    <ul class="tabList top-one-px">
      <li class="item" v-for="(item,i) in list" :key='i' v-click="()=>$emit('action', item, i)" :class="{active:currIndex === i}">
        <span class="icon" :class='[item.iconClass]' v-html="currIndex === i?item.iconActive:item.iconDefault"></span>
        <span>{{item.content}}</span>
      </li>
    </ul>
  <!-- </div> -->
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
    }
  }
}
</script>

<style scoped>
.tabList {
  background-color: #fff;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 54px;
  padding: 6px 0;
  box-sizing: border-box;
}
.tabList > .item {
  flex: 1;
  text-align: center;
  color: #aaa;
}
.tabList > .item.active{
  color: #88b8f8;
}
.tabList > .item > span {
  width: 100%;
  display: inline-block;
  font-size: 12px;
}
.tabList > .item .icon {
  font-size: 23px;
}
</style>
