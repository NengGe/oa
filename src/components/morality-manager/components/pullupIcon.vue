<template>
  <div class="pullup-icon">
    <i class="iconfont-morality pull" @click="changePullState" :class="[isPull?'flag':'']">&#xe61c;</i>
  </div>
</template>
<script>
export default {
  name: 'pullupIcon',
  data () {
    return {
      isPull: false
    }
  },
  props: {
  },
  created () {
  },
  methods: {
    changePullState () {
      this.isPull = !this.isPull
      this.$emit('pull', this.isPull)
    }
  }
}
</script>
<style scoped>
.pullup-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pullup-icon i.iconfont-morality {
  color: #dedede;
  font-size: 22px;
  transition: transform 0.3s;
}
.flag {
  transform: rotateZ(180deg)
}
</style>