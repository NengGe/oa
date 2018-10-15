<template>
  <div class="evaluation-item">
    <allInfo :show.sync="isInfo" @changeShow="isInfo=!isInfo" :allPersonList="allPersonList"></allInfo>
    <ul class="evaluation-ul" v-if="evaluationList.class_rankings && evaluationList.class_rankings.length">
      <li class="item"
        v-for="(item, index) in evaluationList.class_rankings"
        :key="index"
       >
        <span class="order-num">{{index+1}}</span>
        <div class="object">
          <span class="objec-class">{{gradeName}}{{className}}</span>
          <span class="object-name">（{{item.name || ''}}）</span>
        </div>
        <!-- 根据不同时段显示不同的时段信息 -->
        <div class="time-choice">
          <span v-if="evaluationList.period==='week'">{{evaluationList.period_name}}</span>
          <fourWeek v-if="evaluationList.period==='four_week'" :weekList="evaluationList.period_name"></fourWeek>
          <span v-if="evaluationList.period==='month'">{{evaluationList.period_name.substr(0, 2)}}</span>
          <div class="semester-box" v-if="evaluationList.period==='semester'">
            <div class="top-s">{{evaluationList.period_name.substr(0, 4)}}</div>
            <div class="bottom-s">({{evaluationList.period_name.substr(5, 9)}})</div>
          </div>
        </div>
        <span class="acount">{{item.score}}</span>
        <i class="iconfont" @click="show(item.student_no_or_group_id)" v-if="parseInt(lastIndex) > 0">&#xe634;</i>
      </li>
    </ul>
    <div class="no-data" v-else>没有更多数据...</div>
  </div>
</template>
<script>
import fourWeek from '@/components/classManager/evaluation/fourWeek'
import allInfo from '@/components/classManager/evaluation/allInfo'
import local from '@/components/classManager/assets/js/localStore.js'
export default {
  name: 'evaluationItem',
  components: {
    fourWeek,
    allInfo
  },
  props: {
    time: {
      type: Number
    },
    allEvalList: {
      type: Object,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isInfo: false,
      isShowAll: false,
      student_or_group_id: '',
      allPersonList: [],
      evaluationList: {}
    }
  },
  methods: {
    show (id) {
      this.isInfo = !this.isInfo
      this.student_or_group_id = id
      let {lastIndex} = this
      let classRankingList = this.allEvalList.period_class_rankings.slice(0, lastIndex + 1)
      let arr = []
      // console.log(classRankingList)
      classRankingList.forEach((ele) => {
        let newRankingList = {}
        newRankingList['period'] = ele.period
        newRankingList['period_name'] = ele.period_name
        // console.log(ele)
        ele.class_rankings.forEach((item) => {
          if (item.student_no_or_group_id === this.student_or_group_id) {
            newRankingList.name = item.name
            newRankingList.ranking = item.ranking
            newRankingList.score = item.score
            newRankingList.student_no_or_group_id = item.student_no_or_group_id
          }
        })
        arr.push(newRankingList)
      })
      this.allPersonList = arr
      // console.log(this.allPersonList)
      // console.log(classRankingList)
    },
    evaluationListGet () { // 得到evalutationList
      this.lastIndex = parseInt(this.allEvalList.last_period_index)
      this.evaluationList = this.lastIndex === -1 ? {} : this.allEvalList.period_class_rankings[this.lastIndex] // -1表示没有数据
      // console.log(this.allEvalList)
    }
  },
  watch: {
    allEvalList () {
      this.evaluationListGet()
      // console.log(this.allEvalList)
    }
  },
  computed: {
    className () {
      return JSON.parse(local.get('gradeClassInfo')).className
    },
    gradeName () {
      return JSON.parse(local.get('gradeClassInfo')).gradeName
    }
  },
  created () {
    // console.log(this.allEvalList)
  }
}
</script>
<style scoped>
.evaluation-item {
  margin-top: 10px;
  background: #ffffff;
}
.evaluation-ul .item {
  height: 55px;
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  font-size: 14px;
  border-bottom: 1px solid #f9f4f4;
}
.order-num, .object-class {
  color: #333333;
}
.object-name, .time-choice {
	color: #999999;
}
.acount {
  color: #ff6600;
}
.item i.iconfont {
  color: #888888;
}
.order-num, .object, .time-choice, .acount, .iconfont {
  flex: 1 1;
  text-align: center;
  display:flex;
  justify-content: center;
  align-items: center;
}
.object{
  flex: 3 1;
}
 .time-choice {
   flex: 2 1
 }
.semester-box div{
  color: #999999;
  font-size: 12px;
}
.no-data {
  background: #f7f7f9;
  text-align: center;
}
</style>