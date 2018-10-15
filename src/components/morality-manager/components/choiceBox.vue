<template>
  <div class='choice-box'>
    <div class="circle" :class="[isChoice?'active': '']">
      <i class="iconfont-morality">&#xe650;</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'choiceBox',
  components: {
  },
  props: {
    isChoice: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  },
  watch: {
    isChoice () {
      // console.log('isChoice变化啦')
    }
  }
}
</script>

<style scoped>
.choice-box {
  position: relative;
}
.circle {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: solid 1px #c2c2c2;
}
.active {
  background-color: #88b8f8;
}
.circle .iconfont-morality {
  position: absolute;
  font-size: 11px;
  color: #ffffff;
  left: 3px;
  top: -18px;
  height: 20px;
}
</style>