<template>
  <div class="tiaoke  page-bg">
    <div class="form-box" v-for="(item, index) in formArr" :key="index" @click="formIndexActive=index">
      <FormCom>
        <cell button title="日期" :content="item.dateTextA" @action="selectDateAction(index, 'A', item)"></cell>
        <cell button title="节次" :content="item.sectionTextA" @action="selectSectionAction(index, 'A', item)"></cell>
      </FormCom>
        <div class="changeBtn-box">
          <span class="iconfont-approval">&#xe61c;</span>
        </div>
      <FormCom>
        <cell button title="老师" :content="item.teacherName" @action="onMemberSelectA"></cell>
        <cell button title="日期" :content="item.dateTextB" @action="selectDateAction(index, 'B', item)"></cell>
        <cell button title="节次" :content="item.sectionTextB" @action="selectSectionAction(index, 'B', item)"></cell>
      </FormCom>
      <!-- 添加&删除 -->
      <div class="addAndDel-box">
        <div class="addBtn" v-show="index === formArr.length - 1">
          <span class="iconfont-approval">&#xe64d;</span>
          <span class="text" @click="addFormAction">添加</span>
        </div>
        <div class="delBtn" @click="delPopupAcion" v-show="formArr.length !== 1">
          <span class="iconfont-approval">&#xe690;</span>
          <span class="text" @click="delPopupAcion(index)">删除</span>
        </div>
      </div>
    </div>

    <!-- 理由 -->
    <TextareaCom placeholder="请输入调课事由" :content.sync='textareaText'></TextareaCom>
    <!-- 审批 -->
    <ApprovalProcessCom :needDelBtn="canChangeProcess" :needAddBtn="canChangeProcess" :needArrow="true" @addPerson='onMemberSelect' :approvalPersonArr="approvalPersonArr" @selectDirector="onSelectDirector" @memberAction="onMemberAction"></ApprovalProcessCom>

    <!-- 抄送 -->
    <ccPersonCom :ccPersonArr="ccPersonArr" @addPerson="onMemberSelectB"></ccPersonCom>
   <!-- 提交 btn -->
    <CommitBtnCom @action="commitBtnAction"></CommitBtnCom>
    <!-- 审批成员选择 -->
    <MemberSelect ref="vMemberSelect"></MemberSelect>
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
    <!-- 选择日期 -->
    <SlideSelectDate @curPageConfirm='dateConfirm' :show.sync="SlideSelectDateShow" :value.sync="dateText" @error="timeError('发生未知错误')"></SlideSelectDate>
    <!-- 底部选择(节次) -->
    <BottomOptions @select="onSectionSelect" :show.sync="bottomOptionsShow">
      <ul>
        <li :data-type="index" v-for="(item, index) in formSectionBoxList" :key="index+'33'" @click="bottomListAction(item, index)">{{`${item.lesson_id_string} ${item.subject_name}`}}</li>
      </ul>
    </BottomOptions>
  </div>
</template>

<script>
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
import { getApproveConf } from '@/components/approval/approvalStatic/js/commonServer.js'
import MemberSelect from '@/modules/member-select2'
import SlideSelectDate from '@/modules/slide-select/date/SlideSelectDate.vue'
import TextareaCom from '@/components/commonCom/textareaCom'
import ApprovalProcessCom from '@/components/commonCom/approvalProcess.vue'
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
import ccPersonCom from '@/components/commonCom/ccPersonCom'
import MemberSelectLevels from '@/modules/member-select-levels/Index'
import BottomOptions from '@/modules/bottom-options/BottomOptions'
export default {
  components: {
    CommitBtnCom,
    ApprovalProcessCom,
    MemberSelectLevels,
    SlideSelectDate,
    BottomOptions,
    MemberSelect,
    ccPersonCom,
    TextareaCom,
    Cell,
    FormCom
  },
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
      // 节次选择列表
      formSectionBoxList: [],
      // 当前用户ID
      curUserId: '',
      userInfo: {},
      isShowconfirmBox: false,
      // 当前操作表单下标
      formIndexActive: 0,
      // 当前表单区域('A' || 'B')
      formPartActive: 'A',
      SlideSelectDateShow: false,
      dateText: '',
      // 所有表单
      formArr: [
        {
          dateTextA: '',
          sectionTextA: '',
          sectionArrIndexA: '',
          curSectionIdA: '',
          sectionArrA: [],
          teacherName: '',
          teacherId: '',
          dateTextB: '',
          sectionArrIndexB: '',
          sectionTextB: '',
          curSectionIdB: '',
          sectionArrB: []
        }
      ],
      // 审批人成员
      approvalPersonArr: [],
      // 抄送人成员
      ccPersonArr: [],
      textareaText: ''
    }
  },
  created () {
    // 获取用户ID && 初始化审批人
    this.getCurrUserInfo()
    if (this.$route.params.id && this.$route.params.id !== '0') { // 重新提交
      this.initData()
    } else { // 获取模板
      this.getConf()
    }
  },
  // watch: {
  //   'SlideSelectDateShow': function (newV) {
  //     // if (newV) return
  //     // this.formArr[this.formIndexActive][this.dateKey] = this.dateText
  //   }
  // },
  methods: {
    // 外出--模板
    getConf () {
      console.log('获取--请假审批模板')
      getApproveConf.call(this, `/mobicampus/course/v1/getMatchedApproveConf/course_exchange_tk`)
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
    selectDateAction (index, part) {
      this.SlideSelectDateShow = true
      this.formIndexActive = index
      this.formPartActive = part
    },
    // 选择日期确定回调
    dateConfirm (dateStr) {
      if (this.formPartActive === 'A') {
        this.formArr[this.formIndexActive].dateTextA = dateStr
        this.getCurriculum(dateStr, this.curUserId).then(sectionInfoArr => {
          this.formArr[this.formIndexActive].sectionArrA = sectionInfoArr
        })
      } else {
        this.formArr[this.formIndexActive].dateTextB = dateStr
        if (this.formArr[this.formIndexActive].teacherName && this.formArr[this.formIndexActive].dateTextB) {
          this.getCurriculum(dateStr, this.formArr[this.formIndexActive].teacherId).then(sectionInfoArr => {
            this.formArr[this.formIndexActive].sectionArrB = sectionInfoArr
            this.initformSectionBoxList(sectionInfoArr)
          })
        }
      }
    },
    // 初始化节次弹窗列表
    initformSectionBoxList (arr) {
      this.formSectionBoxList = []
      arr.map(item => {
        this.formSectionBoxList.push(item)
      })
    },
    // 选择底部列表
    bottomListAction (item, index) {
      if (this.formPartActive === 'A') {
        this.formArr[this.formIndexActive].sectionTextA = `${item.lesson_id_string} ${item.subject_name}`
        this.formArr[this.formIndexActive].sectionArrIndexA = index
        this.formArr[this.formIndexActive].curSectionIdA = item.id
      } else {
        this.formArr[this.formIndexActive].sectionTextB = `${item.lesson_id_string} ${item.subject_name}`
        this.formArr[this.formIndexActive].sectionArrIndexB = index
        this.formArr[this.formIndexActive].curSectionIdB = item.id
      }
      this.bottomOptionsShow = false
    },
    // 点击选择节次
    selectSectionAction (index, part, item) {
      this.formIndexActive = index
      this.formPartActive = part
      if (part === 'A') {
        if (!item.dateTextA) return
        if (item.sectionArrA.length === 0) {
          this.getCurriculum(item.dateTextA, this.curUserId).then(sectionInfoArr => {
            item.sectionArrA = sectionInfoArr
            this.formSectionBoxList = item.sectionArrA
          })
        }
        this.formSectionBoxList = item.sectionArrA
      } else {
        if (!item.dateTextB || !item.teacherName) return
        if (item.sectionArrB.length === 0) {
          this.getCurriculum(item.dateTextB, item.teacherId).then(sectionInfoArr => {
            item.sectionArrB = sectionInfoArr
            this.formSectionBoxList = item.sectionArrB
          })
        }
        this.formSectionBoxList = item.sectionArrB
      }
      this.bottomOptionsShow = true
    },
    // 底部弹窗 （选择节次）
    onSectionSelect () {

    },
    // 选着教师回调
    onMemberSelectA (memberArr) {
      this.$refs.vMemberSelect.show({
        // type: 'multiple',
        selectedData: {},
        // 确认事件
        onConfirm: selectedData => {
          if (selectedData.memberList.length === 0) return
          this.formArr[this.formIndexActive].teacherId = selectedData.memberList[0].user_id
          this.formArr[this.formIndexActive].teacherName = selectedData.memberList[0].user_name
          if (this.formArr[this.formIndexActive].teacherName && this.formArr[this.formIndexActive].dateText) {
            this.getCurriculum(this.formArr[this.formIndexActive].dateText, this.formArr[this.formIndexActive].teacherId).then(sectionInfoArr => {
              this.formArr[this.formIndexActive].sectionArr = sectionInfoArr
              this.initformSectionBoxList(sectionInfoArr)
            })
          }
        }
      })
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
    // 添加 form
    addFormAction () {
      let formObj = {
        dateTextA: '',
        sectionTextA: '',
        sectionArrA: [],
        teacherName: '',
        dateTextB: '',
        sectionTextB: '',
        sectionArrB: []
      }
      this.formArr.push(formObj)
    },
    // 添加审批人
    onMemberSelect () {
      this.$refs.vMemberSelect.show({
        type: 'single',
        // 确认事件
        onConfirm: selectedData => {
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
    // 提交申请
    commitBtnAction () {
      if (this.isCommited) return
      let detailsList = []
      for (let i = 0; i < this.formArr.length; i++) {
        let { dateTextA, sectionTextA, curSectionIdA, curSectionIdB, teacherName, dateTextB, sectionTextB, sectionArrA, sectionArrB, sectionArrIndexA, sectionArrIndexB } = this.formArr[i]
        if (!dateTextA) {
          this.$simpleMsg(`请选择表单${i + 1}日期`)
          this.isCommited = false
          return false
        }
        if (!sectionTextA) {
          this.$simpleMsg(`请选择表单${i + 1}节次`)
          this.isCommited = false
          return false
        }
        if (!teacherName) {
          this.$simpleMsg(`请选择表单${i + 1}调课老师`)
          this.isCommited = false
          return false
        }
        if (!dateTextB) {
          this.$simpleMsg(`请选择表单${i + 1}日期`)
          this.isCommited = false
          return false
        }
        if (!sectionTextB) {
          this.$simpleMsg(`请选择表单${i + 1}节次`)
          this.isCommited = false
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
          'from_date': dateTextA,
          'from_curriculum_id': curSectionIdA,
          'from_day_in_week': sectionArrA[sectionArrIndexA].day_in_week,
          'from_lesson_id': sectionArrA[sectionArrIndexA].lesson_id,
          'from_subject_id': sectionArrA[sectionArrIndexA].subject_id,
          'from_subject_name': sectionArrA[sectionArrIndexA].subject_name,
          'to_date': dateTextB,
          'to_user_id': sectionArrB[sectionArrIndexB].user_id,
          'to_user_name': sectionArrB[sectionArrIndexB].user_name,
          'to_curriculum_id': curSectionIdB,
          'to_day_in_week': sectionArrB[sectionArrIndexB].day_in_week,
          'to_lesson_id': sectionArrB[sectionArrIndexB].lesson_id,
          'to_subject_id': sectionArrB[sectionArrIndexB].subject_id,
          'to_subject_name': sectionArrB[sectionArrIndexB].subject_name
        }
        detailsList.push(formObj)
      }
      let data = {
        'course_exchange': {
          'type': 1,
          'reason': this.textareaText,
          'details_list': detailsList
        },
        'node_list': this.approvalPersonArr,
        'cc_people': this.ccPersonArr
      }
      this.isCommited = true
      this.postCreateApplication(data)
    },
    // 提交--数据
    postCreateApplication (data) {
      this.$preloaderFull.show()
      this.$axios.post('/mobicampus/course/v1/createApplication', data).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.$router.replace({ name: 'commitCom' })
        } else {
          this.isCommited = false
        }
      }).catch(error => {
        console.log('error', error)
      })
    },
    // 获取当前用户信息
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
    // 获取节次信息(课程表)
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
    // 初始化数据
    initData () {
      // 开始请求数据 并 初始化data数据
      this.$axios.get(`/mobicampus/approve/v1/getApplicationDetails/` + this.$route.params.id).then(({ data }) => {
        let dataObject = data.result.data
        if (data.status === 200) {
          let { resource, process, application } = dataObject
          this.formArr = []
          // 初始化当前用户ID
          this.curUserId = application.create_user_id
          resource.details_list.map(item => {
            let formObj = {
              dateTextA: item.from_date.split('+')[0].split('T')[0],
              sectionTextA: `${item.from_lesson_id_string} ${item.from_subject_name}`,
              curSectionIdA: item.from_curriculum_id,
              sectionArrIndexA: 0,
              sectionArrA: [{
                user_id: item.from_user_id,
                user_name: item.from_user_name,
                id: item.from_curriculum_id,
                day_in_week: item.from_day_in_week,
                lesson_id: item.from_lesson_id,
                subject_id: item.from_subject_id,
                subject_name: item.from_subject_name
              }],
              teacherName: item.to_user_name,
              dateTextB: item.to_date.split('+')[0].split('T')[0],
              sectionTextB: `${item.to_lesson_id_string} ${item.to_subject_name}`,
              curSectionIdB: item.to_curriculum_id,
              sectionArrIndexB: 0,
              sectionArrB: [{
                user_id: item.to_user_id,
                user_name: item.to_user_name,
                id: item.to_curriculum_id,
                day_in_week: item.to_day_in_week,
                lesson_id: item.to_lesson_id,
                subject_id: item.to_subject_id,
                subject_name: item.to_subject_name
              }]
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
          // 附件
          // this.attachmentList = resource.attachment_list
          // resource.attachment_list.map(item => {
          //   this.imgs.push(item.src)
          // })
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

<style scoped lang='scss'>
.tiaoke {
  padding-top: 12px;
  padding-bottom: 54px;
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
  transform: translate(0, 0);
  margin: 0px 10px 0px;
  // border-radius: 8px;
  background-color: #fff;
  .row {
    box-sizing: border-box;
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
.changeBtn-box {
  height: 31px;
  line-height: 31px;
  text-align: center;
  background-color: #efefef;
  color: #6db1f1;
  font-size: 16px;
}
</style>
