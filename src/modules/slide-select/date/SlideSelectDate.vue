<template>
  <SlideSelect :show="show" @close="$emit('update:show',0)" :titles="titles" :lists="lists" @change="onChange" @confirm="onConfirm"></SlideSelect>
</template>

<script>
  import SlideSelect from '../SlideSelect'
  import dateBaseHandle from './date-base-handle'

  let todayDate = new Date()
  let todayYear = todayDate.getFullYear()
  let todayMonth = todayDate.getMonth() + 1
  let todayDay = todayDate.getDate()
  export default {
    name: 'slide-select-date',
    props: ['value', 'show'],
    data () {
      return {
        startYear: todayYear - 10,
        titles: ['年', '月', '日'],
        lists: [{d: [], i: 0}, {d: [], i: 0}, {d: [], i: 0}]
        // selectedIndexs: [0, 1, 0] // 当前选择，通过重新赋值控制子组件选择
      }
    },
    created () {
      if (this.value) {
        let currData = this.value.split('-')
        this.lists = dateBaseHandle.getData(this.startYear, currData[0], currData[1])
        this.lists[2].i = currData[2] - 1
      } else {
        this.lists = dateBaseHandle.getData(this.startYear, todayYear, todayMonth)
        this.selectTody()
      }
    },
    methods: {
      onChange (index, id) {
        // 联动
        if (id === 1) {
          this.dayUpdate()
        }
      },
      dayUpdate () {
        let {0: d1, 1: d2} = this.lists
        // let {0: i1, 1: i2} = this.selectedIndexs
        this.$set(this.lists[2], 'd', dateBaseHandle.getDayData(d1.d[d1.i], d2.d[d2.i]))
      },
      selectTody () {
        let {lists} = this
        lists[0].i = todayYear - this.startYear - 1
        lists[1].i = todayMonth - 1
        lists[2].i = todayDay - 1
      },
      onConfirm (close) {
        let {0: d1, 1: d2, 2: d3} = this.lists
        // console.log(`${d1.d[d1.i]}/${d2.d[d2.i]}/${d3.d[d3.i]}`)
        this.$emit('update:value', `${d1.d[d1.i]}-${d2.d[d2.i]}-${d3.d[d3.i]}`)
        close(1)
        this.$emit('curPageConfirm', `${d1.d[d1.i]}-${d2.d[d2.i]}-${d3.d[d3.i]}`)
        // this.$emit('select', [d1.d[d1.i], d2.d[d2.i], d3.d[d3.i]])
      }
    },
    components: {
      SlideSelect
    }
  }
</script>

<style scoped>

</style>
