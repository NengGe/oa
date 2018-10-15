<template>
  <div class="finish page-fixed page-bg">
    <!-- 理由 -->
    <TextareaCom placeholder='请说明完成情况' :content.sync='textareaText'></TextareaCom>
    <!-- 附件 -->
    <attachmentCom :imgList='imgList'></attachmentCom>
    <!-- 确定按钮 -->
    <CommitBtnCom content='完成' @action='commitBtnAction' :needPosition="true"></CommitBtnCom>
  </div>
</template>

<script>
import TextareaCom from '@/components/commonCom/textareaCom'
import AttachmentCom from '@/components/commonCom/attachment'
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
import VTransition from '@/modules/v-transition/'
import { UploadFileList } from '@/js/file-upload'
export default {
  components: {
    VTransition,
    TextareaCom,
    AttachmentCom,
    CommitBtnCom
  },
  props: {
    currExeId: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      textareaText: '',
      imgList: []
    }
  },
  methods: {
    commitBtnAction () {
      // this.$emit('update:show', false)
      let { textareaText } = this
      if (!textareaText) {
        this.$simpleMsg('请说明完成情况')
        return
      }
      if (this.imgList.length === 0) { // 没有附件
        this.postData()
        return
      }
      this.$preloaderFull.show()
      UploadFileList(this.imgList).then((dataList) => {
        this.$preloaderFull.close()
        if (dataList.length !== 0) { // 图片上传成功
          this.attachmentList = dataList
          this.postData()
        } else { // 图片上传失败
          this.$simpleMsg('图片上传失败，请重新提交')
        }
      })
    },
    postData () {
      let { textareaText, attachmentList } = this
      let data = {
        task_id: this.$route.params.id,
        task_exe_id: this.$route.params.currExeId,
        desc: textareaText,
        attachment_list: attachmentList
      }
      this.$preloaderFull.show()
      return this.$axios.post(`/mobicampus/task/v1/finish`, data).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          // console.log('if-完成', data)
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style scoped>
</style>

