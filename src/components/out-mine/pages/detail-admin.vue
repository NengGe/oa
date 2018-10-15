<template>
  <div class="detail page-fixed ">
    <Info :data='info'></Info>
    <Attachment :data='attachment'></Attachment>
    <Summarize :data='SummaryList'></Summarize>
    <bottomBtn v-if="$route.params.state===1" admin @edit='onedit' @end='onend'></bottomBtn>
    <!-- 撤销确定提示 弹窗 -->
    <ConfirmBoxCom v-show="isShowConfirmBoxCom" title="提示" content='尚有成员未提交心得总结是否关闭该任务？' @confirmAction="getEnd" @cancelAction="isShowConfirmBoxCom = false"></ConfirmBoxCom>

  </div>
</template>

<script>
/* eslint-disable camelcase */
import ConfirmBoxCom from '@/modules/message-box/confirmBox'
import Info from './detail/info'
import bottomBtn from './detail/bottom-btn'
import Attachment from './detail/attachment'
import TextareaCom from '@/components/commonCom/textareaCom'
import AttachmentCom from '@/components/commonCom/attachment'
import Summarize from './detail/summarize'
export default {
  components: {
    Info,
    Attachment,
    TextareaCom,
    AttachmentCom,
    bottomBtn,
    Summarize,
    ConfirmBoxCom
  },
  data () {
    return {
      allComplete: false,
      isShowConfirmBoxCom: false,
      detailData: null,
      info: {},
      attachment: [],
      textareaText: '',
      imgList: [],
      SummaryList: []
    }
  },
  watch: {

  },
  created () {
    document.body.style.overflowY = 'hidden'
    this.getData()
    this.$route.params.state === 1 && this.getCheckallpeople()
  },
  destroyed () {
    document.body.style.overflowY = ''
  },
  computed: {

  },
  methods: {
    onedit () {
      this.$router.push({ name: 'newbuild_out_admin', query: { detailData: this.detailData } })
    },
    onend () {
      if (!this.allComplete) {
        this.isShowConfirmBoxCom = true
        return
      }
      this.getEnd().then(() => {
        this.$emit('del')
      })
    },
    getData () {
      this.$preloaderFull.show()
      return this.$axios.get(`/mobicampus/biztrip/v1/details/${this.$route.params.id}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          console.log('data', data)
          let d = data.result.data
          this.detailData = d
          let { biztrip } = d
          let biztrip_people = d.biztrip_people.map(item => {
            return item.user_name
          })
          let startTime = this.$getTimeStr(biztrip.start_time, 'yy-mm-dd hh:mm', false)
          let endTime = this.$getTimeStr(biztrip.end_time, 'yy-mm-dd hh:mm', false)
          let person = biztrip_people.join('、')
          this.info = {
            desc: biztrip.desc,
            type: biztrip.type_name,
            time: `${startTime}~${endTime}`,
            person,
            destination: biztrip.destination,
            budget: biztrip.budget
          }
          this.attachment = biztrip.attachment_list
          this.SummaryList = d.summary_list
          console.log('this.SummaryList', this.SummaryList)
        }
      })
    },
    getEnd () {
      this.$preloaderFull.show()
      return this.$axios.get(`/mobicampus/biztrip/v1/end/${this.$route.params.id}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.$router.back()
          this.$simpleMsg('已结束任务')
        }
      })
    },
    getCheckallpeople () {
      this.$preloaderFull.show()
      return this.$axios.get(`/mobicampus/biztrip/v1/summary/checkallpeople/${this.$route.params.id}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.allComplete = data.result.data
        }
      })
    }
  }
}
</script>

<style scoped>
.detail {
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  background: #fff;
  padding: 0 13px 66px 19px;
}
.TextareaCom:after {
  border: 0;
}
</style>
