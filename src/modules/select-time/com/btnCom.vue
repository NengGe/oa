<template>
  <div class="btn-box">
    <i class="btn clickActive" @click="$emit('cancel')">取消</i>
    <i class="btn clickActive" @click="$emit('confirm')">确定</i>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  }
}
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ddd;
}
.btn {
  font-size: 16px;
  color: #26a2ff;
  float: left;
  width: 50%;
  text-align: center;
}
</style>
