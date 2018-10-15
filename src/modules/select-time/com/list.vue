<template>
  <div class="list-box cf">
    <div class="title">{{data.title}}</div>
    <div class="main">
      <div class="center">
        <listSelect :i='data.i' ref="listSelect" :list="data.data" @selectData='d=>$emit("selectData", d)'></listSelect>
      </div>
    </div>
  </div>

</template>

<script>
import listSelect from './list-select'
export default {
  components: {
    listSelect
  },
  props: {
    data: Object
  },
  watch: {
    data (a, b) {
      console.log('watch-data-a', this.data)
      console.log('watch-data-b', b)
    }
  },
  methods: {
    getCurrIndex () {
      return this.$refs.listSelect.index
    }
  }
}
</script>

<style lang="scss" scoped>
.list-box {
  height: 230px;
  flex: 1;
  margin: 0 5px;
}
.title {
  width: 100%;
  line-height: 30px;
  text-align: center;
}
.main {
  position: relative;
  height: 200px;
  overflow: hidden;
}
.center {
  position: absolute;
  left: 0;
  top: 75px;
  width: 100%;
  height: 50px;
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  // background: rgba($color: #aaa, $alpha: 0.5);
}
.list {
  height: 200px;
  overflow-y: auto;
}
.item {
  box-sizing: border-box;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  border-bottom: 1px solid #dedede;
}
</style>
