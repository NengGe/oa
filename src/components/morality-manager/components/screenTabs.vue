<template>
  <div class="inner-tabs">
    <div class="item" v-for="(item, index) in msg" @click="changeInd(index)" :class="[ind === index ? 'active' : '']" :key="index">
      <slot>
        <span class="text">{{item}}</span>
        <i class="iconfont-morality" v-html="ind === index ? '&#xe602;' : '&#xe601;'"></i>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'screenTabs',
  props: {
    msg: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      ind: -1
    }
  },
  methods: {
    changeInd (index) {
      this.ind = index
      this.$emit('changeInd', index)
    }
  }
}
</script>
<style scoped>
 .inner-tabs {
    display: flex;
    justify-content: space-around;
    height: 48px;
  }
   .inner-tabs .iconfont-morality {
    /* display: inline-block; */
    color: #737373;
    font-size: 25px;
    margin-top: 6px;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .item span {
    color: #666666;
    font-size: 15px;
  }
  .active .text {
    color: #60a1f6;
  }
  .active i.iconfont-morality {
    color: #60a1f6;
  }
</style>