<template>
  <SlideSelect :show="show" @close="$emit('update:show',0)" :titles="titles" :lists="lists" @confirm="onConfirm"></SlideSelect>
</template>

<script>
  import SlideSelect from '../SlideSelect'
  import dateBaseHandle from './date-base-handle'

  export default {
    name: 'slide-select-date',
    props: ['value', 'minValue', 'maxValue', 'show'],
    data () {
      return {
        titles: null,
        // i 为当前选择，通过重新赋值控制子组件选择
        lists: []
      }
    },
    created () {
      let hours = dateBaseHandle.getHours()
      let minutes = dateBaseHandle.getMinutes()
      let todayDate = new Date()
      let selHour
      let selMinute
      if (this.value) {
        let d = this.value.split(':')
        selHour = d[0].trim()
        selMinute = d[1].trim()
      } else {
        selHour = todayDate.getHours()
        selMinute = todayDate.getMinutes()
      }
      this.lists = [{
        d: hours,
        i: selHour
      }, {
        d: minutes,
        i: selMinute
      }]
    },
    methods: {
      onConfirm (close) {
        let {lists, minValue, maxValue} = this
        let {0: d1, 1: d2} = lists
        let currHour = d1.d[d1.i]
        let currMinute = d2.d[d2.i]

        if (minValue) {
          let d = minValue.split(':')
          let minHour = d[0].trim()
          let minMinute = d[1].trim()
          if (currHour + currMinute < minHour + minMinute) {
            this.$emit('error')
          } else {
            this.$emit('update:value', `${currHour}:${currMinute}`)
            close(1)
          }
        } else if (maxValue) {
          let d = maxValue.split(':')
          let maxHour = d[0].trim()
          let maxMinute = d[1].trim()
          if (currHour + currMinute > maxHour + maxMinute) {
            this.$emit('error')
          } else {
            this.$emit('update:value', `${currHour}:${currMinute}`)
            close(1)
          }
        } else {
          this.$emit('update:value', `${currHour}:${currMinute}`)
          close(1)
        }
      }
    },
    components: {
      SlideSelect
    }
  }
</script>

<style scoped>

</style>
