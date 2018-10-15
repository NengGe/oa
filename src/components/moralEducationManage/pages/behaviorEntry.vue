<template>
  <div class="behavior-entry">
    <!-- 姓名/学号  搜索 -->
    <selectStudentUIByName v-if="this.$route.params.type==1" @change='(d)=>studentList=d'></selectStudentUIByName>
    <!-- 扫一扫  学号 -->
    <selectStudentUIByScan v-else-if="this.$route.params.type==2" @change='(d)=>studentList=d'></selectStudentUIByScan>
    <!-- 宿舍/班级  选择 -->
    <FormCom class="FormCom" v-else-if="this.$route.params.type==3">
      <selectStudentUI class="selectStudent" :text="selInfoStr" @byDorm='selStudentFromDorm' @byClass='selStudent'></selectStudentUI>
    </FormCom>
    <!-- 不可更改  对象 -->
    <FormCom class="FormCom" v-else-if="this.$route.params.type==4">
      <cell text title="对象" :content="'张三三'"></cell>
    </FormCom>
    <FormCom class="FormCom">
      <cell button title="制度" :content="institution.name" @action="selRule"></cell>
    </FormCom>
    <!-- 说明 + 附件 -->
    <TextareaCom placeholder="请输入说明" :content.sync='textareaText' :imgList="imgList"></TextareaCom>
    <FormCom class="FormCom">
      <cell button title="时间" :content="time" @action="()=>isShowSelectDate = true"></cell>
    </FormCom>
    <!-- 确定 -->
    <CommitBtnCom @action="commitBtnAction"></CommitBtnCom>
    <SlideSelectDate :show.sync='isShowSelectDate' :value.sync='time'></SlideSelectDate>
    <!-- 选择学生 -->
    <selectStudent ref='selectStudent'></selectStudent>
    <selectStudentDorm ref='selectStudentDorm'></selectStudentDorm>
    <selectRule ref='selectRule'></selectRule>
  </div>
</template>

<script>
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
    selectStudentDorm
  },
  data () {
    return {
      selInfoStr: '',
      rangeInfo: null, // 行列信息
      classId: '',
      classStr: '',
      dormStr: '',
      studentList: [],
      isShowSelectDate: false,
      time: '',
      institution: {}, // 制度
      textareaText: '',
      imgList: []
    }
  },
  methods: {
    // aaa () {
    //   this.$preloaderFull.show()
    //   return this.$axios.post(`/aaaaaa`).then((d) => {
    //     this.$preloaderFull.close()
    //     console.log('arguments-aaa', d)
    //     // if (data.status === 200) {
    //     //   console.log('arguments-aaa', arguments)
    //     // }
    //   })
    // },
    commitBtnAction () {
      console.log(this.studentList)
      this.postData()
      // this.aaa()
    },
    selStudent () {
      this.$refs.selectStudent.show({
        // selectedClass: {
        //   grade: '1108',
        //   classId: '5277078851935680208'
        // },
        studentList: this.studentList,
        onConfirm: d => {
          let { classInfo, studentList, rangeInfo } = d
          this.classId = classInfo.class_id
          this.classStr = classInfo.classStr
          this.studentList = studentList
          this.rangeInfo = rangeInfo
          this.getSelInfo(d)
        }
      })
    },
    getSelInfo (d) {
      let { classInfo, studentList, rangeInfo } = d
      let text = ''
      text += classInfo.classStr + ' '
      studentList && studentList.forEach(item => (text += ` ${item.user_name}`))
      rangeInfo && (text += rangeInfo.text)
      this.selInfoStr = text
    },
    selStudentFromDorm () {
      this.$refs.selectStudentDorm.show({
        // selectedClass: {
        //   grade: '1108',
        //   classId: '5277078851935680208'
        // },
        studentList: this.studentList,
        onConfirm: d => {
          this.studentList = d
          console.log(d)
        }
      })
    },
    selRule () {
      this.$refs.selectRule.show({
        studentList: this.studentList,
        confirm: d => {
          this.institution = d[0]
        }
      })
    },
    postData () {
      let { studentList, textareaText, time, imgList, institution, classId, rangeInfo } = this
      let { id, score } = institution
      let d = {
        users: studentList,
        event_id: '0',
        class_id: classId,
        rule_item_id: id,
        description: textareaText,
        type: '1',
        event_date: time,
        score: score,
        source: '3',
        image_url: imgList.join(',')
      }
      rangeInfo && (d.description += ' ' + rangeInfo.text)
      this.$preloaderFull.show()
      return this.$axios.post(`/palm/v2/rules`, d).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style scoped>
.FormCom {
  margin-top: 12px;
}
</style>


