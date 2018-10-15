<template>
  <div class="list-head" @click="$emit('action')">
    <div class="head bottom-one-px">
      <i class="l" :class="[iconClass]" v-html="icon"></i>
      <span class="title ep">{{title}}</span>
      <div class="btn iconfont r" @click="$emit('actionBtn')" v-if="needRightBtn">&#xe616;</div>
    </div>
  </div>
</template>

<script>
// &#xe63f;
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      default: 'iconfont'
    },
    needRightBtn: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang='scss' scoped>
.list-head {
  // margin-top: 12px;
  background-color: #fff;
  padding: 0 15px;
  &:active{
    background-color: rgba(153,153,153, 0.1)
  }
}
.head {
  display: flex;
  line-height: 52px;
  height: 52px;
  .l {
    color: #ffaa4f;
  }
  .title {
    flex: 1;
    padding-left: 10px;
    color: #444;
    font-size: 16px;
    font-weight: bold;
  }
  .r {
    font-weight: bold;
  }
}
</style>
