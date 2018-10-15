<template>
  <SlideSelect :show="show" @close="$emit('update:show',0)" :titles="titles" :lists="lists"
               @confirm="onConfirm"></SlideSelect>
</template>

<script>
  import SlideSelect from '../SlideSelect'

  export default {
    name: 'slide-select-date',
    props: ['show', 'value'],
    data () {
      return {
        titles: null,
        lists: [{d: ['不提醒', '提前5分', '提前10分', '提前15分'], i: 0}],
        keys: {0: 0, 5: 1, 10: 2, 15: 3}
      }
    },
    created () {
      this.lists[0].i = this.keys[this.value]
    },
    methods: {
      onConfirm (close) {
        close(1)
        let val = [0, 5, 10, 15][this.lists[0].i]
        this.$emit('updata:value', val)
        this.$emit('confirm', val)
      }
    },
    components: {
      SlideSelect
    },
    watch: {
      value (v) {
        this.lists[0].i = this.keys[v]
      }
    }
  }
</script>

<style scoped>

</style>
