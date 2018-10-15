<template>
  <div class="commitBtn-box" :class="{needPosition}" @click="$emit('action')">{{content}}</div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: '确定'
    },
    needPosition: { // 需要定位在底部？
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.commitBtn-box {
  box-shadow: 1PX 2px 19px 0px rgba(6, 48, 88, 0.13);
  height: 50px;
  margin: 30px 10px 50px;
  background-color: #53a2ed;
  color: #fff;
  line-height: 50px;
  font-size: 16px;
  border-radius: 9px;
  text-align: center;
}
.commitBtn-box:active{
  background-color: #62abf1;
  transform: scale(0.995)
}
.commitBtn-box.needPosition{
  position: fixed;
  left: 10px;
  right: 10px;
  bottom: 0;
}
</style>
