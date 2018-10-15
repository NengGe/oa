<template>
  <div class="select-class">
    <VMask @click="isDisplay=!isDisplay" v-show="isDisplay"></VMask>
    <div class="class-choice-inner">
      <div class="choice-head">
        <div class="class-block" @click="showClassList">
          <span class="grade">{{gradeName}}{{className}}</span>
          <i class="iconfont-morality pulldown">&#xe601;</i>
        </div>
      </div>
      <div class="grade-info" :class="{'activeH': isDisplay}">
        <listSelect attr="grade_name" :list="gradeList" @selectData="onGradeData" :currIndex="gradeIndex"></listSelect>
        <listSelect attr="alias" :list="classList" @selectData="onClassData" :currIndex="classIndex"></listSelect>
      </div>
    </div>
  </div>
</template>
<script>
import listSelect from '@/modules/list/list-select'
import VMask from '@/modules/mask/VMask'
// const grade = [
//   {
//     grade_id: '1101',
//     grade_name: '一年级',
//     classes: [
//       {
//         class_name: '2班',
//         class_id: '0102'
//       },
//       {
//         class_name: '3班',
//         class_id: '0103'
//       }
//     ]
//   },
//   {
//     grade_id: '1102',
//     grade_name: '二年级',
//     classes: [
//       {
//         class_name: '1班',
//         class_id: '0201'
//       },
//       {
//         class_name: '2班',
//         class_id: '0202'
//       }
//     ]
//   }
// ]
export default {
  name: 'selectClass',
  props: {
    indexData: {},
    refreshClass: {
      type: Function,
      default () {
        return function () {}
      }
    }
  },
  components: {
    listSelect,
    VMask
  },
  data () {
    return {
      gradeIndex: 0,
      classIndex: 0,
      gradeList: [],
      classList: [],
      gradeName: '',
      className: '',
      isDisplay: false,
      classId: '',
      gradeId: '',
      flag1: true,
      flag2: true,
      headerTeacherList: [] // 班主任班级列表
    }
  },
  methods: {
    onGradeData (d) {
      if (d.value) {
        this.gradeName = d.value.grade_name
        this.classList = d.value.class_list
      }
    },
    onClassData (d) {
      // console.log(d.value)
      if (d.value) {
        this.className = d.value.alias
        this.classId = d.value.id
        this.$moralityBus.classId = this.classId
        this.$emit('transClassId', this.classId)
        // console.log(this.$moralityBus.classId)
      }
    },
    showClassList () {
      this.isDisplay = !this.isDisplay
    },
    initClassData () {
      this.gradeList = this.indexData.grade_list
      this.headerTeacherList = this.indexData.head_teacher_class_list
      if (this.hederTeacherList && this.hederTeacherList.length) { // 说明是班主任
        this.gradeName = this.headerTeacherList[0].grade_name
        this.className = this.headerTeacherList[0].alias
        this.gradeId = this.headerTeacherList[0].grade_id
        this.classId = this.headerTeacherList[0].id
        this.gradeList.forEach((ele, index) => {
          if (ele.grade_id === this.gradeId) {
            this.gradeIndex = index
          }
        })
        this.classList = this.gradeList[this.gradeIndex].class_list
        this.classList.forEach((ele, index) => {
          if (ele.id === this.classId) {
            this.classIndex = index
          }
        })
      } else { // 说明不是班主任
        this.gradeList = this.indexData.grade_list
        this.gradeName = this.gradeList[0].grade_name
        this.classList = this.gradeList[0].class_list
        this.className = this.classList[0].alias
        // console.log(this.classList)
      }
    }
  },
  created () {
    // setTimeout(() => {
    this.initClassData()
    // }, 0)
  },
  activated () {
    this.refreshClass && this.refreshClass(this.classId)
  },
  watch: {
    classId () {
      this.refreshClass && this.refreshClass(this.classId)
    }
  }
}
</script>
<style scoped>
  .select-class {
    position: relative;
    width: 100%;
  }
  .class-block {
    width: 120px;
    height: 25px;
    display: flex;
    background-color: #f8ab59;
    border-radius: 12.5px;
    /* margin-top: 22px; */
    line-height: 25px;
    /* text-align: center; */
    align-items: center;
    justify-content: center;
  }
  .choice-head {
    display: flex;
    justify-content: center;
  }
  .class-choice-inner {
    height: 25px;
    position: relative;
    z-index: 10;
    background: #ffffff;
    /* overflow: hidden; */
  }
  .class-block .grade {
    color: #ffffff;
  }
  .select-class i.iconfont-morality {
    font-size: 22px;
  }
  .grade-info {
    height: 0;
    width: 100%;
    transition: all 0.3s;
    display: flex;
    background: #ffffff;
    overflow: hidden;
  }
  .activeH {
    height: 250px;
  }
</style>

