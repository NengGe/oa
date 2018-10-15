<template>
  <div class="choose-class">
    <div class="choose-inner">
      <list-select attr="grade_name" :list="gradeList" @selectData="onGradeData" :currIndex="gradeIndex"></list-select>
      <list-select attr="class_name" :list="classList" @selectData="onClassData" :currIndex="classIndex"></list-select>
    </div>
  </div>
</template>
<script>
import listSelect from '@/modules/list/list-select'
import sort from '@/components/morality-manager/assets/js/sortNumber.js'
import session from '@/components/morality-manager/assets/js/session.js'
export default {
  name: 'chooseClass',
  components: {
    listSelect
  },
  data () {
    return {
      gradeIndex: 0,
      classIndex: 0,
      gradeList: [],
      classList: [],
      students: []
    }
  },
  methods: {
    getData (url) {
      this.$preloaderFull.show({ mask: true })
      return this.$axios.get(url).then(({ data }) => {
        // console.log(data)
        this.$preloaderFull.close()
        if (data.status === 200) {
          return data.result
        } else {
          return Promise.reject(new Error(data.message))
        }
      }).catch((erro) => {
        this.$preloaderFull.close()
        console.log(erro)
      })
    },
    onGradeData (d) {
      // console.log(d)
      if (d.value) {
        this.classList = d.value.classes
      }
    },
    onClassData (d) {
      if (d.value) {
        // console.log(d.value)
        this.transClassId(d.value)
      }
      // console.log(d)
    },
    getGradeInfo () {
      if (this.schoolClassData && this.schoolClassData.length) {
        this.gradeList = this.students = sort(this.schoolClassData, 'grade')
        this.classList = this.gradeList[0].classes
        this.gradeIndex = 0
        this.classIndex = 0
      } else {
        this.getData('/palm/v2/teacherclasses').then(data => {
          // console.log('********1111')
          // console.log(data)
          this.gradeList = this.students = sort(data.grades, 'grade')
          session.set('schoolClassData', data.grades)
          this.classList = this.gradeList[0].classes
          this.gradeIndex = 0
          this.classIndex = 0
          // console.log(this.classList)
        })
      }
    },
    transClassId (obj) {
      this.$emit('transClassId', obj)
    }
  },
  created () {
    // console.log(this.schoolClassData)
    this.getGradeInfo()
  },
  computed: {
    schoolClassData () {
      return JSON.parse(session.get('schoolClassData')) || []
    }
  }
}
</script>
<style scoped>
  .choose-class {
    height: 250px;
  }
  .choose-inner {
    display: flex;
  }
</style>