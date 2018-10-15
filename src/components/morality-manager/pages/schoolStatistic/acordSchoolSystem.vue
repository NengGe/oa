<template>
  <div class="acord-school-system">
    <tabsSystem :msg="role===1?['选择年级', '选择制度', '选择时间']:['选择制度', '选择时间']" @transNum="transNum" @transGradeId="transGradeId" @firstClick="firstClick"></tabsSystem>
    <searchSystemItem :sysList="sysList"></searchSystemItem>
  </div>
</template>
<script>
import tabsSystem from '@/components/morality-manager/pages/schoolStatistic/tabsSystem'
import searchSystemItem from '@/components/morality-manager/pages/schoolStatistic/searchSystemItem'
import parseUrl from '@/components/classManager/assets/js/parseUrl.js'
export default {
  name: 'acordSchoolSystem',
  components: {
    tabsSystem,
    searchSystemItem
  },
  data () {
    return {
      gradeArgs: '',
      screenArgs: '',
      sysList: [],
      objArgs: {},
      role: 1,
      firstClickFlag: false
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
    transGradeId (obj) { // 根据年级Id
      this.gradeArgs = '&grade_id=' + obj.grade
      if (this.role === 1 && this.firstClickFlag) {
        this.getStatisticData()
      }
      // console.log(obj)
    },
    transNum ({timeNum, ruleId}) {
      // console.log(timeNum, ruleId)
      if (timeNum) {
        this.objArgs.range = timeNum
        // this.screenArgs = '&range=' + timeNum
      } else if (ruleId) {
        this.objArgs.rule_id = ruleId
        // this.screenArgs = '&ruleId=' + ruleId
      }
      this.screenArgs = parseUrl(this.objArgs, '&')
      this.getStatisticData()
    },
    initGradeArgs () {
      if (this.role === 2) {
        this.gradeArgs = '&class_id=' + this.$moralityBus.classId
        this.getStatisticData()
      }
    },
    getStatisticData () {
      this.getData('/palm/v2/campusstatistics?condition=rule' + this.screenArgs + this.gradeArgs).then(data => {
        // console.log(data)
        this.sysList = data.statistics
      })
    },
    firstClick () {
      if (this.role === 1 && this.firstClickFlag === false) {
        this.firstClickFlag = true
        this.getStatisticData()
      }
    }
  },
  created () {
    this.role = this.$moralityBus.role // @/assets/eventBus.js 找到role
    this.role === 1 && this.getStatisticData()
    this.initGradeArgs()
  }
}
</script>