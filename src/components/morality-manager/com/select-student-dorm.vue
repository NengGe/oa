<template>
  <transition name="slide-bottom" enter-active-class="transition-active" leave-active-class="transition-active">
    <div class="select-student-dorm page-fixed" v-show="isShow">
      <selectDorm ref="selectClass" @getDormInfo='getDormInfo'></selectDorm>
      <!-- <oa-tabHead2 :list="tabList" @action="(item,i)=>tabAction(item,i)" :currIndex="currIndex"></oa-tabHead2> -->

      <listStudent v-if="currIndex===0" ref="listStudent" :dormId='dormInfo.dorm_id'></listStudent>
      <!-- <listStudentSite v-if="currIndex===1" ref="listStudentSite" :classId='dormInfo.class_id'></listStudentSite>
      <listStudentRange v-if="currIndex===2" ref="listStudentSite" :classId='dormInfo.class_id'></listStudentRange> -->
      <!-- <Selected attr='user_name' :data='selectList'></Selected> -->
      <div class="confirm" @click="confirm">确定</div>
    </div>
  </transition>
</template>

<script>
import selectDorm from './select-dorm'
import listStudent from './list-student2'
import listStudentSite from './list-student-site'
import listStudentRange from './list-student-range'
import Selected from './Selected'
export default {
  components: {
    selectDorm,
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
      dormInfo: {}
    }
  },
  created () {
    console.log('选学生created')
  },
  methods: {
    getDormInfo (d) {
      console.log(d)
      this.dormInfo = d
    },
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
      console.log(d)
      this.isShow = this.onConfirm(d) === false
    },
    getSelData () {
      let d = {}
      d.dormInfo = this.dormInfo
      d.classId = this.$refs.listStudent.studentList[0].class_id
      d.studentList = this.$refs.listStudent.getSelectList()
      console.log(d)
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
.select-student-dorm {
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
