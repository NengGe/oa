<template>
  <div class="preserve" @click="$emit('click')" ref="preserve">
    <a href="javascript:;" class="text-a">{{sureVal}}</a>
  </div>
</template>
<script>
export default {
  name: 'preserve',
  props: {
    sureVal: {
      type: String,
      default: '确定'
    }
  },
  methods: {
    setStatic () {
      this.$refs.preserve.style.position = 'static'
    },
    setFixed () {
      this.$refs.preserve.style.position = 'fixed'
    }
  }
}
</script>
<style scoped>
.preserve {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 54px;
  background: #88b8f8;
  font-weight: bold;
  line-height: 54px;
  text-align: center;
  width: 100%;
  &:active{
    background: #a1c2ef;
  }
}
.preserve .text-a {
  color: #ffffff;
  display: inline-block;
  font-size: 18px;
}
</style>