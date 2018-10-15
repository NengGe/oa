<template>
  <div class="schoolEvaluationIndex">
    <tabs :tabsList="tabsList" @getTabsIndex="getTabsIndex"></tabs>
    <div class="eval-item-box role1" v-if="role==='1'"> <!--门卫 学校主任等角色 -->
      <evalationItem 
        :evaluationData="allEvaList" 
        v-for="(item, index) in arrList"
        :key="index"
        v-show="ind===index"
      ></evalationItem>
    </div>
    <div class="eval-item-box role2" v-if="role==='2'"> <!--班主任、任课老师等角色 -->
      <evalationItem2
        :evaluationData="allEvaList" 
        v-for="(item, index) in arrList"
        :key="index"
        v-show="ind===index"
      ></evalationItem2>
    </div>
  </div>
</template>
<script>
import tabs from '@/components/morality-manager/components/tabs'
import evalationItem from '@/components/morality-manager/pages/schoolEvaluation/evalationItem'
import $http from '@/components/morality-manager/assets/js/$http.js'
import evalationItem2 from '@/components/morality-manager/pages/schoolEvaluation/evalationItem2'
export default {
  name: 'schoolEvaluationIndex',
  components: {
    tabs,
    evalationItem,
    evalationItem2
  },
  data () {
    return {
      tabsList: ['周', '四周', '月', '本学期'],
      thisTime: 'week',
      gradeId: '1102',
      cacheList: {}, // 缓存数据
      allEvaList: {},
      arrList: new Array(4),
      ind: 0,
      role: ''
    }
  },
  methods: {
    getTabsIndex (index) {
      if (index === 0) {
        this.thisTime = 'week'
      } else if (index === 1) {
        this.thisTime = 'four_week'
      } else if (index === 2) {
        this.thisTime = 'month'
      } else if (index === 3) {
        this.thisTime = 'semester'
      }
      this.ind = index
      if (this.cacheList[this.thisTime]) {
        this.allEvaList = this.cacheList[this.thisTime]
        return
      }
      this.getEvaluationData()
      // this.cacheList[this.thisTime] =
    },
    getPostJson () {
      let obj = {}
      obj.range_type = 'this_semester'
      obj.grade_id = this.gradeId
      obj.ranking_period = this.thisTime
      return obj
    },
    getEvaluationData () {
      let postData = $http.postData
      let data = this.getPostJson()
      postData(this, '/palm/v2/schoolRanking', data, (data) => {
        this.allEvaList = data.period_school_rankings
        this.cacheList[this.thisTime] = this.allEvaList
        // console.log(data)
        // console.log(data)
      })
    }
  },
  created () {
    this.role = this.$route.query.role
    this.getEvaluationData()
  }
}
</script>

<style scoped>
  .schoolEvaluationIndex /deep/ .iconfont-morality {
    font-family: "iconfont-morality";
    /* font-size: 32px; */
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #ffffff;
  }
  .eval-item-box {
    margin-top: 10px;
  }
</style>