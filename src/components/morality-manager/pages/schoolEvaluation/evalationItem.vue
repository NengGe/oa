<template>
  <div class="evalation-item">
    <!-- <LoaderRefresh> -->
    <bg></bg>
    <div class="evaluation-ul" v-if="evaluationList.school_rankings && evaluationList.school_rankings.length">
      <ul class="item-ul">
        <li class="item" v-for="(item, index) in evaluationList.school_rankings" :key="'eval'+index">
          <div class="current-eval-data"> <!-- 显示当前数据 --> 
            <div class="class-obj">
              <div class="left">
                <span class="grade">{{item.grade_name}}{{item.class_name}}</span>
                <span class="name">({{item.header_teacher_user_name || '周星驰'}})</span>
              </div>
              <div class="right">
                {{evaluationList.period_name}}
              </div>
            </div>
            <p class="star-name" v-for="(ele, index) in champions" :key="'star'+index">
              <span class="star-s" v-if="!item.honors.length">{{ele.name+': 未获得'}}</span>
              <span class="star-s" v-else>{{ele.name+': 获得'}}{{item.honors[index].sub_honor_name?'/'+item.honors[index].sub_honor_name:''}}</span>
            </p>
          </div>
          <div class="rest-eval-data" :class="[flag[index]?'':'h']"> <!-- 要显示的所有数据除了本次的以前的也要显示 -->
            <ul class="rest-ul">
              <li class="rest-item" v-for="(ele, index) in restDataList[item.class_id]" :key="'rest'+index">
                <div class="class-obj">
                  <div class="left">
                    <span class="grade">{{ele.grade_name}}{{ele.class_name}}</span>
                    <span class="name">({{ele.header_teacher_user_name || '周星驰'}})</span>
                  </div>
                  <div class="right">
                    {{ele.period_name}}
                  </div>
                </div>
                <p class="star-name" v-for="(element, index) in champions" :key="'star1'+index">
                  <span class="star-s" v-if="!ele.honors.length">{{element.name+': 未获得'}}</span>
                  <span class="star-s" v-else>{{element.name+': 获得'}}{{ele.honors[index].sub_honor_name?'/'+ele.honors[index].sub_honor_name:''}}</span>
                </p>
              </li>
            </ul>
          </div>
          <i class="iconfont-morality" @click="showAll(item.class_id, index)" :class="{'reg-180': flag[index]}">&#xe61c;</i>
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
      evaluationList: {},
      lastIndex: -1,
      champions: [],
      restDataList: {},
      flag: {}
    }
  },
  methods: {
    showAll (id, index) {
      this.$set(this.flag, index, !this.flag[index])
      if (this.restDataList[id] && this.restDataList[id].length) return
      this.restDataList[id] = []
      let restArr = this.evaluationData.period_school_rankings.slice(0, this.lastIndex) // 得到当前时段前面的所有数据
      // console.log(restArr)
      // console.log(id)
      restArr.forEach((ele) => { // 通过班级id去取
        let obj = {}
        obj.period = ele.period
        obj.period_name = ele.period_name
        ele.school_rankings.forEach((item) => {
          if (item.class_id === id) {
            for (var k in item) {
              obj[k] = item[k]
            }
          }
        })
        this.restDataList[id].unshift(obj)
      })
      this.$forceUpdate()
      // console.log(this.restDataList)
    }
  },
  watch: {
    evaluationData () {
      // console.log(this.evaluationData)
      this.lastIndex = parseInt(this.evaluationData.last_period_index)
      this.champions = this.evaluationData.champions
      this.evaluationList = this.lastIndex === -1 ? [] : this.evaluationData.period_school_rankings[this.lastIndex]
      // let restArr = this.evaluationData.period_school_rankings.slice(0, this.lastIndex)
    }
  },
  mounted () {
    // console.log(this.$listener)
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
.rest-eval-data {
  overflow: auto;
  transition: all .3s;
  height: 150px;
}
.h {
  height: 0;
}
.rest-eval-data .rest-item {
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px dashed #999999;
}
.reg-180 {
  transform: rotateX(180deg);
}
/* .pretty-star {
  display: inline-block;
  vertical-align: middle;
} */
</style>