<template>
  <div class="approve">
    <selectDate position @change='getTime'></selectDate>
    <listLoad ref="listLoad" :data='list' @reject='reject' :getData='getData' @action='111' :needStatus='true'></listLoad>
    <bottomBtn @action='agreeAll'></bottomBtn>
  </div>
</template>

<script>
import listLoad from '../com/list-load'
import bottomBtn from '../com/bottom-btn'
import selectDate from '../com/select-date'
export default {
  components: {
    listLoad,
    bottomBtn,
    selectDate
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    listPending () {
      return this.list.filter(item => {
        return item.state === '1'
      })
    }
  },
  created () {
    // this.getData()
  },
  methods: {
    reject (item) {
      this.postApprove('reject', [item]).then(d => {
        if (d) {
          item.state = '3'
        }
      })
    },
    agreeAll () {
      if (!this.listPending[0]) return
      this.postApprove('pass', this.listPending).then(d => {
        if (d) {
          console.log('this.listPending', this.listPending)
          this.listPending.forEach(item => {
            item.state = '2'
          })
        }
      })
    },
    getTime (start, end) {
      this.list = []
      this.startTime = start
      this.endTime = end
      console.log('****')
      console.log(this.$refs.listLoad)
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
              state: item.work_approve.state,
              id: item.work_approve.id
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
    },
    postApprove (status, list) {
      let d = {
        action: status,
        work_approve_id_list: list.map(item => Number(item.id))
      }
      this.$preloaderFull.show()
      return this.$axios.post(`/mobicampus/work/v1/approve`, d).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          let msg = status === 'pass' ? '全部通过' : '不通过'
          this.$simpleMsg(`${msg}已提交`)
          return true
        } else {
          this.$simpleMsg(data.message)
        }
      })
    }
  }
}
</script>

<style scoped>
.approve {
  padding-bottom: 66px;
  padding-top: 38px;
}
</style>

