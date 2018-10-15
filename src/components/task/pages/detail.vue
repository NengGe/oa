<template>
  <div class="detail page-fixed ">
    <infoCom :data='infoData' @excuStatus="onExcuStatus"></infoCom>
    <subtaskCom v-if="parentTaskId==='0'" :data='subtaskData' :needAddBtn="$route.name === 'detail_dealwith' && parentTaskId==='0'"></subtaskCom>
    <leaveWordCom :data='leaveWordData'></leaveWordCom>
    <bottomBtnCom v-if="isShowBottomBtn" @sendAction='onsendAction' @finish='onfinish' @revoke="onrevoke" @edit="onedit"></bottomBtnCom>
    <!-- <Finish :show.sync='isShowFinish' :currExeId='currExeId'></Finish> -->
    <confirmBoxCom v-show="isShowWarnBox" content='确定完成？' @confirmAction="onfinish" @cancelAction="isShowWarnBox = false"></confirmBoxCom>

  </div>
</template>

<script>
/* eslint-disable camelcase */
import confirmBoxCom from '@/modules/message-box/confirmBox'
import infoCom from './detail/infoCom'
import subtaskCom from './detail/subtaskCom'
import leaveWordCom from './detail/leaveWordCom'
import bottomBtnCom from './detail/bottomBtnCom'
import Finish from './detail/finish'
export default {
  components: {
    infoCom,
    subtaskCom,
    leaveWordCom,
    bottomBtnCom,
    Finish,
    confirmBoxCom
  },
  data () {
    return {
      isShowWarnBox: false,
      parentTaskId: '0',
      currExeId: '',
      isShowFinish: false,
      infoData: {},
      subtaskData: [],
      leaveWordData: []
    }
  },
  watch: {
    $route () {
      this.refresh()
    }
  },
  created () {
    this.getData()
  },
  computed: {
    isShowBottomBtn: function () {
      return (this.$route.name === 'detail_dealwith' &&
        this.$route.params.state === 0) ||
        this.$route.name === 'detail_sponsor'
    }
  },
  methods: {
    onExcuStatus () {
      this.$router.push({ name: 'excuStatus', params: { id: this.$route.params.id } })
    },
    onedit () {
      this.$router.push({ name: 'edittask', params: { id: this.$route.params.id } })
    },
    onrevoke () {
      this.postRevoke()
    },
    onfinish () { // 完成
      this.$router.push({ name: 'finish', params: { id: this.$route.params.id, currExeId: this.currExeId } })
      // if (this.$route.name === 'detail_dealwith') {
      //   this.$router.push({ name: 'finish', params: { id: this.$route.params.id, currExeId: this.currExeId } })
      // } else {
      //   this.isShowWarnBox = true
      // }
    },
    onsendAction (comment) {
      console.log(comment)
      this.postComment(comment)
    },
    refresh () {
      this.infoData = {}
      this.subtaskData = []
      this.leaveWordData = []
      this.getData()
    },
    getData () {
      this.$preloaderFull.show()
      return this.$axios.get(`/mobicampus/task/v1/details/${this.$route.params.id}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          console.log('if-详情', data)
          let d = data.result.data
          let { task, exe_total, exe_finished, curr_exe, comment_list, subtask_list } = d
          this.currExeId = curr_exe.id
          this.parentTaskId = task.parent_task_id
          this.infoData = { // --> infoCom
            desc: task.desc,
            imgList: task.attachment_list,
            timeStr: `${this.$getTimeStr(task.create_time, 'yy-mm-dd hh:mm', false)}~${this.$getTimeStr(task.expect_complete_time, 'yy-mm-dd hh:mm', false)}`,
            create_user_name: task.create_user_name,
            exe_total,
            exe_finished
          }
          console.log('this.infoData', this.infoData)
          this.subtaskData = subtask_list // --> subtaskCom
          this.leaveWordData = comment_list.map(item => { // --> leaveWordCom
            return {
              user_name: item.user_name,
              timeStr: this.$getTimeStr(item.create_time),
              comment: item.comment
            }
          })
        }
      }).catch(err => {
        console.log('err', err)
      })
    },
    postComment (comment) {
      let data = {
        task_id: parseInt(this.$route.params.id),
        comment
      }
      this.$preloaderFull.show()
      return this.$axios.post(`/mobicampus/task/v1/comment/save`, data).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.getData()
        }
      })
    },
    postRevoke () {
      this.$preloaderFull.show()
      return this.$axios.post(`/mobicampus/task/v1/withdraw/${this.$route.params.id}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.$router.replace({ name: 'sponsor', query: { excuRevoke: true } })
        }
      })
    }
  }
}
</script>

<style scoped>
.detail {
  overflow-y: auto;
  background: #fff;
  padding: 0 13px 66px 19px;
}
</style>
