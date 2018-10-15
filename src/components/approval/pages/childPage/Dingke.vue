<template>
  <div class=" page-bg dingke">
    <div class="form-box" v-for="(item, index) in formArr" :key="index" @click="formIndexActive=index; currActiveForm=item">
      <FormCom>
        <cell button title="日期" :content="item.dateText" @action="selectDateAction"></cell>
        <cell button title="节次" :content="item.sectionText" @action="()=>selectSectionAction(item)"></cell>
        <cell button title="顶课老师" :content="item.teacherName" @action="onMemberSelectA"></cell>
      </FormCom>
      <!-- 添加&删除 -->
      <div class="addAndDel-box">
        <div class="addBtn" v-show="index === formArr.length - 1">
          <span class="iconfont-approval">&#xe64d;</span>
          <span class="text" @click="addFormAction">添加</span>
        </div>
        <div class="delBtn" v-show="formArr.length !== 1">
          <span class="iconfont-approval">&#xe690;</span>
          <span class="text" @click="delPopupAcion(index)">删除</span>
        </div>
      </div>
    </div>

    <!-- 理由 -->
    <TextareaCom placeholder="请输入顶课事由" :content.sync='textareaText'></TextareaCom>
    <!-- 删除表单提示窗口 -->
    <div class="mask-box" v-show="isShowconfirmBox"></div>
    <div class="warn-box" v-show="isShowconfirmBox">
      <div class="title">提示</div>
      <div class="content">确定删除？</div>
      <div class="btn-box">
        <div class="confirmBtn" @click="() => this.isShowconfirmBox = false">取消</div>
        <div class="confirmBtn" @click="onDelConfirm">确定</div>
      </div>
    </div>
    <!-- 审批 -->
    <ApprovalProcessCom :needDelBtn="canChangeProcess" :needAddBtn="canChangeProcess" :needArrow="true" @addPerson='onMemberSelect' :approvalPersonArr="approvalPersonArr" @selectDirector="onSelectDirector" @memberAction="onMemberAction"></ApprovalProcessCom>
    <!-- 抄送 -->
    <ccPersonCom :ccPersonArr="ccPersonArr" @addPerson="onMemberSelectB"></ccPersonCom>
    <!-- 抄送 -->
    <!-- <ApprovalProcessCom   :needArrow="false" title="抄送人"  @addPerson='onMemberSelectB'
                          :deptList="selectedData.deptList" :approvalPersonArr="selectedData.memberList"></ApprovalProcessCom> -->
    <!-- 提交 btn -->
    <CommitBtnCom @action="commitBtnAction"></CommitBtnCom>

    <!-- 选择审批成员 -->
    <MemberSelect ref="vMemberSelect"></MemberSelect>
    <!-- 选择日期 -->
    <SlideSelectDate @curPageConfirm='dateConfirm' :show.sync="SlideSelectDateShow" :value.sync="dateText" @error="timeError('发生未知错误')"></SlideSelectDate>
    <!-- 底部选择(节次) -->
    <BottomOptions @select="onSectionSelect" :show.sync="bottomOptionsShow">
      <ul>
        <li :data-type="index" v-for="(item, index) in sectionList" :key="index+'33'" @click="()=>bottomListAction(item, index)">{{`${item.lesson_id_string} ${item.subject_name}`}}</li>
      </ul>
    </BottomOptions>
  </div>
</template>

<script>
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
import TextareaCom from '@/components/commonCom/textareaCom'
import { getApproveConf } from '@/components/approval/approvalStatic/js/commonServer.js'
import MemberSelect from '@/modules/member-select2'
import SlideSelectDate from '@/modules/slide-select/date/SlideSelectDate.vue'
import ApprovalProcessCom from '@/components/commonCom/approvalProcess.vue'
import ccPersonCom from '@/components/commonCom/ccPersonCom'
import BottomOptions from '@/modules/bottom-options/BottomOptions'
export default {
  data () {
    return {
      selectedData: {
        memberList: [], // 成员列表(部门没被选中)
        deptList: [], // 部门列表
        memberListSubmit: [] // 需要提交的成员列表
      },
      canChangeProcess: true,
      canChangeCcpeople: true,
      isCommited: false,
      bottomOptionsShow: false,
      sectionList: [],
      memberA: false,
      SlideSelectDateShow: false,
      curUserId: '',
      userInfo: {},
      isShowconfirmBox: false,
      formIndexActive: 0,
      dateText: '',
      sectionText: '',
      teacherText: '',
      textareaText: '',
      // 审批人成员
      approvalPersonArr: [],
      // 抄送人成员
      ccPersonArr: [],
      currActiveForm: null,
      formArr: [
        {
          dateText: '',
          sectionText: '',
          sectionArrIndex: '',
          sectionArr: [],
          teacherName: '',
          teacherId: ''
        }
      ]
    }
  },
  created () {
    // 获取用户ID && 初始化审批人
    this.getCurrUserInfo()
    if (this.$route.params.id && this.$route.params.id !== '0') {
      this.initData()
    } else {
      this.getConf()
    }
  },
  components: {
    CommitBtnCom,
    ApprovalProcessCom,
    SlideSelectDate,
    BottomOptions,
    MemberSelect,
    ccPersonCom,
    TextareaCom,
    FormCom,
    Cell
  },
  methods: {
    // 外出--模板
    getConf () {
      console.log('获取--请假审批模板')
      getApproveConf.call(this, `/mobicampus/course/v1/getMatchedApproveConf/course_exchange_dnk`)
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
      this.$refs.vMemberSelect.show({
        staticData: item.leader_list,
        onConfirm: (selectedData) => {
          if (selectedData.memberList.length === 0) return
          item.user_name = selectedData.memberList[0].user_name
          item.user_id = selectedData.memberList[0].user_id
        }
      })
    },
    // 选择日期
    selectDateAction () {
      this.SlideSelectDateShow = true
      this.currActiveForm.sectionText = '' // 清除选中节次
    },
    // 底部弹窗 （选择节次）
    onSectionSelect () {

    },
    // 添加审批人
    onMemberSelect () {
      this.$refs.vMemberSelect.show({
        type: 'single',
        // 确认事件
        onConfirm: selectedData => {
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
    // 添加 form
    addFormAction () {
      let formObj = {
        dateText: '',
        sectionText: '',
        curSectionId: '',
        sectionArrIndex: '',
        sectionArr: [
          // {
          //   lessonIdString: '',
          //   subjectName: ''
          // }
        ],
        teacherName: '',
        teacherId: ''
      }
      this.formArr.push(formObj)
    },
    // 删除表单提示窗口
    delPopupAcion (index) {
      this.formIndexActive = index
      this.isShowconfirmBox = true
    },
    // 删除确认
    onDelConfirm () {
      this.formArr.splice(this.formIndexActive, 1)
      this.isShowconfirmBox = false
    },
    // 初始化节次弹窗列表
    // initformSectionBoxList (arr) {
    //   this.sectionList = []
    //   arr.map(item => {
    //     this.sectionList.push(item)
    //   })
    // },
    // 选择日期确定回调
    dateConfirm (dateStr) {
      this.currActiveForm.dateText = dateStr
      this.getCurriculum(dateStr, this.curUserId).then(sectionInfoArr => {
        this.currActiveForm.sectionArr = sectionInfoArr
        this.sectionList = sectionInfoArr
      })
    },
    // 点击选择节次
    selectSectionAction (item) {
      if (item.sectionArr.length === 0) {
        this.getCurriculum(item.dateText, this.curUserId).then(sectionInfoArr => {
          item.sectionArr = sectionInfoArr
          this.sectionList = item.sectionArr
        })
      }
      this.sectionList = item.sectionArr
      this.bottomOptionsShow = true
    },
    // 选择底部列表
    bottomListAction (item, index) {
      this.currActiveForm.sectionText = `${item.lesson_id_string} ${item.subject_name}`
      this.currActiveForm.sectionArrIndex = index
      this.curSectionId = item.id
      this.bottomOptionsShow = false
    },
    // 选课教师回调
    onMemberSelectA (memberArr) {
      this.$refs.vMemberSelect.show({
        // type: 'multiple',
        selectedData: [],
        // 确认事件
        onConfirm: selectedData => {
          this.currActiveForm.teacherId = selectedData.memberList[0].user_id
          this.currActiveForm.teacherName = selectedData.memberList[0].user_name
        }
      })
    },
    // 提交申请
    commitBtnAction () {
      if (this.isCommited) return
      let detailsList = []
      for (let i = 0; i < this.formArr.length; i++) {
        let { dateText, sectionText, teacherName, teacherId, sectionArr, sectionArrIndex } = this.formArr[i]
        if (!dateText) {
          this.$simpleMsg(`请选择表单${i + 1}日期`)
          return false
        }
        if (!sectionText) {
          this.$simpleMsg(`请选择表单${i + 1}节次`)
          return false
        }
        if (!teacherName) {
          this.$simpleMsg(`请选择表单${i + 1}调课老师`)
          return false
        }
        if (!this.textareaText) {
          this.$simpleMsg(`请填写顶课事由`)
          return false
        }
        if (this.approvalPersonArr.length === 0) {
          this.$simpleMsg(`请选择审批人`)
          return false
        }
        let formObj = {
          'from_date': dateText,
          'from_curriculum_id': sectionArr[sectionArrIndex].id,
          'from_day_in_week': sectionArr[sectionArrIndex].day_in_week,
          'from_lesson_id': sectionArr[sectionArrIndex].lesson_id,
          'from_subject_id': sectionArr[sectionArrIndex].subject_id,
          'from_subject_name': sectionArr[sectionArrIndex].subject_name,
          'to_date': dateText,
          'to_user_id': teacherId,
          'to_user_name': teacherName
        }
        detailsList.push(formObj)
      }
      let data = {
        'course_exchange': {
          'type': 2,
          'reason': this.textareaText,
          'details_list': detailsList
        },
        'node_list': this.approvalPersonArr,
        'cc_people': this.ccPersonArr
      }
      this.isCommited = true
      this.postCreateApplication(data)
    },
    postCreateApplication (data) {
      this.$preloaderFull.show()
      // 开始请求数据
      this.$axios.post('/mobicampus/course/v1/createApplication', data).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.$router.replace({ name: 'commitCom' })
        } else {
          this.isCommited = false
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 发送请求 获取当前用户信息
    getCurrUserInfo () {
      return this.$axios.get(`/schoolorg/v1/getCurrUserInfo`).then(({ data }) => {
        let dataObject = data.result.data
        if (data.status === 200) {
          this.curUserId = dataObject.user_id
          this.userInfo = dataObject
        } else {
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 发送请求 获取节次信息(课程表)
    getCurriculum (date, userId) {
      let obj = {
        date,
        user_id: userId
      }
      return new Promise((resolve, reject) => {
        this.$axios.get(`/mobicampus/course/v1/getCurriculum/?date=${obj.date}&user_id=${obj.user_id}`).then(({ data }) => {
          // let msg = '成功'
          let dataArr = data.result.data
          if (data.status === 200) {
            let sectionInfoArr = []
            dataArr.map(item => {
              sectionInfoArr.push(item)
            })
            resolve(sectionInfoArr)
          } else {
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    // 请求数据 && 初始化data数据
    initData () {
      this.formArr = []
      this.$axios.get(`/mobicampus/approve/v1/getApplicationDetails/${this.$route.params.id}`).then(({ data }) => {
        let dataObject = data.result.data
        if (data.status === 200) {
          let { resource, process, application } = dataObject
          this.formArr = []
          // 初始化当前用户ID
          this.curUserId = application.create_user_id
          resource.details_list.map(item => {
            let formObj = {
              dateText: item.from_date.split('+')[0].split('T')[0],
              sectionText: `${item.from_lesson_id_string} ${item.from_subject_name}`,
              curSectionId: item.from_curriculum_id,
              sectionArrIndex: 0,
              sectionArr: [{
                id: item.from_curriculum_id,
                day_in_week: item.from_day_in_week,
                lesson_id: item.from_lesson_id,
                lesson_id_string: item.from_lesson_id_string,
                subject_id: item.from_subject_id,
                subject_name: item.from_subject_name,
                user_id: item.to_user_id,
                user_name: item.to_user_name
              }],
              teacherName: item.to_user_name,
              teacherId: item.to_user_id
            }
            this.formArr.push(formObj)
          })
          this.textareaText = resource.reason
          process.node_list.map((item, index) => {
            let obj = {
              user_name: item.user_name,
              user_id: item.user_id
            }
            // 用户撤销后 重新申请 审批人中过滤本人
            if (index === 0 && parseInt(item.user_id) === parseInt(this.curUserId)) return
            this.approvalPersonArr.push(obj)
          })
          dataObject.cc_people.map(item => {
            let obj = {
              user_name: item.user_name,
              user_id: item.user_id
            }
            this.ccPersonArr.push(obj)
          })
        } else {
        }
      }).catch(error => {
        console.log('error', error)
      })
    }

  }
}
</script>

<style scoped lang='scss'>
.dingke {
  padding-top: 12px;
  padding-bottom: 52px;
}
.form-box {
  transform: translate(0, 0);
  .addAndDel-box {
    padding: 0 80px;
    display: flex;
    text-align: center;
    line-height: 30px;
    .addBtn {
      flex: 1;
      color: #6db1f1;
    }
    .delBtn {
      flex: 1;
      color: red;
    }
  }
}
.formContent-box {
  margin: 0px 10px 0;
  border-radius: 8px;
  background-color: #fff;
  .row {
    height: 54px;
    line-height: 52px;
    padding: 0 10px 0 19px;
    .row-left {
      float: left;
      color: #666;
      font-size: 17px;
      font-weight: bold;
    }
    .row-right {
      float: right;
      color: #ccc;
      font-size: 14px;
    }
    .row-right.active {
      color: #333;
    }
  }
}
.addDetail-box {
  color: #6db1f1;
  line-height: 31px;
  height: 31px;
  text-align: center;
}
.reasonContent-box {
  height: 123px;
  margin: 0px 10px 10px;
  border-radius: 9px;
  background-color: #fff;
  // margin-top: 12px;
  padding: 13px 15px;
  textarea {
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    outline: none;
  }
  textarea::placeholder {
    color: #ccc;
  }
}
.commitBtn-box {
  height: 50px;
  margin: 30px 10px 10px;
  background-color: #53a2ed;
  color: #fff;
  line-height: 50px;
  font-size: 16px;
  border-radius: 9px;
  text-align: center;
}
.mask-box {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #333;
  opacity: 0.3;
  z-index: 10;
}
.warn-box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  border: 1PX #000 solid;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  z-index: 11;
  .title {
    line-height: 36px;
    font-size: 20px;
    font-weight: bold;
  }
  .content {
    line-height: 30px;
    font-size: 18px;
  }
  .btn-box {
    display: flex;
    div {
      flex: 1;
      line-height: 34px;
      font-weight: bold;
    }
  }
}
</style>
