<template>
  <div class="yongche  page-bg">
    <FormCom>
      <cell input type='number' title="经费金额" :content.sync="amount" placeholder='填写金额(元)'>
        <!-- <span slot="right">(元) </span> -->
      </cell>
      <cell button title='经费类型' :content="typeName" @action="bottomOptionsShow = 1"></cell>
    </FormCom>
    <!-- 理由 -->
    <TextareaCom placeholder="请输入经费用途" :content.sync='textareaText'></TextareaCom>
    <!-- 审批 -->
    <ApprovalProcess-com :needDelBtn="canChangeProcess" :needAddBtn="canChangeProcess" :needArrow="true" @addPerson="onMemberSelect" :approvalPersonArr="approvalPersonArr" @memberAction="onMemberAction" @selectDirector="onSelectDirector"></ApprovalProcess-com>
    <!-- 抄送 -->
    <ccPersonCom :ccPersonArr="ccPersonArr" @addPerson="onMemberSelectB"></ccPersonCom>
    <!-- 抄送 -->
    <!-- <ApprovalProcessCom   :needArrow="false" title="抄送人"  @addPerson='onMemberSelectB' :deptList="selectedData.deptList"
                          :approvalPersonArr="selectedData.memberList"></ApprovalProcessCom> -->
    <!-- 附件 -->
    <attachmentCom :imgList="imgList"></attachmentCom>
    <!-- 确定按钮 -->
    <CommitBtnCom @action="commitBtnAction"></CommitBtnCom>
    <!-- 选择审批成员 -->
    <MemberSelect ref="vMemberSelect"></MemberSelect>
    <!-- 选择经费类型 -->
    <BottomOptions :show.sync="bottomOptionsShow">
      <ul>
        <li @click="bottomOptionsAction(item)" v-for="(item, index) in jfTypeList" :key="index">{{item.name}}</li>
      </ul>
    </BottomOptions>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
import TextareaCom from '@/components/commonCom/textareaCom'
import { getApproveConf } from '@/components/approval/approvalStatic/js/commonServer.js'
import MemberSelect from '@/modules/member-select2'
import SlideSelectDate from '@/modules/slide-select/date/SlideSelectDateAndAMPM.vue'
import ApprovalProcessCom from '@/components/commonCom/approvalProcess.vue'
import ccPersonCom from '@/components/commonCom/ccPersonCom'
import AttachmentCom from '@/components/commonCom/attachment'
import BottomOptions from '@/modules/bottom-options/BottomOptions'
import { UploadFileList } from '@/js/file-upload'
export default {
  components: {
    CommitBtnCom,
    MemberSelect,
    SlideSelectDate,
    ApprovalProcessCom,
    ccPersonCom,
    AttachmentCom,
    BottomOptions,
    TextareaCom,
    Cell,
    FormCom
  },
  data () {
    return {
      amount: '',
      typeId: '',
      typeName: '',
      isCommited: false,
      selectedData: {
        memberList: [], // 成员列表(部门没被选中)
        deptList: [], // 部门列表
        memberListSubmit: [] // 需要提交的成员列表
      },
      canChangeProcess: true,
      canChangeCcpeople: true,
      jfTypeList: [], // 类型列表
      imgList: [],
      fileList: [],
      attachmentList: [],
      approvalPersonArr: [],
      ccPersonArr: [],
      textareaText: '',
      bottomOptionsShow: false
    }
  },
  watch: {
    'typeId': function () {
      this.getConf()
    }
  },
  created () {
    this.getAllFundTypeListByCampus().then(list => {
      this.jfTypeList = list
    })
    if (this.$route.params.id && this.$route.params.id !== '0') {
      this.getApplicationDetails()
    }
  },
  methods: {
    // 模板
    getConf () {
      getApproveConf.call(this, `/mobicampus/fund/v1/getMatchedApproveConf/${3}`)
        .then(data => {
          this.canChangeProcess = data.canChangeProcess
          this.approvalPersonArr = data.approvalPersonArr
          this.ccPersonArr = data.ccPersonArr
          this.selectedData.memberList = this.ccPersonArr
        })
    },
    // 选择请假类型
    bottomOptionsAction (typeObj) {
      this.typeId = typeObj.id
      this.typeName = typeObj.name
      this.bottomOptionsShow = false
    },
    // 选择主管
    onSelectDirector (item) {
      this.$refs.vMemberSelect.show({
        staticData: item.leader_list,
        onConfirm: (selectedData) => {
          if (selectedData.memberList.length === 0) return
          item.user_name = selectedData.memberList[0].user_name
          item.user_id = selectedData.memberList[0].user_id
        }
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
    // 添加抄送人
    onMemberSelectB (memberArr) {
      console.log('this.ccPersonArr', this.ccPersonArr)
      this.$refs.vMemberSelect.show({
        // 类型：单选(single)(默认)、多选(multiple)
        type: 'multiple',
        // 已选项。初始选中。直接把确认拿到的数据丢过来即可
        selectedData: this.selectedData,
        // 确认事件
        onConfirm: selectedData => {
          this.selectedData = selectedData
          this.ccPersonArr = selectedData.memberListSubmit
        }
      })
    },
    // 提交按钮
    commitBtnAction () {
      if (this.isCommited) return 0
      let { amount, typeName, textareaText, approvalPersonArr } = this
      if (!amount) {
        this.$simpleMsg('请输入经费金额')
        return false
      }
      if (!typeName) {
        this.$simpleMsg('请选择经费类型')
        return false
      }
      if (!textareaText) {
        this.$simpleMsg('请输入经费用途')
        return false
      }
      if (!approvalPersonArr.length) {
        this.$simpleMsg('请选择审批人')
        return false
      }
      this.isCommited = true
      if (this.imgList.length === 0) { // 没有附件
        this.postData()
        return
      }
      UploadFileList(this.imgList).then((dataList) => {
        if (dataList.length !== 0) { // 图片上传成功
          this.attachmentList = dataList
          this.postData()
        } else { // 图片上传失败
          this.$simpleMsg('图片上传失败，请重新提交')
          this.isCommited = false
        }
      })
    },
    // 提交数据
    postData () {
      let data = {
        fund: {
          type_id: this.typeId,
          type_name: this.typeName,
          amount: this.amount,
          desc: this.textareaText,
          attachment_list: this.attachmentList
        },
        node_list: this.approvalPersonArr,
        cc_people: this.ccPersonArr
      }
      this.$preloaderFull.show()
      this.$axios.post('/mobicampus/fund/v1/createApplication', data).then(({ data }) => {
        this.isCommited = false
        this.$preloaderFull.close()
        console.log('data', data)
        if (data.status === 200) {
          this.$router.replace({ name: 'commitCom' })
        } else {
          this.isCommited = false
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getAllFundTypeListByCampus () {
      return this.$axios.get('/mobicampus/fund/v1/getTypeListBySchool').then(({ data }) => {
        if (data.status === 200) {
          let list = data.result.data
          return list
        }
      })
    },
    // 获取--详情数据（重新提交）
    getApplicationDetails () {
      this.$axios.get(`/mobicampus/approve/v1/getApplicationDetails/` + this.$route.params.id).then(({ data }) => {
        if (data.status === 200) {
          console.log('重新提交', data)
          let { resource, process, cc_people } = data.result.data
          console.log('resource', resource)
          this.amount = resource.amount
          this.typeName = resource.type_name
          this.typeId = resource.type_id
          this.textareaText = resource.desc
          if (process.node_list[0].state_processed === '4') { // 撤销后 重新申请 审批人中过滤本人
            process.node_list.shift()
          }
          this.approvalPersonArr = process.node_list.map(item => {
            return {
              user_name: item.user_name,
              user_id: item.user_id
            }
          })
          this.ccPersonArr = cc_people.map(item => {
            return {
              user_name: item.user_name,
              user_id: item.user_id
            }
          })
          this.attachmentList = resource.attachment_list
          this.imgList = resource.attachment_list.map(item => {
            return item.src
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.yongche {
  padding-top: 12px;
  padding-bottom: 36px;
}
</style>
