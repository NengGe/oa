<template>
  <div class="approval-box" :class="{active: isPop}">
    <div class="icon-box" >
      <span class="icon iconfont-file">&#xe605;</span>
    </div>
    <div class="approval btn">审批</div>
  </div>
</template>

<script>
  export default {
    props: {
      isPop: Boolean
    }
  }
</script>

<style lang='scss' scoped>
  .approval-box{
    transition: right 0.3s;
    z-index: 2;
    position: fixed;
    right: -33px;
    bottom: 70px;
    display: flex;
    justify-content: space-between;
    background-color: #6bb3f5;
    width: 66px;
    height: 40px;
    color: #fff;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    line-height: 40px;
    padding: 0 3px 0 13px;
    font-size: 15px;
    box-sizing: border-box;
    opacity: 0.35;
    &.active{
      right: 0;
      opacity: 1;
    }
  }
</style>
