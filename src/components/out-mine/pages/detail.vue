<template>
  <div class="detail page-fixed ">
    <Info :data='info'></Info>
    <Attachment :data='attachment'></Attachment>
    <!-- 心得 -->
    <TextareaCom v-if="$route.params.state===1 && !summarized" class="TextareaCom" placeholder="说点心得吧..." :content.sync='textareaText'></TextareaCom>
    <!-- 附件 -->
    <attachmentCom v-if="$route.params.state===1 && !summarized" :imgList="imgList"></attachmentCom>
    <Summarize v-else :data='SummaryList'></Summarize>
    <bottomBtn v-if="$route.params.state===1 && !summarized" @finish='onfinish'></bottomBtn>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import Info from './detail/info'
import bottomBtn from './detail/bottom-btn'
import Attachment from './detail/attachment'
import TextareaCom from '@/components/commonCom/textareaCom'
import AttachmentCom from '@/components/commonCom/attachment'
import { UploadFileList } from '@/js/file-upload'
import Summarize from './detail/summarize'
export default {
  components: {
    Info,
    Attachment,
    TextareaCom,
    AttachmentCom,
    bottomBtn,
    Summarize
  },
  data () {
    return {
      info: {},
      attachment: [],
      textareaText: '',
      imgList: [],
      SummaryList: [],
      summarized: false
    }
  },
  watch: {

  },
  created () {
    document.body.style.overflowY = 'hidden'
    this.getData()
  },
  destroyed () {
    document.body.style.overflowY = ''
  },
  computed: {

  },
  methods: {
    onfinish () {
      let { content } = this
      if (!content) {
        this.$simpleMsg('请输入外出心得')
      }
      if (this.imgList.length === 0) { // 没有附件
        this.postSummarize().then(() => {
          this.$emit('finish')
        })
        return
      }
      this.isCommited = true
      UploadFileList(this.imgList).then((dataList) => {
        if (dataList.length !== 0) { // 图片上传成功
          this.attachmentList = dataList
          this.postSummarize()
        } else { // 图片上传失败
          this.$simpleMsg('图片上传失败，请重新提交')
          this.isCommited = false
        }
      })
    },
    getData () {
      this.$preloaderFull.show()
      return this.$axios.get(`/mobicampus/biztrip/v1/details/${this.$route.params.id}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          console.log('data', data)
          let d = data.result.data
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
          this.summarized = d.summarized === 'true'
          console.log('this.summarized', this.summarized)
          console.log('this.$route.params.state', this.$route.params.state)
        }
      })
    },
    postSummarize () {
      let d = {
        biztrip_id: this.$route.params.id,
        content: this.textareaText,
        attachment_list: this.attachmentList
      }
      this.$preloaderFull.show()
      return this.$axios.post(`/mobicampus/biztrip/v1/summarize`, d).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.$router.back()
          this.$simpleMsg('已提交')
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
