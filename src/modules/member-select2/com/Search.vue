<template>
  <oa-search class="oa-search" :keyword='keyword' @update:keyword="v=>$emit('update:keyword', v)" placeholder="搜索...">
    <div v-if="type==='multiple'" class="right" :class="{active: isSelectAll}" slot="right" @click="$emit('selectAll')">全选</div>
  </oa-search>
</template>

<script>
export default {
  props: {
    isSelectAll: {
      type: Boolean,
      default: false
    },
    keyword: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'single'
    }
  },
  watch: {
    inputV (newV) {
      this.$emit('update:keyword', newV)
    },
    keyword (newV) {
      this.inputV = newV
    }
  },
  data () {
    return {
      inputV: ''
    }
  }
}
</script>

<style lang='scss' scoped>
.oa-search {
  // overflow: hidden;
}
.right {
  padding: 0 15px;
  background: #ccc;
  color: #fff;
  line-height: 30px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}
.right.active {
  background: #88b8f8;
}
</style>
