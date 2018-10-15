<template>
  <div class="acord-group">
    <tabs :tabsList="['周', '四周', '月', '学期']" @getTabsIndex="getTabsIndex" class="eval-tabs-box"></tabs>
    <div class="tabs-content-box">
      <evaluationItem
       :time="time" 
       :allEvalList="allEvalList"
       ></evaluationItem>
    </div>
  </div>
</template>
<script>
import tabs from '@/components/classManager/components/tabs'
import evaluationItem from '@/components/classManager/evaluation/evaluationItem'
import $http from '@/components/classManager/assets/js/$http.js'

export default {
  name: 'acordGroup',
  components: {
    tabs,
    evaluationItem
  },
  data () {
    return {
      time: 0, // 0表示周 1表示4周 2表示月 3表示学期
      evaluationData: {},
      evaluationList: {},
      cacheList: {}, // 用来缓存数据 减少重复请求
      allEvalList: {} // 请求得到的所有数据
    }
  },
  methods: {
    getEvaluationList () {
      this.postData = $http.postData
      this.postData(this, '/palm/v2/classRanking', this.evaluationData, (data) => {
        this.allEvalList = data.period_class_rankings
        this.cacheList[this.evaluationData.ranking_period] = this.allEvalList
      })
    },
    getTabsIndex (index) {
      this.time = index
      switch (index) {
        case 0:
          this.evaluationData.ranking_period = 'week'
          break
        case 1:
          this.evaluationData.ranking_period = 'four_week'
          break
        case 2:
          this.evaluationData.ranking_period = 'month'
          break
        case 3:
          this.evaluationData.ranking_period = 'semester'
      }
      if (this.cacheList[this.evaluationData.ranking_period]) { // 如果有 则用缓存的数据
        this.allEvalList = this.cacheList[this.evaluationData.ranking_period]
        return
      }
      this.getEvaluationList()
      // window.alert(this.evaluationData.ranking_period)
    },
    getEvaluationData () {
      // const testId = '5013776864083419096' // 测试id
      this.evaluationData.ranking_period = 'week' // 初始值
      this.evaluationData.range_type = 'this_semester'
      this.evaluationData.dimension_type = this.$route.query.dimension_type || 1
      this.evaluationData.class_id = this.$managerBus.classId
      this.evaluationData.rule_type = 2
      this.evaluationData.rule_id = 0
    }
  },
  created () {
    this.getEvaluationData()
    this.getEvaluationList()
    // console.log(this.$route.query.dimension_type)
  }
}
</script>
<style scoped>
/* .tabs-content-box {
  margin-top: 10px;
} */
.eval-tabs-box {
  position: relative;
  z-index: 8;
}
</style>
