<template>
  <div class="status-flag" :style="{background: bgColor}">
    <span class="text">{{content}}</span>
    <div class="triangle-bottom" :style="{ 'border-bottom-color': bgColor2}"></div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: '#ccc'
    },
    bgColor2: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

<style scoped>
.status-flag {
  width: 54px;
  height: 25px;
  background: #a4d0ff;
  position: relative;
  text-align: center;
}
.text {
  color: #fff;
  font-size: 10px;
}
.triangle-bottom {
  width: 0;
  height: 0;
  border-left: 27px transparent solid;
  border-right: 27px transparent solid;
  border-bottom: 5px #fff solid;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>

