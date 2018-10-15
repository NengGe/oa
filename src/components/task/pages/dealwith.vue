<template>
  <div class="dealwith page-bg">
    <tabHead position :list="tabList" :currIndex="currIndex" @action="onActionTab"></tabHead>
    <List key="list0" ref="list0" v-if="currIndex === 0" class="list-com" :data="listData1" @action="onActionList" :getData="getList"></List>
    <List key="list1" ref="list1" v-if="currIndex === 1" class="list-com" :data="listData2" @action="onActionList" :getData="getList"></List>
    <App class="cmain"></App>
  </div>
</template>

<script>
import App from '@/app'
import tabHead from '@/components/task/com/tabHead'
import List from '../com/list'
export default {
  components: {
    tabHead,
    List,
    App
  },
  data () {
    return {
      tabList: ['进行中', '已结束'],
      currIndex: 0,
      listData1: [],
      listData2: []
    }
  },
  created () {
    // this.getList(0).then(d => {
    //   this.listData = d
    // })
  },
  methods: {
    onActionTab (item, i) {
      this.currIndex = i
      console.log(this.$refs['list0'], 'list' + this.currIndex)
      // this.$refs['list' + this.currIndex].reStart()
    },
    onActionList (item, i) {
      this.$router.push({ name: 'detail_dealwith', params: { id: item.id, state: this.currIndex } })
    },
    getList (begin) {
      // this.$preloaderFull.show()
      return this.$axios.get(`/mobicampus/task/v1/list?type=${'exed'}&state=${this.currIndex + 1}&start=${begin}&size=10`).then(({ data }) => {
        // this.$preloaderFull.close()
        if (data.status === 200) {
          console.log('if-发起', data)
          let d = data.result.data
          return d.map(item => {
            let { task } = item
            return {
              id: task.id,
              desc: task.desc,
              create_user_name: task.create_user_name,
              expect_complete_time: this.$getTimeStr(task.expect_complete_time, 'mm-dd hh:mm', false),
              stateStr: `${item.exe_finished}/${item.exe_total}已完成`,
              create_time: this.$getTimeStr(task.create_time),
              is_overdue: d.is_overdue === 'true',
              has_new_comments: d.has_new_comments === 'true'
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.dealwith {
  padding-bottom: 66px;
}
.list-com {
  padding-top: 44px;
  margin-top: 12px;
}
</style>
