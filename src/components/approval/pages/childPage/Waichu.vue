<template>
  <div class="waichu  page-bg">
    <FormCom>
      <cell button title="外出类型" :content="typeName" @action="()=>bottomOptionsShow = true"></cell>
      <cell button title="开始时间" :content="dateSelA" @action="()=>SlideSelectDateShowA = true"></cell>
      <cell button title="结束时间" :content="dateSelB" @action="()=>SlideSelectDateShowB = true"></cell>
      <cell input title="目的地" :content.sync="site" placeholder='填写位置'></cell>
      <cell input type='number' title="预算金额" :content.sync="budget" placeholder='(元)'></cell>
    </FormCom>

    <!-- 同行人 -->
    <ccPersonCom title="同行人" :ccPersonArr="gotogetherUserList" @addPerson="onMemberSelectC"></ccPersonCom>
    <!-- 理由 -->
    <TextareaCom placeholder="请输入外出事由" :content.sync='textareaText'></TextareaCom>
    <!-- 审批 -->
    <ApprovalProcess-com :needArrow="true" :needDelBtn="canChangeProcess" :needAddBtn="canChangeProcess" @addPerson="onMemberSelect" :approvalPersonArr="approvalPersonArr" @memberAction="onMemberAction" @selectDirector="onSelectDirector"></ApprovalProcess-com>
    <!-- 抄送 -->
    <ccPersonCom :needDelBtn="canChangeCcpeople" :needAddBtn="canChangeCcpeople" :ccPersonArr="ccPersonArr" @addPerson="onMemberSelectB"></ccPersonCom>
    <!-- 抄送 -->
    <!-- <ApprovalProcessCom   :needArrow="false" title="抄送人"  @addPerson='onMemberSelectB' :deptList="selectedData.deptList"
                          :approvalPersonArr="selectedData.memberList"></ApprovalProcessCom> -->
    <!-- 附件 -->
    <AttachmentCom :imgList="imgList"></AttachmentCom>
    <!-- 确定按钮 -->
    <CommitBtnCom @action="commitBtnAction"></CommitBtnCom>
    <SlideSelectDate :show.sync="SlideSelectDateShowA" :value.sync="dateSelA" :maxValue="dateSelB" @error="timeError('开始时间不能晚于结束时间')"></SlideSelectDate>
    <SlideSelectDate :show.sync="SlideSelectDateShowB" :value.sync="dateSelB" :minValue="dateSelA" @error="timeError('结束时间不能早于开始时间')"></SlideSelectDate>
    <!-- 选择审批成员 -->
    <MemberSelect ref="vMemberSelect"></MemberSelect>
    <!-- 底部选择(外出类型) -->
    <BottomOptions :show.sync="bottomOptionsShow">
      <ul>
        <li @click="biztripTypeAction(item)" v-for="(item, index) in biztripTypeList" :key="index" :data-type="item.type">{{item.name}}</li>
      </ul>
    </BottomOptions>
    <!-- <BottomOptions :show.sync="bottomOptionsShowB">
      <ul class="bottomList">
        <li v-for="(item, i) in wayList" :key="'wayList'+i" @click="()=>onWaySelect(item)">{{item.text}}</li>
      </ul>
    </BottomOptions> -->
  </div>
</template>
<script>
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
import { getApproveConf } from '@/components/approval/approvalStatic/js/commonServer.js'
import MemberSelect from '@/modules/member-select2'
import SlideSelectDate from '@/modules/slide-select/date/SlideSelectDateAndAMPM.vue'
import ApprovalProcessCom from '@/components/commonCom/approvalProcess.vue'
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
import TextareaCom from '@/components/commonCom/textareaCom'
import ccPersonCom from '@/components/commonCom/ccPersonCom'
import AttachmentCom from '@/components/commonCom/attachment'
import BottomOptions from '@/modules/bottom-options/BottomOptions'
import { UploadFileList } from '@/js/file-upload'

export default {
  components: {
    CommitBtnCom,
    TextareaCom,
    ApprovalProcessCom,
    AttachmentCom,
    SlideSelectDate,
    BottomOptions,
    MemberSelect,
    ccPersonCom,
    FormCom,
    Cell
  },
  data () {
    return {
      budget: '',
      gotogetherUserList: [],
      selectedDataB: { // 同行人
        memberList: [], // 成员列表(部门没被选中)
        deptList: [], // 部门列表
        memberListSubmit: [] // 需要提交的成员列表
      },
      selectedData: { // 抄送人
        memberList: [], // 成员列表(部门没被选中)
        deptList: [], // 部门列表
        memberListSubmit: [] // 需要提交的成员列表
      },
      canChangeProcess: true,
      canChangeCcpeople: true,
      isCommited: false,
      userInfo: {},
      curUserId: '',
      memberSelectType: 'single',
      memberSelectSelected: null,
      member: 0,
      memberSelectTypeB: 'multiple',
      memberSelectSelectedB: [],
      memberB: 0,
      SlideSelectDateShowA: false,
      SlideSelectDateShowB: false,
      // 弹出选择外出类型
      bottomOptionsShow: false,
      bottomOptionsShowB: false,
      // 开始时间
      dateSelA: '',
      // 结束时间
      dateSelB: '',
      site: '',
      textareaText: '',
      // 审批人成员
      approvalPersonArr: [],
      // 抄送人成员
      ccPersonArr: [],
      // wayList: [{text: '相机', fn: openCameraPhoto}, {text: '相册', fn: dialogSelect}],
      // 附件
      imgList: [],
      fileList: [],
      attachmentList: [],
      biztripTypeList: [],
      typeId: '',
      typeName: ''
    }
  },
  watch: {
    // 'dateSelA': function () {
    //   if (this.dateSelA && this.dateSelB) {
    //   }
    // },
    // 'dateSelB': function () {
    //   if (this.dateSelA && this.dateSelB) {
    //   }
    // }
  },
  created () {
    // 获取当前用户信息
    this.getCurrUserInfo()
    // 获取外出类型
    this.getBiztripType().then((typeList) => {
      this.biztripTypeList = typeList
      if (this.$route.params.id && this.$route.params.id !== '0') { // 重新提交
        this.getApplicationDetails()
      }
    })
  },
  methods: {
    // 外出--模板
    getConf () {
      console.log('获取--请假审批模板')
      getApproveConf.call(this, `/mobicampus/biztrip/v1/getMatchedApproveConf/${this.typeId}`)
        .then(data => {
          this.canChangeProcess = data.canChangeProcess
          this.approvalPersonArr = data.approvalPersonArr
          this.canChangeCcpeople = data.canChangeCcpeople
          this.ccPersonArr = data.ccPersonArr
          this.selectedData.memberList = this.ccPersonArr
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
    getCurrUserInfo () {
      return this.$axios.get(`/schoolorg/v1/getCurrUserInfo`).then(({ data }) => {
        if (data.status === 200) {
          let userInfo = data.result.data
          this.userInfo = userInfo
        } else {

        }
      })
    },
    timeError (params) {
      this.$simpleMsg(params)
    },
    // 选择外出类型
    biztripTypeAction (typeObj) {
      this.typeId = typeObj.id
      this.typeName = typeObj.name
      this.bottomOptionsShow = false
      this.getConf() // 获取模板
    },
    // 点击添加审批人btn
    addPersonAction () {
      this.member = 1
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
    // 添加同行人
    onMemberSelectC (memberArr) {
      console.log('this.selectedData', this.selectedData)
      this.$refs.vMemberSelect.show({
        // 类型：单选(single)(默认)、多选(multiple)
        type: 'multiple',
        // 已选项。初始选中。直接把确认拿到的数据丢过来即可
        selectedData: this.selectedDataB,
        // 确认事件
        onConfirm: selectedData => {
          this.selectedDataB = selectedData
          this.gotogetherUserList = selectedData.memberListSubmit
        }
      })
    },
    // 添加抄送人
    onMemberSelectB (memberArr) {
      console.log('this.selectedData', this.selectedData)
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
    // 提交申请
    commitBtnAction () {
      if (this.isCommited) return 0
      this.isCommited = true
      let { typeName, dateSelA, dateSelB, textareaText, approvalPersonArr } = this
      if (!typeName) {
        this.$simpleMsg('请选择外出类型')
        this.isCommited = false
        return false
      }
      if (!dateSelA) {
        this.$simpleMsg('请选择开始时间')
        this.isCommited = false
        return false
      }
      if (!dateSelB) {
        this.$simpleMsg('请选择结束时间')
        this.isCommited = false
        return false
      }
      if (!textareaText) {
        this.$simpleMsg('请输入外出理由')
        this.isCommited = false
        return false
      }
      if (!approvalPersonArr.length) {
        this.$simpleMsg('请选择审批人')
        this.isCommited = false
        return false
      }
      if (this.imgList.length === 0) { // 没有附件
        this.postCreateApplication()
        return
      }
      // 上传图片
      UploadFileList(this.imgList).then((dataList) => {
        if (dataList.length !== 0) { // 图片上传成功
          this.attachmentList = dataList
          this.postCreateApplication()
        } else { // 图片上传失败
          this.$simpleMsg('图片上传失败，请重新提交')
          this.isCommited = false
        }
      })
    },
    // 提交数据
    postCreateApplication () {
      this.isCommited = true
      let { typeId, typeName, dateSelA, dateSelB, site, budget, textareaText } = this
      let startTime = dateSelA.split('  ')[0] + '  ' + (dateSelA.split('  ')[1] === '上午' ? '07:50:00' : '14:00:00')
      let endTime = dateSelB.split('  ')[0] + '  ' + (dateSelB.split('  ')[1] === '上午' ? '12:00:00' : '17:00:00')
      let data = {
        biztrip: {
          type_name: typeName,
          type_id: typeId,
          start_time: startTime,
          end_time: endTime,
          destination: site,
          desc: textareaText,
          budget: budget || 0
        },
        gotogether_user_list: this.gotogetherUserList,
        node_list: this.approvalPersonArr,
        cc_people: this.ccPersonArr
      }
      this.$preloaderFull.show()
      this.$axios.post('/mobicampus/biztrip/v1/createApplication', data).then(({ data }) => {
        // let msg = '申请提交成功'
        this.$preloaderFull.close()
        if (data.status === 200) {
          // this.$router.replace({ name: 'commitCom' })
          this.$router.back()
        } else {
          this.isCommited = false
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 请求--外出类型
    getBiztripType () {
      return this.$axios.get('/mobicampus/biztrip/v1/getTypeListBySchool').then(({ data }) => {
        if (data.status === 200) {
          let typeList = data.result.data
          return typeList
        }
      })
    },
    // 请求数据 && 初始化data数据
    getApplicationDetails () {
      this.$axios.get(`/mobicampus/approve/v1/getApplicationDetails/` + this.$route.params.id).then(({ data }) => {
        let dataObject = data.result.data
        if (data.status === 200) {
          let { resource, process, application } = dataObject
          // 初始化当前用户ID
          this.curUserId = application.create_user_id
          let startTime = resource.start_time.split('+')[0].split('T')
          let endTime = resource.end_time.split('+')[0].split('T')
          // 小时转天数
          startTime[1] = startTime[1] === '07:50:00' ? '上午' : '下午'
          endTime[1] = endTime[1] === '12:00:00' ? '上午' : '下午'
          this.typeName = resource.type_name
          this.typeId = parseInt(resource.type_id)
          this.dateSelA = startTime[0] + '  ' + startTime[1]
          this.dateSelB = endTime[0] + '  ' + endTime[1]
          this.textareaText = resource.desc
          this.site = resource.destination
          this.budget = resource.budget
          process.node_list.map((item, index) => {
            let obj = {
              user_name: item.user_name,
              user_id: item.user_id
            }
            // 用户撤销后 重新申请 审批人中过滤本人
            if (index === 0 && parseInt(item.user_id) === parseInt(this.curUserId)) return
            this.approvalPersonArr.push(obj)
          })
          console.log('dataObject', dataObject)
          dataObject.cc_people.map(item => {
            let obj = {
              user_name: item.user_name,
              user_id: item.user_id
            }
            this.selectedData.memberList.push(obj)
            this.ccPersonArr.push(obj)
          })
          // 附件
          this.attachmentList = resource.attachment_list
          resource.attachment_list.map(item => {
            this.imgList.push(item.src)
          })
        } else {
          // msg = '失败'
        }
        // this.$simpleMsg(msg)
      }).catch(error => {
        // this.$simpleMsg(error)
        console.log('error', error)
      })
    }
  }
}
</script>

<style scoped>
.waichu {
  padding-top: 12px;
  padding-bottom: 36px;
}
/* .typeContent-box {
  margin: -29px 10px 0;
  border-radius: 8px;
  background-color: #fff;
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
.typeContent-box .row .right .iconfont-approval {
  color: #b3b3b3;
  font-size: 17px;
}
.typeContent-box .row .right input {
  padding-right: 17px;
  text-align: right;
  outline: none;
  height: 40px;
  border: none;
}
.typeContent-box .row .right input::placeholder {
  color: #ccc;
  font-size: 14px;
  text-align: right;
}
.reasonContent-box {
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
}
textarea::placeholder {
  color: #ccc;
  font-size: 14px;
}
.commitBtn-box {
  height: 50px;
  margin: 30px 10px 50px;
  background-color: #53a2ed;
  color: #fff;
  line-height: 50px;
  font-size: 16px;
  border-radius: 9px;
  text-align: center;
} */
.bottomList {
  color: #007aff;
}
</style>
