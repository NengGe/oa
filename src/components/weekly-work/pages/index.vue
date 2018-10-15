<template>
  <div class="index">
    <selectDate position @change='getTime'></selectDate>
    <listLoad ref="listLoad" :data='list' :getData='getData' @action='111' :needStatus='false'></listLoad>
    <!-- <list :list='list'></list> -->
    <switchBtn></switchBtn>
  </div>
</template>

<script>
import listLoad from '../com/list-load'
import switchBtn from '../com/switch-btn'
import selectDate from '../com/select-date'
export default {
  components: {
    listLoad,
    switchBtn,
    selectDate
  },
  data () {
    return {
      startTime: '',
      endTime: '',
      list: []
    }
  },
  created () {

  },
  methods: {
    getTime (start, end) {
      this.list = []
      this.startTime = start
      this.endTime = end
      this.$refs.listLoad && this.$refs.listLoad.reStart()
    },
    getData (begin) {
      this.$preloaderFull.show()
      return this.$axios.get(`/mobicampus/work/v1/list?start_date=${this.startTime}&end_date=${this.endTime}&start=${begin}&size=50`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          console.log('data', data)
          let d = data.result.data
          let list = d.map((item, i) => {
            let o = {
              title: '会议的主题名称',
              leader: item.charger_name,
              time: this.$getTimeStr(item.date, 'yy-mm-dd hh:mm', false),
              persons: item.people.join('、'),
              module_code: item.work_approve.module_code,
              state: item.work_approve.state
            }
            if (item.work_approve.module_code === 'biztrip') {
              o.title = item.resource.desc
            } else if (item.work_approve.module_code === 'meeting') {
              o.title = item.resource.title
            } else if (item.work_approve.module_code === 'task') {
              o.title = item.resource.desc
            }
            return o
          })
          // this.list = list
          return list
        }
      })
    }
  }
}
</script>

<style scoped>
.index {
  padding-top: 38px;
}
</style>
