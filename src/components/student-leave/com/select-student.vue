<template>
  <transition name="slide-bottom" enter-active-class="transition-active" leave-active-class="transition-active">
    <div class="select-student page-fixed" v-show="isShow">
      <selectClass ref="selectClass" @getClassInfo='d=>classInfo=d'></selectClass>
      <listStudent ref="listStudent" :classId='classInfo.class_id'></listStudent>
      <!-- <Selected attr='user_name' :data='selectList'></Selected> -->
      <div class="confirm" @click="confirm">确定</div>
    </div>
  </transition>
</template>

<script>
import selectClass from '@/components/student-leave/com/select-class'
import listStudent from '@/components/student-leave/com/list-student'
import Selected from '@/components/student-leave/com/Selected'
export default {
  components: {
    selectClass,
    listStudent,
    Selected
  },
  data () {
    return {
      isShow: false,
      classInfo: {}
    }
  },
  created () {
    console.log('选学生created')
  },
  methods: {
    show ({ selectedClass, studentList, onConfirm }) {
      this.isShow = true
      this.onConfirm = onConfirm
      selectedClass && this.initSelClass(selectedClass)
      studentList && studentList[0] && this.initSelStu(studentList)
    },
    confirm () {
      let selectList = this.$refs.listStudent.getSelectList()
      this.isShow = this.onConfirm(selectList) === false
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
