<template>
  <div class="box">
    <row ref="row" :row="i" :column="column" v-for="i in row" :key="i" @getElSite="(p) => onGetElSite(p, i)"></row>
  </div>
</template>

<script>
import row from './row'
export default {
  components: {
    row
  },
  props: {
    row: {
      type: Number,
      default: 1
    },
    column: {
      type: Number,
      default: 3
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$emit('getElSite', this.getElSite())
    })
  },
  data () {
    return {
      num: 0, // 以获得 row 坐标数量
      elSiteArr: new Array(this.row)
    }
  },
  methods: {
    onGetElSite (elSiteArr, row) {
      this.num++
    },
    getElSite (p) {
      let arr2D = this.$refs.row.map(row => {
        return row.getElSite()
      })
      let arr1D = []
      arr2D.forEach(arr => {
        arr1D.push(...arr)
      })
      return p === '1D' ? arr1D : arr2D
    }
  }
}
</script>

