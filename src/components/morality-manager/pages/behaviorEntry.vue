<template>
  <div class="behavior-entry">
    <!-- 姓名/学号  搜索 -->
    <selectStudentUIByName v-if="this.$route.params.type==1" @change='changeFromName'></selectStudentUIByName>
    <!-- 扫一扫  学号 -->
    <selectStudentUIByScan v-else-if="this.$route.params.type==2" @change='changeFromName'></selectStudentUIByScan>
    <!-- 宿舍/班级  选择 -->
    <FormCom class="FormCom" v-else-if="this.$route.params.type==3">
      <selectStudentUI 
      v-if="behaviorEntrySchool||behaviorEntryDorm"
      class="selectStudent" 
      :text="selInfoStr"
      :behaviorEntrySchool="behaviorEntrySchool"
      :behaviorEntryDorm="behaviorEntryDorm"
      @byDorm='selStudentFromDorm'
      @byClassStudents='selStudentFromClass' 
      @byGradeClass="selFromGradeClass"></selectStudentUI>
      <!-- <cell button v-else-if="behaviorEntrySchool" title="对象" :content="selInfoStr" @action='selStudentFromClass'></cell> -->
      <cell button v-else-if="!behaviorEntrySchool&&behaviorEntryDorm" title="对象" :content="selInfoStr" @action='selStudentFromDorm'></cell>
    </FormCom>
    <!-- 不可更改  对象 -->
    <FormCom class="FormCom" v-else-if="this.$route.params.type==4">
      <cell text title="对象" :content="selInfoStr"></cell>
    </FormCom>
    <FormCom class="FormCom">
      <!-- :content="institution.item_name" -->
      <cell button title="制度" @action="selRule" v-if="Number($route.params.type)===3"></cell>
      <cell button title="制度" :content="institution.item_name" @action="selRule" v-else></cell>
      <div class="system-display" v-if="Number($route.params.type) === 3">
        <ul class="system-ul">
          <li class="system-item" v-for="(item, index) in institutionList" :key="'system1'+index" v-if="index<2">{{(index + 1)+'、'+item.item_name}}</li>
          <ul class="more-system-ul" v-show="isPull">
            <li class="system-item" v-for="(item, index) in institutionList" :key="'system2'+index" v-if="index>=2">{{(index + 1)+'、'+item.item_name}}</li>
          </ul>
        </ul>
        <pullupIcon @pull="pull" v-if="institutionList.length>2"></pullupIcon>
      </div>
    </FormCom>
    <!-- 说明 + 附件 -->
    <TextareaCom placeholder="请输入说明" :content.sync='textareaText' :attachmentList="attachmentList" :imgList="imgList"></TextareaCom>
    <FormCom class="FormCom">
      <cell button title="时间" :content="time" @action="()=>isShowSelectDate = true"></cell>
    </FormCom>
    <!-- 确定 -->
    <CommitBtnCom @action="commitBtnAction"></CommitBtnCom>
    <SlideSelectDate :show.sync='isShowSelectDate' :value.sync='time'></SlideSelectDate>
    <!-- 选择学生 -->
    <selectStudent ref='selectStudent' v-if="isRouterAlive"></selectStudent>
    <selectStudentDorm ref='selectStudentDorm' v-if="isRouterAlive"></selectStudentDorm>
    <selectRule ref='selectRule'  v-if="isRouterAlive"></selectRule>
    <selectClassUI ref="selecClassUI" @getClassInfo="getClassInfo"  v-if="isRouterAlive"></selectClassUI>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import selectStudent from '../com/select-student'
import selectStudentDorm from '../com/select-student-dorm'
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
import selectStudentUI from './behaviorEntry/selectStudentUI'
import selectStudentUIByName from './behaviorEntry/selectStudentUIByName'
import selectStudentUIByScan from './behaviorEntry/selectStudentUIByScan'
import TextareaCom from './behaviorEntry/TextareaCom'
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
import SlideSelectDate from '@/modules/slide-select/date/SlideSelectDateAndTime'
import selectRule from '../com/select-rule'
// import getCurrentTime from '@/components/classManager/assets/js/getCurrentTime.js'
import selectClassUI from '@/components/morality-manager/pages/behaviorEntry/selectClassUI'
import { UploadFileList } from '@/js/file-upload'
import pullupIcon from '@/components/morality-manager/components/pullupIcon'

export default {
  components: {
    selectStudent,
    selectStudentUI,
    selectStudentUIByName,
    selectStudentUIByScan,
    FormCom,
    Cell,
    SlideSelectDate,
    TextareaCom,
    CommitBtnCom,
    selectRule,
    selectStudentDorm,
    selectClassUI,
    pullupIcon
  },
  data () {
    return {
      period_id: '',
      behaviorEntrySchool: false, // 学校录入权限
      behaviorEntryDorm: false, // 宿舍录入权限
      isEditor: false,
      from: '',
      selInfoStr: '',
      rangeInfo: null, // 行列信息
      classId: '',
      classStr: '',
      dormStr: '',
      dormInfo: {},
      studentListFromClass: [],
      studentListFromDorm: [],
      studentListFromSearch: [],
      isShowSelectDate: false,
      time: '',
      institution: {}, // 制度
      institutionList: [], // 制度列表
      textareaText: '',
      imgList: [],
      attachmentList: [],
      classIdList: [],
      isPull: false, // 制度多选时候用来判断是否下拉看更多
      isRouterAlive: true // 刷新组件 录入后刷新组件
    }
  },
  computed: {
    studentList () {
      let { from, studentListFromClass, studentListFromDorm } = this
      let studentList = []
      if (from === 'class') studentList = studentListFromClass
      else if (from === 'dorm') studentList = studentListFromDorm
      return studentList
    }
  },
  created () {
    if (this.$route.query.eventId) { // 编辑
      this.isEditor = true
      this.getDetail()
    } else {
      this.initTime()
      if (Number(this.$route.params.type) === 3) {
        this.getAuthority()
      }
    }
    // console.log(this)
  },
  methods: {
    pull (flag) {
      this.isPull = flag
    },
    changeFromName (d) {
      this.studentListFromSearch = d
      if (d[0]) {
        this.period_id = d[0].period_id
      } else {
        this.period_id = ''
      }
    },
    changeFromScan () {

    },
    initTime () {
      this.time = this.$getTimeStr(new Date(), 'yy-mm-dd hh:mm', false)
    },
    commitBtnAction () {
      let { selInfoStr, studentList, institution, studentListFromSearch } = this
      if (Number(this.$route.params.type) === 1 || Number(this.$route.params.type) === 2) {
        if (!studentListFromSearch[0]) {
          this.$simpleMsg('请选择对象')
          return false
        }
      } else if (Number(this.$route.params.type) === 3) {
        if (!selInfoStr && !studentList[0]) {
          this.$simpleMsg('请选择对象')
          return false
        }
      }
      if (!institution.item_name) {
        this.$simpleMsg('请选择制度')
        return false
      }
      if (this.imgList.length === 0) { // 没有附件
        this.postData()
        return
      }
      this.$preloaderFull.show()
      UploadFileList(this.imgList).then((dataList) => {
        this.$preloaderFull.close()
        if (dataList.length !== 0) { // 图片上传成功
          dataList = dataList.map(item => item.src)
          this.attachmentList.push(...dataList)
          console.log('上传this.attachmentList', this.attachmentList)
          this.imgList = []
          this.postData()
        } else { // 图片上传失败
          this.$simpleMsg('图片上传失败，请重新提交')
          this.isCommited = false
        }
      })
    },
    selFromGradeClass () { // 根据班级选择
      this.$refs.selecClassUI.isShow()
    },
    getClassInfo ({ classIdList, nameInfo, periodIdList }) { // 得到选择班级的信息
      // console.log(periodIdList)
      classIdList.length ? (this.from = 'gradeClass') : (this.from = '')
      this.classIdList = classIdList
      this.selInfoStr = nameInfo
      this.period_id = periodIdList[0]
    },
    selStudentFromClass () { // 根据学生选择
      this.$refs.selectStudent.show({
        // selectedClass: {
        //   grade: '1108',
        //   classId: '5277078851935680208'
        // },
        studentList: this.studentListFromClass,
        onConfirm: d => {
          let { classInfo, studentList, rangeInfo } = d
          this.classInfo = classInfo
          this.classId = classInfo.class_id
          this.classStr = classInfo.classStr
          this.studentListFromClass = studentList || []
          this.rangeInfo = rangeInfo
          this.getSelInfoByClass(d)
          // console.log(d)
        }
      })
    },
    getSelInfoByClass (d) {
      let { classInfo, studentList, rangeInfo } = d
      let text = ''
      text += classInfo.classStr + ' '
      studentList && studentList.forEach(item => (text += ` ${item.user_name}`))
      rangeInfo && (text += rangeInfo.text)
      this.selInfoStr = text
      this.from = 'class'
      this.period_id = d.classInfo.period_id
    },
    selStudentFromDorm () {
      this.$refs.selectStudentDorm.show({
        // selectedClass: {
        //   grade: '1108',
        //   classId: '5277078851935680208'
        // },
        studentList: this.studentListFromDorm,
        onConfirm: d => {
          let { dormInfo, studentList, classId } = d
          this.dormInfo = dormInfo
          this.classId = classId
          this.studentListFromDorm = studentList || []
          this.getSelInfoByDorm(d)
        }
      })
    },
    getSelInfoByDorm (d) {
      let { dormInfo, studentList } = d
      let text = ''
      text += dormInfo.dormStr + ' '
      studentList && studentList.forEach(item => (text += ` ${item.user_name}`))
      this.selInfoStr = text
      this.from = 'dorm'
      this.period_id = studentList[0] ? studentList[0].period_id : ''
    },
    selRule () {
      let { from } = this
      // console.log(typeof this.$route.params.type)
      // let type = this.$route.params.type === 4 ? 'single' : 'multiple'
      // console.log(type)
      if (Number(this.$route.params.type) === 1 || Number(this.$route.params.type) === 2) {
        if (!this.period_id) {
          console.log('this.period_id', this.period_id)
          this.$simpleMsg('请先选择对象')
          return
        }
      } else if (Number(this.$route.params.type) === 3) {
        if (!from) {
          this.$simpleMsg('请先选择对象')
          return
        }
      } else { // 编辑

      }
      this.$refs.selectRule.show({
        type: Number(this.$route.params.type) === 4 ? 'single' : 'multiple', // [single,multiple(默认)]
        rule_type: from === 'dorm' ? '5' : '1',
        period_id: this.period_id,
        institutionList: this.institutionList, // 初始化选中数据
        confirm: d => {
          this.institutionList = d
          this.institution = d[0]
          console.log('已选制度this.institutionList', this.institutionList)
        }
      })
    },
    postData () {
      // alert(this.attachmentList.length)
      // let { textareaText, time, imgList, institution, rangeInfo, from, classInfo, dormInfo } = this
      let { textareaText, time, attachmentList, institution, rangeInfo, from, classInfo, classId, dormInfo, institutionList } = this
      let { item_id, score } = institution
      let d = {
        rule_event: {
          event_id: this.$route.query.eventId || '0',
          rule_item_id: item_id,
          description: textareaText,
          type: '1',
          event_date: time,
          score: score,
          // source: '3',
          class_id: classId,
          image_url: attachmentList.join(',')
        }
      }
      let moreSystemPreserve = (d) => { // 制度多选
        if (institutionList.length) {
          institutionList.forEach(ele => {
            d.rule_event.rule_item_id = ele.item_id
            d.rule_event.score = ele.score
            // console.log(d)
            this.post(d)
          })
        }
      }
      rangeInfo && (d.rule_event.description += ' ' + rangeInfo.text)
      if (Number(this.$route.params.type) === 1 || Number(this.$route.params.type) === 2) {
        d.submit_type = 'user'
        d.rule_event.class_id = this.studentListFromSearch[0].class_id
        this.studentListFromSearch.forEach(item => {
          d.rule_event.user_name = item.user_name
          d.rule_event.user_id = item.user_id
          this.post(d)
        })
      } else if (Number(this.$route.params.type) === 3) {
        if (from === 'class') {
          d.submit_type = 'class'
          d.rule_event.class_id = classInfo.class_id
        } else if (from === 'dorm') {
          d.submit_type = 'dorm'
          d.rule_event.dorm_id = dormInfo.dorm_id
        } else if (from === 'gradeClass') { // 按班级
          // let _this = this
          d.submit_type = 'class'
          let { classIdList } = this
          classIdList.forEach(ele => {
            d.rule_event.class_id = ele
            moreSystemPreserve(d)
          })
          return
        }
        if (this.studentList.length > 0) {
          d.submit_type = 'user'
          // console.log('d-this.studentList', this.studentList)
          this.studentList.forEach(item => {
            d.rule_event.user_name = item.user_name
            d.rule_event.user_id = item.user_id
            moreSystemPreserve(d)
          })
        } else {
          moreSystemPreserve(d)
        }
      } else if (Number(this.$route.params.type) === 4) { // 编辑
        if (this.user_name) {
          d.submit_type = 'user'
          d.rule_event.user_name = this.user_name
          d.rule_event.user_id = this.user_id
        } else if (this.dormInfo.dormId) {
          d.submit_type = 'dorm'
          d.rule_event.dorm_id = dormInfo.dorm_id
        } else {
          d.submit_type = 'class'
        }
        d.rule_event.class_id = this.classId
        this.post(d).then(d => {
          if (d.status === 200) {
            this.postApprove()
          }
        })
      }
    },
    post (d) {
      d = JSON.parse(JSON.stringify(d))
      return this.$axios.post(`/palm/v2/event/neworupdate`, d).then(({ data }) => {
        // console.log(d)
        this.$preloaderFull.close()
        if (data.status === 200) {
          if (Number(this.$route.params.type) !== 3) {
            this.$router.back()
          }
          this.clearAll()
          this.postNewTask() // 消息推送
          this.$simpleMsg('已提交')
        } else {
          this.$simpleMsg(data.message)
        }
        return data
      })
    },
    getDetail () {
      this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/event/details/${this.$route.query.eventId}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          let d = data.result.data
          this.textareaText = d.event_desc
          this.time = this.$getTimeStr(d.event_date, 'yy-mm-dd hh:mm', false)
          this.institution = {
            item_id: d.rule_item_id,
            score: d.score,
            item_name: d.rule_item_name
          }
          this.classId = d.class_id
          // this.imgList = d.image_url.split(',')
          this.attachmentList = d.image_url ? d.image_url.split(',') : []
          // console.log(' this.attachmentList', this.attachmentList)
          this.user_name = d.user_name
          this.user_id = d.user_id

          if (d.dorm_id && d.dorm_id !== '0') {
            this.from = 'dorm'
            this.dormInfo.dorm_id = d.dorm_id
            this.selInfoStr = d.dorm_building + ' ' + d.dorm_name
          }
          if (this.user_name) {
            this.selInfoStr = this.user_name
          } else {

          }
        }
      })
    },
    getAuthority () {
      this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/module`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          let d = data.result.all_module[0].module_ids
          this.behaviorEntrySchool = d.some(item => item === '203')
          this.behaviorEntryDorm = d.some(item => item === '211')
        } else {
          this.$simpleMsg('初始化录入权限失败')
        }
      })
    },
    postApprove () {
      let d = {
        rule_event_id: this.$route.query.eventId,
        approve_type: 'pass'
      }
      this.$preloaderFull.show()
      return this.$axios.post(`/palm/v2/appeal/approve`, d).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.$router.back()
        } else {
          // this.$simpleMsg('提交失败')
        }
        return data.status
      })
    },
    postNewTask () {
      let d = {
        'class_id': this.classId
      }
      // this.$preloaderFull.show()
      return this.$axios.post(`/classcard/v1/newTask`, d)
    },
    clearAll () { // 初始化数据
      if (Number(this.$route.params.type) === 3) {
        this.period_id = ''
        // this.behaviorEntrySchool = false // 学校录入权限
        // this.behaviorEntryDorm = false // 宿舍录入权限
        this.isEditor = false
        this.from = ''
        this.selInfoStr = ''
        this.rangeInfo = null // 行列信息
        this.classId = ''
        this.classStr = ''
        this.dormStr = ''
        this.dormInfo = {}
        this.studentListFromClass = []
        this.studentListFromDorm = []
        this.studentListFromSearch = []
        this.isShowSelectDate = false
        // this.time = ''
        this.institution = {} // 制度
        this.institutionList = [] // 制度列表
        this.textareaText = ''
        this.imgList = []
        this.attachmentList = []
        this.classIdList = []
        this.isPull = false // 制度多选时候用来判断是否下拉看更多
        this.reload()
      }
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  }
}
</script>

<style scoped>
.FormCom {
  margin-top: 12px;
}
.system-display {
  background: #ffffff;
  padding: 0 10px 10px 15px;
}
.system-item {
  font-size: 13px;
  color: #333;
  padding-top: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
/* .system-item:last-of-type {
  padding: 10px 0px 10px 0px;
} */
.system-ul {
  /* height: 60px; */
  overflow: hidden;
}
</style>


