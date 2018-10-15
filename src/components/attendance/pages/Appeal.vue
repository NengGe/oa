<template>
  <div class="appeal page-bg">
    <div class="fixedTop-box" v-show="isShowInfo">
      <span class="content">{{abnormalText}}</span>
      <span class="closeBtn" @click="()=>isShowInfo=false">×</span>
    </div>
    <FormCom>
      <cell button title="修正时间" :content="dateSel" @action="SelectehourAndMin"></cell>
    </FormCom>
    <!-- 理由 -->
    <TextareaCom placeholder="请输入申述理由" :content.sync='textareaText'></TextareaCom>
    <!-- 审批 -->
    <ApprovalProcessCom v-if="false" :needArrow="true" :needDelBtn="canChangeProcess" :needAddBtn="canChangeProcess" @addPerson="onMemberSelect" :approvalPersonArr="approvalPersonArr" @memberAction="onMemberAction" @selectDirector="onSelectDirector"></ApprovalProcessCom>
    <!-- 附件 -->
    <!-- <attachmentCom :imgList="imgList"></attachmentCom> -->
    <!-- 确定按钮 -->
    <CommitBtnCom @action="commitBtnAction" content="确定申诉" :needPosition="true"></CommitBtnCom>
    <SelectehourAndMin ref="vSelectehourAndMin"></SelectehourAndMin>
    <!-- 选择审批成员 -->
    <MemberSelect ref="vMemberSelect"></MemberSelect>
  </div>
</template>

<script>
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
import TextareaCom from '@/components/commonCom/textareaCom'
import { getApproveConf } from '@/components/approval/approvalStatic/js/commonServer.js'
import MemberSelect from '@/modules/member-select2'
import attachmentCom from '@/components/commonCom/attachment'
import ApprovalProcessCom from '@/components/commonCom/approvalProcess.vue'
import SelectehourAndMin from './Appeal/SelectehourAndMin'
import { UploadFileList } from '@/js/file-upload'
// import { getCurrUserInfo } from '@/js/commonServer.js'
export default {
  components: {
    attachmentCom,
    SelectehourAndMin,
    ApprovalProcessCom,
    MemberSelect,
    TextareaCom,
    CommitBtnCom,
    Cell,
    FormCom
  },
  data () {
    return {
      canChangeProcess: true,
      canChangeCcpeople: true,
      isXiLi: '',
      isFromClockHistory: false,
      stateArr: ['', '迟到', '早退', '正常', '异常', '缺卡'],
      abnormalText: '',
      isCommited: false,
      textareaText: '',
      // 附件
      imgList: [],
      attachmentList: [],
      isShowInfo: true,
      dateSel: '',
      approvalPersonArr: []
    }
  },
  // components: {
  //   ApprovalProcessCom
  // },
  created () {
    this.abnormalText = `异常情况：${this.stateArr[this.$route.query.type]}`
    this.dateSel = this.$route.query.time_to_clock
    this.getConf()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.isFromClockHistory = from.name === 'clockHistory'
    })
  },
  methods: {
    getConf () {
      // getApproveConf.call(this, `/mobicampus/attend/v1/getMatchedApproveConf`)
      getApproveConf.call(this, `/mobicampus/attend/v1/getMatchedAppealApproveConf`)
        .then(data => {
          this.canChangeProcess = data.canChangeProcess
          this.approvalPersonArr = data.approvalPersonArr
          this.canChangeCcpeople = data.canChangeCcpeople
          this.ccPersonArr = data.ccPersonArr
          // this.selectedData.memberList = this.ccPersonArr
        })
    },
    // 成员替换
    onMemberAction (item) {
      this.$refs.vMemberSelect.show({
        onConfirm: (selectedData) => {
          if (selectedData.memberList.length === 0) return
          item.user_name = selectedData.memberList[0].user_name
          item.user_id = selectedData.memberList[0].user_id
        }
      })
    },
    // 选择主管
    onSelectDirector (item) {
      console.log('选择主管', item)
      this.$refs.vMemberSelect.show({
        staticData: item.leader_list,
        onConfirm: (selectedData) => {
          if (selectedData.memberList.length === 0) return
          item.user_name = selectedData.memberList[0].user_name
          item.user_id = selectedData.memberList[0].user_id
        }
      })
    },
    // 添加审批人
    onMemberSelect () {
      this.$refs.vMemberSelect.show({
        type: 'single',
        // 确认事件
        onConfirm: selectedData => {
          console.log('selectedData', selectedData)
          if (selectedData.memberList.length === 0) return
          let len = this.approvalPersonArr.length
          if (len && this.approvalPersonArr[len - 1].user_id === selectedData.memberList[0].user_id) {
            this.$simpleMsg('该成员与上级重复')
            this.member = true
            return false
          }
          this.approvalPersonArr.push(selectedData.memberList[0])
          // 进行是否关闭判断
          // return false // 阻止自动关闭
        }
      })
    },
    SelectehourAndMin () {
      this.$refs.vSelectehourAndMin.show({
        initTime: this.dateSel,
        onConfirm: (dateSel) => {
          this.dateSel = dateSel
        }
      })
    },
    onSelectTimeConfirm (dateSel) {
      console.log('onSelectTimeConfirm')
      this.dateSel = dateSel
      this.isShowSelectTime = false
    },
    // 提交申请
    commitBtnAction () {
      // console.log(111)
      if (this.isCommited) return
      this.isCommited = true
      let { textareaText } = this
      if (!textareaText) {
        this.$simpleMsg('请输入申述理由')
        return false
      }
      if (this.imgList.length === 0) { // 没有附件
        this.postNewAppealApplication()
        return
      }
      UploadFileList(this.imgList).then((dataList) => {
        if (dataList.length !== 0) { // 图片上传成功
          this.attachmentList = dataList
          this.postNewAppealApplication()
        } else { // 图片上传失败
          this.$simpleMsg('图片上传失败，请重新提交')
          this.isCommited = false
        }
      })
    },
    postNewAppealApplication () {
      console.log('提交数据')
      let query = this.$route.query
      let clockingAppeal = {
        schedule_id: parseInt(query.schedule_id),
        clocking_id: parseInt(query.clocking_id),
        date_to_clock: query.date_to_clock,
        time_to_clock: query.time_to_clock,
        type: parseInt(query.type),
        old_clock_time: query.old_clock_time || query.time_to_clock,
        new_clock_time: this.dateSel,
        reason: this.textareaText
      }
      let data = {
        clocking_appeal: clockingAppeal,
        node_list: this.approvalPersonArr
      }
      this.$preloaderFull.show()
      this.$axios.post('/mobicampus/attend/v1/newAppealApplication', data).then(({ data }) => {
        if (data.status === 200) {
          // console.log('if-data', data)
          if (this.isFromClockHistory) {
            this.$router.back()
          } else {
            setTimeout(() => {
              window.oa.ReturnHome()
            }, 800)
          }
          // this.$router.back()
          this.$simpleMsg('申诉已提交')
        } else {
          this.isCommited = false
          console.log('else-data', data)
        }
      }).catch(error => {
        console.log(error)
      }).then(() => {
        this.$preloaderFull.close()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.appeal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
.fixedTop-box {
  box-sizing: border-box;
  width: 100%;
  background-color: #f8c259;
  font-size: 14px;
  color: #fff;
  line-height: 40px;
  padding: 0 15px;
  display: flex;
  .content {
    flex: 1;
  }
  .closeBtn {
    font-size: 20px;
  }
}
</style>
