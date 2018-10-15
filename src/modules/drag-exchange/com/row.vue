<template>
  <div class="row">
    <ul class="list">
      <li ref="item" class="item" v-for="i in column" :key="i">{{(row-1)*3+i}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    column: {
      type: Number,
      default: 3
    },
    row: {
      type: Number,
      default: 1
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$emit('getElSite', this.getElSite())
    })
  },
  methods: {
    getElSite () {
      return this.$refs.item.map(el => {
        return {
          x: el.offsetLeft,
          y: el.offsetTop
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.list {
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
  .item {
    width: 55px;
    height: 55px;
    background: #ccc;
    font-size: 30px;
    border-radius: 50%;
    text-align: center;
    line-height: 55px;
  }
}
</style>
