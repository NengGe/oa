<template>
  <i class="iconfont" :style="wordSize" :class="[wordColor ? 'w-' + wordColor : '']">
    &#xe605;
  </i>
</template>
<script>
export default {
  name: 'toIcon',
  props: {
    size: {
      type: Number,
      default: 32
    },
    wordColor: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  computed: {
    wordSize () {
      return {
        fontSize: this.size + 'px'
      }
    }
  }
}
</script>
<style scoped>
i.iconfont {
  font-family: "iconfont-morality";
  font-size: 32px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  font-weight: normal;
  letter-spacing: -3px;
}
.w-blue0 {
  color: #88b8f8;
}
.w-gray0 {
  color: #999999;
}
</style>