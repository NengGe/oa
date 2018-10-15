<template>
  <div class="form-box bottom-one-px top-one-px">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.form-box {
  padding: 1PX 10px 0;
  background-color: #fff;
}
.form-box.top-one-px:first-child:before{
  // border-bottom: 0;
}
</style>
