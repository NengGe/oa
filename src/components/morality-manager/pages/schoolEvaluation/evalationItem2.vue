<template>
  <div class="evalation-item">
    <!-- <LoaderRefresh> -->
    <bg></bg>
    <div class="evaluation-ul" v-if="evaluationList.length">
      <ul class="item-ul">
        <li class="item" v-for="(item, index) in evaluationList" :key="'teacheeEval'+index">
          <div class="current-eval-data"> <!-- 显示当前数据 --> 
            <div class="class-obj">
              <div class="left">
                <span class="grade">{{item.grade_name}}{{item.class_name}}</span>
                <span class="name">({{item.header_teacher_user_name || '周星驰'}})</span>
              </div>
              <div class="right">
                {{item.period_name}}
              </div>
            </div>
            <p class="star-name" v-for="(ele, index) in champions" :key="'star'+index">
              <span class="star-s" v-if="!item.honors.length">{{ele.name+': 未获得'}}</span>
              <span class="star-s" v-else>{{ele.name+': 获得'}}{{item.honors[index].sub_honor_name?'/'+item.honors[index].sub_honor_name:''}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="no-data" v-else>没有更多数据......</div>
    <!-- </LoaderRefresh> -->
  </div>
</template>
<script>
// import LoaderRefresh from '@/modules/loader-refresh/LoaderRefresh'
import bg from '@/components/classManager/components/bg.vue'
export default {
  name: 'evalationItem',
  components: {
    bg
  },
  props: {
    evaluationData: Object
  },
  data () {
    return {
      evaluationList: [],
      lastIndex: -1,
      champions: [],
      classId: ''
    }
  },
  methods: {
    showAll (id, index) {
    }
  },
  watch: {
    evaluationData () {
      // console.log(this.evaluationData)
      this.evaluationList = [] // 清空上次的数据
      this.lastIndex = parseInt(this.evaluationData.last_period_index)
      this.champions = this.evaluationData.champions
      let arrList = this.evaluationData.period_school_rankings
      arrList.forEach((ele, index) => {
        if (index <= this.lastIndex) {
          let timeObj = {}
          timeObj.period = ele.period
          timeObj.period_name = ele.period_name
          ele.school_rankings.forEach(item => {
            if (this.classId === item.class_id) {
              for (var k in item) {
                timeObj[k] = item[k]
              }
            }
          })
          this.evaluationList.push(timeObj)
        }
      })
      // console.log(this.evaluationList)
      // let restArr = this.evaluationData.period_school_rankings.slice(0, this.lastIndex)
    }
  },
  mounted () {
    // console.log(this.$listener)
  },
  created () {
    this.classId = this.$managerBus.classId
    // console.log(this.evaluationData)
  }
}
</script>

<style scoped>
.evalation-item {
}
.no-data {
  text-align: center;
  padding: 10px 0px;
}
.item-ul {
  background: #ffffff;
}
.item {
  padding: 16px 14px 21px 14px;
  border: 0.5px solid #f7f7f9;
  position: relative;
}
.evalation-item i.iconfont-morality {
  font-size: 20px;
  color: #999999;
  position: absolute;
  right: 20px;
  bottom: 5px;
  transition: all 0.3s;
}
.class-obj {
  display: flex;
  margin-bottom: 16px;
}
.class-obj .left {
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.class-obj .right {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.grade,
.name {
  font-size: 18px;
  color: #555555;
  font-weight: bold;
}
.name {
  margin-left: 8px;
  color: #999999;
}
.right,
.star-name {
  color: #999999;
  font-size: 13px;
}
.star-name {
  margin-bottom: 17px;
}
.star-name:last-of-type {
  margin-bottom: 0px;
}
</style>