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
  props: ['value', 'show', 'minValue', 'maxValue'],
  data () {
    return {
      startYear: todayYear - 10,
      titles: ['年', '月', '日', '时', '分'],
      lists: [{ d: [], i: 0 }, { d: [], i: 0 }, { d: [], i: 0 }, { d: [], i: 0 }, { d: [], i: 0 }]
      // selectedIndexs: [0, 1, 0] // 当前选择，通过重新赋值控制子组件选择
    }
  },
  created () {
    if (this.value) {
      // 日期和时间之间 两个空格隔开
      let currData = this.value.replace(/ +/, ' ').split(' ')[0].split('-')
      this.lists = dateBaseHandle.getData(this.startYear, currData[0], currData[1])
      this.lists[2].i = currData[2] - 1
    } else {
      this.lists = dateBaseHandle.getData(this.startYear, todayYear, todayMonth)
      this.selectTody()
    }
    // 时分
    this.lists.push({ d: [], i: 0 })
    this.lists.push({ d: [], i: 0 })
    let hours = dateBaseHandle.getHours()
    let minutes = dateBaseHandle.getMinutes()
    // let minutes = ['00', '15', '30', '45']
    let todayDate = new Date()
    let selHour
    let selMinute
    if (this.value) {
      let d = this.value.replace(/ +/, ' ').split(' ')[1].split(':')
      selHour = Number(d[0])
      selMinute = Number(d[1])
    } else {
      selHour = todayDate.getHours()
      selMinute = todayDate.getMinutes()
    }
    this.lists[3].d = hours
    this.lists[3].i = selHour
    this.lists[4].d = minutes
    this.lists[4].i = selMinute
  },
  methods: {
    onChange (index, id) {
      // 联动
      if (id === 1) {
        this.dayUpdate()
      }
    },
    dayUpdate () {
      let { 0: d1, 1: d2 } = this.lists
      // let {0: i1, 1: i2} = this.selectedIndexs
      this.$set(this.lists[2], 'd', dateBaseHandle.getDayData(d1.d[d1.i], d2.d[d2.i]))
    },
    selectTody () {
      let { lists } = this
      lists[0].i = todayYear - this.startYear - 1
      lists[1].i = todayMonth - 1
      lists[2].i = todayDay - 1
    },
    onConfirm (close) {
      let { minValue, maxValue } = this
      let { 0: d1, 1: d2, 2: d3 } = this.lists
      let { 3: d4, 4: d5 } = this.lists
      let currHour = d4.d[d4.i]
      let currMinute = d5.d[d5.i]
      let curVal = `${d1.d[d1.i]}-${d2.d[d2.i]}-${d3.d[d3.i]}  ${currHour}:${currMinute}`
      if ((minValue && minValue > curVal) || (maxValue && maxValue < curVal)) {
        this.$emit('error')
        // console.log('IF')
      } else {
        this.$emit('update:value', curVal)
        close(1)
        // console.log('ELSE')
      }
      // this.$emit('update:value', curVal)
      // this.$emit('select', [d1.d[d1.i], d2.d[d2.i], d3.d[d3.i]])
      // close(1)
    }
  },
  components: {
    SlideSelect
  }
}
</script>

<style scoped>
</style>
