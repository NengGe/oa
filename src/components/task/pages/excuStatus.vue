<template>
  <div class="excu-status">
    <tabHead position :list="tabList" :currIndex="currIndex" @action="onActionTab"></tabHead>
    <listNoFinish :data="listData1" v-show="currIndex === 0" :needBtn='needUrge' @urgeAction="onUrgeAction"></listNoFinish>
    <listFinish :data="listData2" v-show="currIndex === 1"></listFinish>
  </div>
</template>

<script>
import tabHead from '@/components/task/com/tabHead'
import listNoFinish from './excuStatus/listNoFinish'
import listFinish from './excuStatus/listFinish'
export default {
  components: {
    tabHead,
    listNoFinish,
    listFinish
  },
  data () {
    return {
      needUrge: true, // 催办
      tabList: ['未完成', '已完成'],
      currIndex: 0,
      listData1: [],
      listData2: [],
      userIdList: [] // 催办--通知对象
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.needUrge = from.name !== 'detail_copysend'
    })
  },
  created () {
    this.getData()
  },
  methods: {
    onActionTab (item, i) {
      this.currIndex = i
    },
    onUrgeAction (item, i) {
      this.userIdList = [parseInt(item.user_id)]
      this.postSendNotif().then(() => {
        this.$simpleMsg(`已催办${item.user_name}`)
      })
    },
    getData () {
      this.$preloaderFull.show()
      return this.$axios.get(`/mobicampus/task/v1/taskexe/details/${this.$route.params.id}`).then(({ data }) => {
        // return this.$axios.get(`/mobicampus/task/v1/taskexe/details/${'6'}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          console.log('完成情况', data)
          let d = data.result.data
          this.listData1 = d.exe_list_inprogress
          this.listData2 = d.exe_list_finished
        }
      })
    },
    postSendNotif () {
      let data = {
        'title': '任务通知',
        'content': '您有一条新的任务，请及时处理~',
        'type': 2,
        'user_id_list': this.userIdList,
        'extra': {
          'module_code': 'task',
          'params': this.$route.params.id,
          'view_type': 2
        }
      }
      this.$preloaderFull.show()
      return this.$axios.post(`/mobicampus/common/v1/sendNotif`, data).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          console.log('任务通知', data)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.excu-status {
  padding-top: 44px;
}
</style>
