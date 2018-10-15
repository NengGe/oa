<template>
  <ul class="list">
    <li class="item clickActive" v-for="(item, i) in data" :key="item.id" @click="$emit('action', item, i)" :class="{hide:item.hide}">
      <div class="content" :class="{'bottom-one-px': i<data.length-1}">
        <div class="title-box">
          <span class="title ep">{{item.desc}}</span>
          <!-- <span class="status clickActive" v-if="needStatus&&item.summarized">已完成</span> -->
        </div>
        <div class="row ep">
          <span class="l">对象：</span>
          <span class="r">{{item.name}}</span>
        </div>
        <div class="row ep">
          <span class="l">制度：</span>
          <span class="r">{{item.ruleName}}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: Array,
    needStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showBg: false
    }
  },
  created () {
    // console.log('created aaa', this.$attrs.aaa)
  }
}
</script>

<style lang='scss' scoped>
.item {
  background-color: #fff;
  padding: 15px 12px 0 14px;
  overflow: hidden;
  // transition: all 0.3s 0.3s,transform 0.3s;
  // height: 128px;
}
.hide {
  transform: translateX(100%);
  padding: 0 12px 0 14px;
  height: 0px;
}
.content {
  padding-bottom: 15px;
}
.title-box {
  display: flex;
  .title {
    flex: 1;
    max-width: 250px;
    display: inline-block;
    vertical-align: middle;
    line-height: 28px;
    font-size: 18px;
    color: #555;
    font-weight: bold;
  }
  .icon-message {
    font-size: 15px;
    color: #f8b788;
  }
  .status {
    align-self: center;
    width: 60px;
    height: 20px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: bold;
    color: #fd939b;
    border: 1px solid #fd939b;
    text-align: center;
    vertical-align: middle;
    line-height: 20px;
  }
}
.row {
  font-size: 13px;
  color: #999;
  line-height: 28px;
  .time {
    float: right;
  }
}
</style>
