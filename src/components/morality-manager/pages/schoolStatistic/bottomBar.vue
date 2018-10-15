<template>
  <div class="bottom-bar">
    <div class="bar-inner">
      <div class="block" 
        v-for="(item, index) in iconList"
        :key="index" 
        @click="changeInd(index)"
        :class="ind === index ? 'active': ''">
        <i class="iconfont-morality" v-html="item.icon"></i>
        <p class="text">{{item.text}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'bottomBar',
    data () {
      return {
        iconList: [
          {
            icon: '&#xe603;',
            text: '按班级'
          },
          {
            icon: '&#xe60a;',
            text: '按制度'
          },
          {
            icon: '&#xe6a0;',
            text: '按宿舍'
          }
        ],
        ind: 0
      }
    },
    methods: {
      changeInd (index) {
        this.ind = index
        this.$emit('getIndex', index)
      }
    }
  }
</script>
<style scoped>
  .bottom-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    height: 54px;
    background: #ffffff;
  }
  .bar-inner .block {
    text-align: center;
  }
  .bottom-bar i.iconfont-morality {
    color: #aaaaaa;
    font-size: 25px;
  }
  .bottom-bar .bar-inner {
    display: flex;
    justify-content: space-around;
  }
  .bar-inner {
    height: 100%;
    align-items: center;
  }
  .text {
    color: #aaaaaa;
    font-size: 10px;
  }
  .active i.iconfont-morality{
    color: #88b8f8;
  }
  .active .text {
    color: #88b8f8;
  }
</style>