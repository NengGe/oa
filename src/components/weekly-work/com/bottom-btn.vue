<template>
  <div class="bottom-btn top-one-px">
    <div class="btn blue clickActive" @click="$emit('action')">
      <!-- <span class="icon iconfont">&#xe61a;</span> -->
      <span class="text">{{content}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      default: '全部通过'
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-btn {
  display: flex;
  text-align: center;
  height: 54px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
}
.btn {
  flex: 1;
  line-height: 54px;
}
.blue {
  color: #88b8f8;
}
</style>

