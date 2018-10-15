<template>
  <div class="itemBtn" ref="itemBtn" @click="$emit('action',item)">
    <div class="icon-box" :style="{'background': bg||item.bg, 'width': `${itemWidth}px`||`${item.itemWidth}px`,'height': `${itemWidth}px`||`${item.itemWidth}px`}">
      <span class="icon iconfont-OA" :class="[ item.iconClass]" v-html="icon||item.icon" :style="{'lineHeight': `${itemWidth}px`||`${item.itemWidth}px`}"></span>
      <slot class="rightTop"></slot>
    </div>
    <div class="content ep" :style="contentStyle || item.contentStyle">{{content||item[attr]}}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    },
    attr: {
      type: String,
      default: 'content'
    },
    content: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      default: ''
    },
    bg: {
      type: String,
      default: ''
    },
    contentStyle: {
      type: Object
    },
    itemWidth: [Number, String]
  },
  methods: {
    getElSite () {
      let el = this.$refs.itemBtn
      return {
        x: el.offsetLeft,
        y: el.offsetTop
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.itemBtn {
  width: 60px;
  margin: 0 auto;
  .icon-box {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 auto;
    background: #eee;
    text-align: center;
    position: relative;
    &:active {
      opacity: 0.75;
    }
    .icon {
      font-size: 24px;
      line-height: 50px;
      color: #fff;
    }
    .status-box {
      position: absolute;
      left: 0;
      bottom: 0px;
      width: 100%;
      font-size: 10px;
      color: #fff;
      background-color: #333;
      opacity: 0.4;
      // border-radius: 0 0 10px 10px;
    }
  }
  .content {
    text-align: center;
    font-size: 11px;
    margin-top: 13px;
    font-weight: bold;
    height: 35px;
  }
}
.rightTop {
  position: absolute;
  right: 0;
  top: 0px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>
