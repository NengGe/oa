<template>
  <div class="statistic-item">
    <div class="statistic-box">
      <div class="statistics" @click="toDetails">
        <div class="inner-box">
          <div class="left">
            <i class="iconfont statistic" v-gray="true">&#xe657;</i>
          </div>
          <div class="right">
            <!-- @click="$router.push({path:'statisticIndex'})" -->
            <p class="right-p1" v-gray="true">统计</p>
          </div>
        </div>
      </div>
      <div class="eval" @click="toEvalIndex">
        <div class="inner-box">
          <div class="left">
            <i class="iconfont eval-icon">&#xe61b;</i>
          </div>
          <div class="right">
            <p class="right-p1" @click="$router.push({path: 'evaluationIndex'})">评比</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'statictisItem',
  props: {
  },
  data () {
    return {
    }
  },
  methods: {
    toEvalIndex () { // 跳到评比页面
      // this.$router.push('/teacherIndex/evalationIndex')
    },
    toDetails () {
      this.$router.push({path: 'statisticIndex'})
    }
  },
  watch: {
  }
}
</script>

<style scoped>
.statistic-item {
  /* height: 102px; */
  margin-top: 11.5px;
  padding: 10px 0px;
  background-color: #ffffff;
  /* width: 100%; */
}
.statistic-box {
  height: 82px;
  display: flex;
}
.statistics {
  width: 49%;
  height: 100%;
  border-right: 1px solid #cecaca;
}
.eval {
  width: 50%;
  height: 100%;
}
.inner-box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.statistic-item i.iconfont {
  display: inline-block;
  color: #37c3c8;
  font-size: 36px;
}
.statistic-item i.eval-icon {
  color:#b084f9;
}
.right {
  margin-left: 23px;
}
.right-p1 {
  font-family: PingFang-SC-Bold;
  font-size: 18px;
  font-weight: bold;
 	color: #666666;
}
.right-p2 {
  font-family: PingFang-SC-Bold;
  font-size: 12px;
  color: #999999;
  margin-top: 7px;
}
</style>