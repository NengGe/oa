<template>
  <ul class="nav-box cf">
    <li class="navItem clickActive" v-for="(item, i) in list" :key="'navList'+i" @click="$emit('action' ,item, i)">
      <span class="text">{{item[attr]}}</span>
      <span class="icon iconfont">&#xe616;</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: Array,
    attr: {
      type: String,
      default: 'content'
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang='scss' scoped>
.nav-box {
  margin: 10px 10px;
  .navItem {
    float: left;
    width: 20%;
    margin-right: 5%;
    border: 1px solid #58aeff;
    box-sizing: border-box;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border-radius: 4px;
    color: #58aeff;
    font-size: 12px;
    display: flex;
    &.active {
      color: #fff;
      background-color: #58aeff;
    }
    &:last-child {
      margin-right: 0;
    }
    .text {
      padding: 0 2px;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .icon {
      font-size: 12px;
      padding: 0 2px;
    }
  }
}
</style>

