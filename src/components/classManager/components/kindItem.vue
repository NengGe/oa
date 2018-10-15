<template>
  <div class="kind-item" @click="$emit('click')">
    <div class="left">
      <slot name="left-item">
        <span class="system-item">制度</span>
      </slot>
    </div>
    <!-- <slot class="right"> -->
      <div class="right" v-if="!inputInfo">
        <span class="choice">请选择</span>
        <toIcon :size="15" wordColor="gray0" class="fade"></toIcon>
      </div>
      <div class="right" v-else>
        <span class="info">{{inputInfo}}</span>
      </div>
    <!-- </slot> -->
  </div>
</template>
<script>
import toIcon from '@/components/classManager/components/toIcon'
export default {
  name: 'kindItem',
  props: {
    inputInfo: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  components: {
    toIcon,
    methods: {
    }
  },
  watch: {
  }
}
</script>
<style scoped>
.kind-item {
  margin-top: 12.5px;
  padding: 0px 16px;
  height: 54px;
  line-height: 54px;
  background: #ffffff;
}
.kind-item::after {
  display: block;
  content: "";
  clear: both;
}
.left {
  float: left;
  min-width: 35px;
}
.right {
  float: right;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 6px;
  max-width: 300px;
}
.system-item {
  font-size: 15px;
  font-weight: bold;
  color: #333333;
}
.choice, .info  {
  color: #cccccc;
  font-size: 15px;
}
.info {
  color: #333;
}
.fade {
  opacity: 0.75;
}
</style>