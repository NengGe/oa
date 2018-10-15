<template>
  <div class="bottom-btn-box top-one-px">
    <div class="l-btn clickActive2" @click="$emit('cancel')">取消</div>
    <div class="r-btn clickActive2" @click="$emit('confirm')">确定</div>
  </div>
</template>

<script>
export default {

}
</script>


<style lang="scss" scoped>
.bottom-btn-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 54px;
  display: flex;
  font-size: 15px;
  text-align: center;
  line-height: 54px;
  .l-btn {
    color: #666;
    flex: 1;
    background-color: #fff;
  }
  .r-btn {
    color: #fff;
    flex: 1;
    background-color: #58aeff;
  }
}
</style>
