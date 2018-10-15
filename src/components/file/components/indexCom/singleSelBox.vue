<template>
  <div :class="['singleSel-box',{active: isSelected}]">
    <span class="icon iconfont" v-show="isSelected">&#xe63e;</span>
  </div>
</template>

<script>
export default {
  props: {
    isSelected: Boolean
  },
  methods: {
    // singleSelAction () {

    // }
  }
}
</script>

<style lang="scss" scoped>
  .singleSel-box{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: #c4c5c7 1PX solid;
    box-sizing: border-box;
    .icon{
      font-size: 12px;
      line-height: 22px;
    }
    &.active{
      background-color: #58aeff;
      color: #fff;
      border: 0;
    }
  }
</style>
