<template>
  <SlideSelect :show="show" @close="$emit('update:show',0)" :titles="titles" :lists="lists" @change="onChange" @confirm="onConfirm"></SlideSelect>
</template>

<script>
  import SlideSelect from '../SlideSelect'
  import dateBaseHandle from './date-base-handle'

  let hours = dateBaseHandle.getHours()
  let minutes = dateBaseHandle.getMinutes()

  let todayDate = new Date()
  let todayHour = todayDate.getHours()
  let todayMinute = todayDate.getMinutes()
  export default {
    name: 'slide-select-date',
    props: ['show'],
    data () {
      return {
        startYear: new Date().getFullYear() - 10,
        titles: ['开始时间(小时: 分钟)', '结束时间(小时: 分钟)'],
        // i 为当前选择，通过重新赋值控制子组件选择
        lists: [{
          d: hours,
          i: todayHour
        }, {
          d: minutes,
          i: todayMinute
        }, {
          d: hours,
          i: (todayHour + 1) > 23 ? 23 : (todayHour + 1)
        }, {
          d: minutes,
          i: todayMinute
        }]
      }
    },
    methods: {
      onChange (index, id) {
        // 确保大小关系
        let {lists} = this

        if (id > 1) {
          let i1 = lists[0].i
          let i2 = lists[1].i
          let i3 = lists[2].i
          let i4 = lists[3].i
          let v1 = lists[0].d[i1] + lists[1].d[i2]
          let v2 = lists[2].d[i3] + lists[3].d[i4]
          if (v2 < v1) {
            this.lists[id].i = id === 2 ? i1 : i2
          }
        }
      },
      onConfirm (close) {
        let {0: d1, 1: d2, 2: d3, 3: d4} = this.lists
        // let {0: i1, 1: i2, 2: i3, 3: i4} = this.selectedIndexs
        // console.log(`${d1[i1]}:${d2[i2]} ${d3[i3]}:${d4[i4]}`)
        this.$emit('select', [d1.d[d1.i], d2.d[d2.i], d3.d[d3.i], d4.d[d4.i]])
        close(1)
      }
    },
    components: {
      SlideSelect
    }
  }
</script>

<style scoped>

</style>
