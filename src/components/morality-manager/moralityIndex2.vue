<template>
  <div class="morality-index2">
    <div class="sidebar">
      <div class="bar-inner" v-if="role==='repeatRole'">
        <div class="changeIcon" @click="$emit('changePage')">
          <i class="iconfont-morality">&#xe60d;</i>
        </div>
      </div>
    </div>
    <div class="classList">
      <selectClass :indexData="indexData" :refreshClass="getBehaviorData" @transClassId="transClassId"></selectClass>
    </div>
    <div class="score-outer">
      <div class="add-score">
        <p class="num num1">{{score.bonus_point}}</p>
        <p class="score-p">加分</p>
      </div>
      <div class="amount">
        <p class="num num2">{{score.total_point}}</p>
        <p class="score-p">总分</p>
      </div>
      <div class="increase-score">
        <p class="num num3">{{score.deduct_point}}</p>
        <p class="score-p">减分</p>
      </div>
    </div>
    <statisticItem role="2"></statisticItem>
    <div class="record">
      <div class="record-left">
        学校行为
      </div>
      <div class="center">
      </div>
      <div class="record-right">
        <router-link class="record-a" :to="{path: 'schoolEntryMore', query: {condition: 'school'}}">更多</router-link>
      </div>
    </div>
    <nomoreBehaviorItem :recordList="recordList" @toAppDetails="toAppDetails"></nomoreBehaviorItem>
  </div>
</template>
<script>
import selectClass from '@/components/morality-manager/pages/selectClass'
import appealItem from '@/components/morality-manager/pages/appealItem'
import statisticItem from '@/components/morality-manager/pages/statisticItem'
import nomoreBehaviorItem from '@/components/morality-manager/components/nomoreBehaviorItem'
import more from '@/components/morality-manager/pages/schoolEntryDetails/more'
import dateTo from '@/components/morality-manager/assets/js/dateTo.js'
export default {
  name: 'moralityIndex2',
  props: {
    indexData: {
      type: Object,
      default () {
        return {}
      }
    },
    role: String
  },
  components: {
    appealItem,
    statisticItem,
    nomoreBehaviorItem,
    selectClass,
    more
  },
  data () {
    return {
      recordList: [],
      score: {},
      classId: ''
    }
  },
  methods: {
    getData (url) {
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
    getBehaviorData (classId) {
      this.getData('/palm/v2/eventrecord?page=1&size=25&condition=school&class_id=' + classId).then(data => {
        this.recordList = data.records
        this.recordList.forEach(ele => {
          ele.event_date = dateTo(ele.event_date)
        })
        // console.log(this.recordList)
      })
    },
    toAppDetails (item) {
      // console.log(item)
      this.$router.push({ path: 'teacherSchoolactionDetails', query: { event_id: item.event_id } })
    },
    transClassId (id) {
      this.classId = id
    },
    getCurrScore () { // 得到当天班级分数
      this.getData('/palm/v2/event/classscore?class_id=' + this.classId).then(({data}) => {
        // console.log(data)
        this.score = data
      })
    }
  },
  watch: {
    classId () {
      this.getCurrScore()
    }
  },
  created () {
    // this.score = this.indexData.score
    // console.log(this.indexData)
  },
  activated () { // 当保存或者删除行为数据时候更新分数
    this.getCurrScore()
  }
}
</script>

<style scoped>
.morality-index2 {
  background-color: #f7f7f9;
  position: relative;
  width: 100%;
}
.morality-index2 /deep/ .iconfont-morality {
  font-family: "iconfont-morality";
  font-size: 32px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
}
.sidebar {
  position: absolute;
  width: 24px;
  background-color: #9cc2ff;
  -webkit-box-shadow: 0px 1.5px 3.5px 0px rgba(2, 10, 19, 0.15);
  box-shadow: 0px 1.5px 3.5px 0px rgba(2, 10, 19, 0.15);
  border-radius: 10px 0px 0px 10px;
  opacity: 0.8;
  right: 0px;
  top: 25px;
  padding: 0px 8px;
}
.bar-inner {
  padding: 10px 0px;
  /* display: flex;
  align-items: center; */
  text-align: center;
}
.bar-inner i.iconfont-morality {
  display: inline-block;
  font-size: 18px;
}
.record {
  margin-top: 11.5px;
  background-color: #ffffff;
  height: 54px;
  line-height: 54px;
  display: flex;
  justify-content: space-between;
  padding: 0px 16px;
  border-bottom: 1px solid #f9f2f2;
}
.record-left {
  font-size: 15px;
  color: #333333;
  font-weight: bold;
}
.record-a {
  /* display: inline-block; */
  color: #999999;
  font-size: 13px;
}
.record-a:last-of-type {
  margin-left: 11px;
}
.classList {
  background: #ffffff;
  display: flex;
  justify-content: center;
}
.score-outer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #ffffff;
  padding: 40px 0px 32px 0px;
  margin-bottom: 11.5px;
}
.score-outer .num{
  font-size: 18px;
  font-weight: bold;
}
.score-outer .score-p{
  font-size: 13px;
  color: #666666;
  margin-top: 18px;
  text-align: center;
}
.num1 {
  color: #37c3c8;
}
.num2 {
  color: #c699ff;
}
.num3 {
  color: #ed5564;
}
</style>
