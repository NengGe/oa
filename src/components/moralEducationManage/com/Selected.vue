<template>
  <div class="selected">
    <span>已选:</span>
    <div class="container">
      <div class="data">
        <listScrollX>
          <span class="name" v-for="(item, i) in data" :key="i">{{item[attr]||item}}</span>
        </listScrollX>
      </div>
    </div>
    <i class="iconfont del" @click="$emit('del')" v-show="data[0]">&#xe7c0;</i>
  </div>
</template>

<script>
import listScrollX from '@/modules/list/list-scroll-x'
export default {
  components: {
    listScrollX
  },
  props: {
    data: {
      type: Array
    },
    attr: {
      type: String,
      default: 'content'
    }
  }
}
</script>

<style lang="scss" scoped>
.selected {
  height: 59px;
  line-height: 59px;
  display: flex;
}
.container {
  flex: 1;
  overflow: hidden;
}
.data {
  // white-space: nowrap;
  .name {
    margin: 0 5px;
    color: #f8ab59;
    // float: left;
  }
}
.del {
  color: #ed5564;
  padding-left: 13px;
}
</style>
