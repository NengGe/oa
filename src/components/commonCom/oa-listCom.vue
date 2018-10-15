<template>
  <div class="item-box bottom-one-px" @click="$emit('action')">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.item-box {
  transform: translate(0, 0);
  // padding: 0px 10px;
  background-color: #fff;
  // margin-top: 12px;
}
.item-box.top-one-px:first-child:before{
  // border-bottom: 0;
}
</style>
