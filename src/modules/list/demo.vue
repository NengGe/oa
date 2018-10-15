<template>
  <div class="demo">
    <listSelect attr="className" :list="classList" :currIndex="index" @selectData="selectData"></listSelect>
  </div>
</template>

<script>
import listSelect from './list-select'
export default {
  data () {
    return {
      classList: [],
      index: 0
    }
  },
  components: {
    listSelect
  },
  methods: {
    selectData (d) {
      // this.index = d.i
      console.log(d)
    }
  },
  created () {
    setTimeout(() => {
      this.classList = [
        {
          className: '1班'
        },
        {
          className: '2班'
        },
        {
          className: '3班'
        },
        {
          className: '4班'
        },
        {
          className: '5班'
        },
        {
          className: '6班'
        },
        {
          className: '7班'
        },
        {
          className: '8班'
        }
      ]
      this.index = 3
    }, 100)
  }
}
</script>

<style lang="scss" scoped>
* {
}
</style>
