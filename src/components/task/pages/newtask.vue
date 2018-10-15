<template>
  <div class='newtask'>
    <!-- 理由 -->
    <TextareaCom placeholder='请输入任务内容' :content.sync='textareaText'></TextareaCom>
    <!-- 附件 -->
    <attachmentCom :imgList='imgList'></attachmentCom>
    <!-- 执行人 -->
    <ccPersonCom title='执行人' :ccPersonArr='transactorArr' @addPerson='onMemberSelectTR'></ccPersonCom>
    <!-- 抄送 -->
    <ccPersonCom :ccPersonArr='ccPersonArr' @addPerson='onMemberSelectCC'></ccPersonCom>
    <FormCom class='form'>
      <cell button title='结束时间' :content='dateStr' @action='()=>isShowSelectDate = true'></cell>
    </FormCom>
    <!-- 确定按钮 -->
    <CommitBtnCom @action='commitBtnAction'></CommitBtnCom>
    <!-- 选择审批成员 -->
    <MemberSelect ref='vMemberSelect'></MemberSelect>
    <!-- 时间选择器 -->
    <SlideSelectDateAndTime :show.sync='isShowSelectDate' :value.sync='dateStr'></SlideSelectDateAndTime>

  </div>
</template>

<script>
/* eslint-disable camelcase */
import SlideSelectDateAndTime from '@/modules/slide-select/date/SlideSelectDateAndTime2'
import AttachmentCom from '@/components/commonCom/attachment'
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
import FormCom from '@/components/commonCom/formCom'
import Cell from '@/components/commonCom/cell'
import TextareaCom from '@/components/commonCom/textareaCom'
import ccPersonCom from '@/components/commonCom/ccPersonCom'
import MemberSelect from '@/modules/member-select2'
import { UploadFileList } from '@/js/file-upload'
export default {
  components: {
    SlideSelectDateAndTime,
    FormCom,
    Cell,
    TextareaCom,
    ccPersonCom,
    CommitBtnCom,
    MemberSelect,
    AttachmentCom
  },
  data () {
    return {
      isWork: false,
      isEdit: this.$route.name === 'edittask',
      isNewChildTask: this.$route.name === 'newchildtask',
      selectedDataTR: { // 执行人
        memberList: [], // 成员列表(部门没被选中)
        deptList: [], // 部门列表
        memberListSubmit: [] // 需要提交的成员列表
      },
      selectedDataCC: { // 抄送人
        memberList: [], // 成员列表(部门没被选中)
        deptList: [], // 部门列表
        memberListSubmit: [] // 需要提交的成员列表
      },
      isShowSelectDate: false,
      dateStr: '',
      textareaText: '',
      imgList: [],
      transactorArr: [], // 执行人
      ccPersonArr: [] // 抄送人
    }
  },
  created () {
    if (this.isEdit) {
      this.getDate()
    }
    if (this.$route.query.isWork) {
      this.isWork = true
    }
  },
  methods: {
    onMemberSelectTR () {
      this.$refs.vMemberSelect.show({
        // 类型：单选(single)(默认)、多选(multiple)
        type: 'multiple',
        // 已选项。初始选中。直接把确认拿到的数据丢过来即可
        selectedData: this.selectedDataTR,
        // 确认事件
        onConfirm: selectedData => {
          this.selectedDataTR = selectedData
          this.transactorArr = selectedData.memberListSubmit
        }
      })
    },
    onMemberSelectCC () {
      this.$refs.vMemberSelect.show({
        // 类型：单选(single)(默认)、多选(multiple)
        type: 'multiple',
        // 已选项。初始选中。直接把确认拿到的数据丢过来即可
        selectedData: this.selectedDataCC,
        // 确认事件
        onConfirm: selectedData => {
          this.selectedDataCC = selectedData
          this.ccPersonArr = selectedData.memberListSubmit
        }
      })
    },
    commitBtnAction () {
      // this.$preloaderFull.show()
      console.log('确定')
      let { textareaText, dateStr, transactorArr } = this
      if (!textareaText) {
        this.$simpleMsg('请输入任务内容')
        return
      }
      if (transactorArr.length === 0) {
        this.$simpleMsg('请选择执行人')
        return
      }
      if (!dateStr) {
        this.$simpleMsg('请选择结束时间')
        return
      }

      if (this.imgList.length === 0) { // 没有附件
        this.postTask()
        return
      }
      this.$preloaderFull.show()
      UploadFileList(this.imgList).then((dataList) => {
        this.$preloaderFull.close()
        if (dataList.length !== 0) { // 图片上传成功
          this.attachmentList = dataList
          console.log(222)
          this.postTask()
        } else { // 图片上传失败
          this.$simpleMsg('图片上传失败，请重新提交')
        }
      })
    },
    postTask () { // 提交数据
      let { textareaText, dateStr, transactorArr, ccPersonArr, isWork } = this
      let data = {
        task: {
          desc: textareaText,
          expect_complete_time: dateStr,
          dept_id: '123',
          dept_name: '321',
          attachment_list: this.attachmentList
        },
        exe_list: transactorArr,
        cc_people: ccPersonArr,
        work: isWork
      }
      let apiStr = `/mobicampus/task/v1/new`
      if (this.isEdit) { // 编辑
        data.task.id = this.$route.params.id
        apiStr = `/mobicampus/task/v1/update`
      }
      this.isNewChildTask && (data.task.parent_task_id = this.$route.params.id) // 新建子任务
      this.$preloaderFull.show()
      return this.$axios.post(apiStr, data).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          if (this.isNewChildTask) {
            this.$router.back()
          } else {
            this.$router.replace({ name: 'sponsor' })
          }
          this.$simpleMsg('已提交')
        } else {
          this.$simpleMsg(data.message)
        }
      })
    },
    getDate () {
      console.log('执行getDate')
      this.$preloaderFull.show()
      return this.$axios.get(`/mobicampus/task/v1/details/${this.$route.params.id}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          let { task, exe_list, cc_people } = data.result.data
          this.textareaText = task.desc
          this.attachmentList = task.attachment_list
          this.imgList = task.attachment_list.map(item => {
            return item.src
          })

          this.transactorArr = exe_list.map(item => {
            return {
              user_name: item.user_name,
              user_id: item.user_id
            }
          })
          this.selectedDataTR.memberList = this.transactorArr // 初始化选中状态
          this.ccPersonArr = cc_people.map(item => {
            return {
              user_name: item.user_name,
              user_id: item.user_id
            }
          })
          this.selectedDataCC.memberList = this.ccPersonArr // 初始化选中状态
          this.dateStr = this.$getTimeStr(task.expect_complete_time, 'yy-mm-dd hh:mm', false)
        }
      })
    }
  }
}
</script>

<style scoped>
.form {
  margin-top: 12px;
}
</style>
