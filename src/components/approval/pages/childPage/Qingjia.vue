<template>
  <div class="qingjia page-bg">
    <FormCom>
      <cell button title="请假类型" :content="typeName" @action="()=>bottomOptionsShowA = 1"></cell>
      <cell button title="开始时间" :content="dateSelA" @action="()=>SlideSelectDateShowA = true"></cell>
      <cell button title="结束时间" :content="dateSelB" @action="()=>SlideSelectDateShowB = true"></cell>
      <cell text title="请假时长" :content="durationDay+'天 '"></cell>
    </FormCom>
    <!-- 理由 -->
    <TextareaCom placeholder="请输入请假理由" :content.sync='textareaText'></TextareaCom>
    <!-- 审批 -->
    <ApprovalProcess-com :needArrow="true" :needDelBtn="canChangeProcess" :needAddBtn="canChangeProcess" @selectDirector="onSelectDirector" :approvalPersonArr="approvalPersonArr" @addPerson="showMemberSelect" @memberAction="onMemberAction"></ApprovalProcess-com>
    <!-- 抄送 -->
    <!-- <ApprovalProcess-com :needArrow="false" :needDelBtn="canChangeCcpeople" :needAddBtn="canChangeCcpeople" :title="'抄送人'" v-if="false" :approvalPersonArr="ccPersonArr" @addPerson="showMemberSelectB"></ApprovalProcess-com> -->
    <!-- 附件 -->
    <attachmentCom :imgList="imgList"></attachmentCom>
    <!-- 确定 -->
    <CommitBtnCom @action="commitBtnAction"></CommitBtnCom>

    <SlideSelectDate :show.sync="SlideSelectDateShowA" :value.sync="dateSelA" :maxValue="dateSelB" @error="timeError('开始时间不能晚于结束时间')"></SlideSelectDate>
    <SlideSelectDate :show.sync="SlideSelectDateShowB" :value.sync="dateSelB" :minValue="dateSelA" @error="timeError('结束时间不能早于开始时间')"></SlideSelectDate>
    <!-- 选择审批成员 -->
    <MemberSelect ref="vMemberSelect"></MemberSelect>
    <!-- 底部选择(请假类型) -->
    <BottomOptions :show.sync="bottomOptionsShowA">
      <ul>
        <li @click="LeaveTypeAction(item)" v-for="(item, index) in leaveTypeList" :key="index">{{item.name}}</li>
      </ul>
    </BottomOptions>

  </div>
</template>

<script>
import { getApproveConf } from '@/components/approval/approvalStatic/js/commonServer.js'
import SlideSelectDate from '@/modules/slide-select/date/SlideSelectDateAndAMPM.vue'
import MemberSelect from '@/modules/member-select2'
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
import TextareaCom from '@/components/commonCom/textareaCom'
import ApprovalProcessCom from '@/components/commonCom/approvalProcess.vue'
import AttachmentCom from '@/components/commonCom/attachment'
import BottomOptions from '@/modules/bottom-options/BottomOptions'
import { UploadFileList } from '@/js/file-upload'
export default {
  components: {
    CommitBtnCom,
    ApprovalProcessCom,
    AttachmentCom,
    SlideSelectDate,
    BottomOptions,
    MemberSelect,
    TextareaCom,
    Cell,
    FormCom
  },
  data () {
    return {
      isXiLi: '',
      isCommited: false,
      curUserId: '',
      durationNum: '',
      approvalPersonArr: [],
      canChangeProcess: true,
      canChangeCcpeople: true,
      ccPersonArr: [],
      // attachmentArr: [],
      // typeItemShow: false,
      leaveTypeList: [],
      SlideSelectDateShowA: false,
      SlideSelectDateShowB: false,
      // 请假类型
      typeId: '',
      typeName: '',
      // 开始时间
      dateSelA: '',
      // 结束时间
      dateSelB: '',
      textareaText: '',
      type: -1,
      // 附件
      imgList: [],
      fileList: [],
      attachmentList: [],
      isLoaded: false,
      // 底部选项(请假类型)
      bottomOptionsShowA: 0
      // 底部选项(附件)
      // bottomOptionsShowB: 0
    }
  },
  computed: {
    durationDay: function () {
      return this.durationNum / 8
    }
  },
  watch: {
    'typeId': function () {
      if (this.typeId && this.durationNum) {
        this.getConf()
      }
    },
    'durationNum': function () {
      if (this.typeId && this.durationNum) {
        this.getConf()
      }
    },
    'dateSelA': function () {
      if (this.dateSelA && this.dateSelB) {
        let dateSelAArr = this.dateSelA.split('  ')
        let dateSelBArr = this.dateSelB.split('  ')
        let startTimeMs = new Date(dateSelAArr[0].replace(/(-)/g, '/')).getTime()
        let endTimeMs = new Date(dateSelBArr[0].replace(/(-)/g, '/')).getTime()
        let days = (endTimeMs - startTimeMs) / 1000 / 60 / 60 / 24
        let hoursA = dateSelAArr[1] === '上午' ? 8 : 4
        let hoursB = dateSelBArr[1] === '上午' ? 4 : 8
        this.durationNum = (days - 1) * 8 + hoursA + hoursB
      }
    },
    'dateSelB': function () {
      if (this.dateSelA && this.dateSelB) {
        let dateSelAArr = this.dateSelA.split('  ')
        let dateSelBArr = this.dateSelB.split('  ')
        let startTimeMs = new Date(dateSelAArr[0].replace(/(-)/g, '/')).getTime()
        let endTimeMs = new Date(dateSelBArr[0].replace(/(-)/g, '/')).getTime()
        let days = (endTimeMs - startTimeMs) / 1000 / 60 / 60 / 24
        let hoursA = dateSelAArr[1] === '上午' ? 8 : 4
        let hoursB = dateSelBArr[1] === '上午' ? 4 : 8
        this.durationNum = (days - 1) * 8 + hoursA + hoursB
      }
    }
  },
  created () {
    this.getCurrUserInfo()
    this.getLeaveType().then((typeArr) => {
      this.leaveTypeList = typeArr
    })
    if (this.$route.params.id && this.$route.params.id !== '0') {
      this.getApplicationDetails()
    }
  },
  methods: {
    getCurrUserInfo () {
      return this.$axios.get(`/schoolorg/v1/getCurrUserInfo`).then(({ data }) => {
        if (data.status === 200) {
          // console.log('if-data', data)
          let userInfo = data.result.data
          this.isXiLi = userInfo.campus_id === '4892271197889314468'
          return userInfo
        } else {

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
    // 初始审批成员选择
    showMemberSelect () {
      this.$refs.vMemberSelect.show({
        // 类型：单选(single)(默认)、多选(multiple)
        // type: 'single',
        // 已选项。初始选中。直接把确认拿到的数据丢过来即可
        selectedData: {},
        // 确认事件
        onConfirm: selectedData => {
          if (selectedData.memberList.length === 0) return
          let len = this.approvalPersonArr.length
          if (len && this.approvalPersonArr[len - 1].user_id === selectedData.memberList[0].user_id) {
            this.$simpleMsg('该成员与上级重复')
            return false
          }
          this.approvalPersonArr.push(selectedData.memberList[0])
          // 进行是否关闭判断
          // return false // 阻止自动关闭
        }
      })
    },
    // 初始抄送人成员选择
    // showMemberSelectB () {
    //   this.$refs.vMemberSelect.show({
    //     // 类型：单选(single)(默认)、多选(multiple)
    //     type: 'multiple',
    //     // 已选项。初始选中。直接把确认拿到的数据丢过来即可
    //     selectedData: this.selectedData,
    //     // 确认事件
    //     onConfirm: selectedData => {
    //       this.selectedData = selectedData
    //       this.ccPersonArr = selectedData.memberListSubmit
    //     }
    //   })
    // },
    timeError (params) {
      this.$simpleMsg(params)
    },
    // 选择请假类型
    LeaveTypeAction (typeObj) {
      this.typeId = typeObj.id
      this.typeName = typeObj.name
      this.bottomOptionsShowA = false
    },
    // 请求数据 并 初始化data数据
    getApplicationDetails () {
      this.$axios.get(`/mobicampus/approve/v1/getApplicationDetails/` + this.$route.params.id).then(({ data }) => {
        // console.log('初始化data', data)
        // let msg = '成功'
        let dataObject = data.result.data
        if (data.status === 200) {
          let { resource, process, application } = dataObject
          this.formArr = []
          // 初始化当前用户ID
          this.curUserId = application.create_user_id
          let startTime = resource.start_time.split('+')[0].split('T')
          let endTime = resource.end_time.split('+')[0].split('T')
          // 小时转天数
          startTime[1] = startTime[1] === '07:50:00' ? '上午' : '下午'
          endTime[1] = endTime[1] === '12:00:00' ? '上午' : '下午'
          this.typeName = resource.type_name
          this.typeId = resource.type_id
          this.dateSelA = startTime[0] + '  ' + startTime[1]
          this.dateSelB = endTime[0] + '  ' + endTime[1]
          this.textareaText = resource.reason
          // 审批人
          process.node_list.map((item, index) => {
            let obj = {
              user_name: item.user_name,
              user_id: item.user_id
            }
            // 用户撤销后 重新申请 审批人中过滤本人
            if (index === 0 && parseInt(item.user_id) === parseInt(this.curUserId)) return
            this.approvalPersonArr.push(obj)
          })
          // 附件
          this.attachmentList = resource.attachment_list
          resource.attachment_list.map(item => {
            this.imgList.push(item.src)
          })
          console.log('this.imgList', this.imgList)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取--请假审批模板
    getConf () {
      console.log('获取--请假审批模板')
      getApproveConf.call(this, `/mobicampus/leave/v1/getMatchedApproveConf?leave_type_id=${this.typeId}&duration=${this.durationNum}`)
        .then(data => {
          this.canChangeProcess = data.canChangeProcess
          this.approvalPersonArr = data.approvalPersonArr
          this.canChangeCcpeople = data.canChangeCcpeople
          this.ccPersonArr = data.ccPersonArr
          // this.selectedData.memberList = this.ccPersonArr
        })
    },
    // 获取--请假类型
    getLeaveType () {
      return this.$axios.get('/mobicampus/leave/v1/getTypeListBySchool').then(({ data }) => {
        if (data.status === 200) {
          let typeList = data.result.data
          // console.log(typeList)
          return typeList
        }
      })
    },
    // 提交--数据
    postNewApplication () {
      this.isCommited = true
      let { typeId, typeName, dateSelA, dateSelB, textareaText, approvalPersonArr, durationNum } = this
      let nodeList = []
      approvalPersonArr.map((item) => {
        let obj = {
          user_id: item.user_id,
          user_name: item.user_name
        }
        nodeList.push(obj)
      })
      let startTime = dateSelA.split('  ')[0] + '  ' + (dateSelA.split('  ')[1] === '上午' ? '07:50:00' : '14:00:00')
      let endTime = dateSelB.split('  ')[0] + '  ' + (dateSelB.split('  ')[1] === '上午' ? '12:00:00' : '17:00:00')
      let data = {
        leave: {
          type_id: parseInt(typeId),
          type_name: typeName,
          start_time: startTime,
          end_time: endTime,
          duration: parseInt(durationNum),
          reason: textareaText,
          attachment_list: this.attachmentList
        },
        node_list: nodeList
      }
      this.$axios.post('/mobicampus/leave/v1/newApplication', data).then(({ data }) => {
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
    // 提交申请
    commitBtnAction () {
      if (this.isCommited) return
      let { typeName, dateSelA, dateSelB, textareaText, approvalPersonArr } = this
      if (!typeName) {
        this.$simpleMsg('请选择请假类型')
        return false
      }
      if (!dateSelA) {
        this.$simpleMsg('请选择开始时间')
        return false
      }
      if (!dateSelB) {
        this.$simpleMsg('请选择结束时间')
        return false
      }
      if (!textareaText) {
        this.$simpleMsg('请输入请假理由')
        return false
      }
      if (!approvalPersonArr.length) {
        this.$simpleMsg('请选择审批人')
        return false
      }
      if (this.imgList.length === 0) { // 没有附件
        this.postNewApplication()
        return
      }
      this.isCommited = true
      UploadFileList(this.imgList).then((dataList) => {
        if (dataList.length !== 0) { // 图片上传成功
          this.attachmentList = dataList
          this.postNewApplication()
        } else { // 图片上传失败
          this.$simpleMsg('图片上传失败，请重新提交')
          this.isCommited = false
        }
      })
    }
  }
}
</script>

<style scoped>
.qingjia {
  padding-top: 12px;
}
.typeContent-box {
  margin: 0px 10px 0;
  border-radius: 8px;
  background-color: #fff;
  transform: translate(0, 0);
}
.typeContent-box .row {
  height: 54px;
  line-height: 52px;
  padding: 0 10px 0 19px;
}
.typeContent-box .row.duration-box {
  border-bottom: none;
}
.typeContent-box .row .left {
  float: left;
  color: #666;
  font-size: 17px;
  font-weight: bold;
}
.typeContent-box .row .right {
  float: right;
  color: #ccc;
  font-size: 14px;
}
.typeContent-box .row .right.active {
  color: #333;
}
.typeContent-box .row .duration-right.right {
  padding-right: 20px;
}
.typeContent-box .row .right .iconfont-approval {
  color: #b3b3b3;
  font-size: 17px;
}
/* .reasonContent-box {
  height: 123px;
  margin: 0px 10px;
  border-radius: 9px;
  background-color: #fff;
  margin-top: 12px;
  padding: 13px 15px;
}
.reasonContent-box > textarea {
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  outline: none;
} */
.type-box .type-right {
  position: relative;
}
.commitBtn-box {
  box-shadow: 1PX 2px 19px 0px rgba(6, 48, 88, 0.13);
  height: 50px;
  margin: 30px 10px 50px;
  background-color: #53a2ed;
  color: #fff;
  line-height: 50px;
  font-size: 16px;
  border-radius: 9px;
  text-align: center;
}
.type-box .type-right .typeList {
  position: absolute;
  right: 0;
  top: 54px;
  z-index: 9;
}
.type-box .type-right .typeList > .typeItem {
  width: 65px;
  background-color: #eee;
  color: #666;
  height: 45px;
  line-height: 45px;
  text-align: center;
  box-sizing: border-box;
  border-bottom: 1PX solid #ccc;
}
#durationIpt {
  outline: none;
  height: 32px;
  border: none;
  text-align: right;
}
#durationIpt::placeholder,
textarea::placeholder {
  color: #ccc;
}
</style>
