<template>
  <div class="choose-grade">
    <div class="choose-inner">
      <list-select attr="grade_name" :list="gradeList" @selectData="onGradeData" :currIndex="gradeIndex"></list-select>
    </div>
  </div>
</template>
<script>
import listSelect from '@/modules/list/list-select'
import sort from '@/components/morality-manager/assets/js/sortNumber.js'
import session from '@/components/morality-manager/assets/js/session.js'
export default {
  name: 'chooseGrade',
  components: {
    listSelect
  },
  data () {
    return {
      gradeIndex: 0,
      gradeList: [],
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
        this.transGradeId(d.value)
      }
    },
    getGradeInfo () {
      if (this.schoolClassData && this.schoolClassData.length) {
        this.gradeList = this.students = sort(this.schoolClassData, 'grade')
        this.gradeIndex = 0
      } else {
        this.getData('/palm/v2/teacherclasses').then(data => {
          this.gradeList = this.students = sort(data.grades, 'grade')
          this.gradeIndex = 0
          // console.log(this.classList)
        })
      }
    },
    transGradeId (obj) {
      this.$emit('transGradeId', obj)
    }
  },
  created () {
    this.getGradeInfo()
  },
  computed: {
    schoolClassData () {
      return JSON.parse(session.get('schoolClassData'))
    }
  }
}
</script>
<style scoped>
  .choose-grade {
    height: 250px;
  }
  .choose-inner {
    display: flex;
  }
</style>