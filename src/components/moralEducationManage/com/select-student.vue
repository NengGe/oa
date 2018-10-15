<template>
  <transition name="slide-bottom" enter-active-class="transition-active" leave-active-class="transition-active">
    <div class="select-student page-fixed" v-show="isShow">
      <selectClass ref="selectClass" @getClassInfo='d=>classInfo=d'></selectClass>
      <oa-tabHead2 :list="tabList" @action="(item,i)=>tabAction(item,i)" :currIndex="currIndex"></oa-tabHead2>

      <listStudent v-if="currIndex===0" ref="listStudent" :classId='classInfo.class_id'></listStudent>
      <listStudentSite v-if="currIndex===1" ref="listStudentSite" :classId='classInfo.class_id'></listStudentSite>
      <listStudentRange v-if="currIndex===2" ref="listStudentRange" :classId='classInfo.class_id'></listStudentRange>
      <!-- <Selected attr='user_name' :data='selectList'></Selected> -->
      <div class="confirm clickActive2" @click="confirm">确定</div>
    </div>
  </transition>
</template>

<script>
import selectClass from './select-class'
import listStudent from './list-student'
import listStudentSite from './list-student-site'
import listStudentRange from './list-student-range'
import Selected from './Selected'
export default {
  components: {
    selectClass,
    listStudent,
    Selected,
    listStudentSite,
    listStudentRange
  },
  data () {
    return {
      currIndex: 0,
      tabList: ['姓名·学号', '按座位', '按行列'],
      isShow: false,
      classInfo: {}
    }
  },
  created () {
    console.log('选学生created')
  },
  methods: {
    tabAction (item, i) {
      this.currIndex = i
    },
    show ({ selectedClass, studentList, onConfirm }) {
      this.isShow = true
      this.onConfirm = onConfirm
      selectedClass && this.initSelClass(selectedClass)
      studentList && studentList[0] && this.initSelStu(studentList)
    },
    confirm () {
      let d = this.getSelData()
      this.isShow = this.onConfirm(d) === false
    },
    getSelData () {
      let d = {}
      d.classInfo = this.classInfo
      if (this.currIndex === 0) {
        d.studentList = this.$refs.listStudent.getSelectList()
      } else if (this.currIndex === 1) {
        d.studentList = this.$refs.listStudentSite.getSelectList()
      } else {
        d.rangeInfo = this.$refs.listStudentRange.getRangeInfo()
      }
      return d
    },
    initSelStu (d) {
      this.$refs.listStudent.initSelStu(d)
      let grade = d[0].grade
      let classId = d[0].class_id
      this.initSelClass({ grade, classId })
    },
    initSelClass (d) {
      this.$refs.selectClass.initSelClass(d)
    }
  }
}
</script>

<style scoped>
.select-student {
  background: #fff;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.confirm {
  width: 100%;
  height: 54px;
  background-color: #88b8f8;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  line-height: 54px;
  text-align: center;
}
</style>
