<template>
  <div class="copysend">
    <!-- <oa-search position :keyword.sync='keyword' placeholder="搜索..." style="background:#fff"></oa-search> -->
    <List ref="list0" class="list-com" :data="listData" @action="onActionList" :getData="getList"></List>
    <App class="cmain"></App>
  </div>
</template>

<script>
import App from '@/app'
import List from '../com/list'
export default {
  components: {
    List,
    App
  },
  data () {
    return {
      keyword: '',
      listData: []
    }
  },
  created () {
    // this.getList(0).then(d => {
    //   this.listData = d
    // })
  },
  methods: {
    onActionList (item, i) {
      this.$router.push({ name: 'detail_copysend', params: { id: item.id } })
    },
    getList (begin) {
      this.$preloaderFull.show()
      return this.$axios.get(`/mobicampus/task/v1/list?type=${'cc'}&state=${1}&start=${begin}&size=10`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          console.log('if-发起', data)
          let d = data.result.data
          return d.map(item => {
            let {task} = item
            return {
              id: task.id,
              desc: task.desc,
              create_user_name: task.create_user_name,
              expect_complete_time: this.$getTimeStr(task.expect_complete_time, 'mm-dd hh:mm', false),
              stateStr: `${item.exe_finished}/${item.exe_total}已完成`,
              create_time: this.$getTimeStr(task.create_time)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.copysend {
  padding-bottom: 66px;
}
</style>
