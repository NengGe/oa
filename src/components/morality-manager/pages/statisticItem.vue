<template>
  <div class="statistic-item">
    <div class="statistic-box">
      <div class="statistics" @click="toDetails">
        <div class="inner-box">
          <div class="left">
            <i class="iconfont-morality statistic" v-gray="statisticsOrganization">&#xe657;</i>
          </div>
          <div class="right">
            <p class="right-p1" v-gray="statisticsOrganization">统计</p>
          </div>
        </div>
      </div>
      <div class="eval" @click="toEvalIndex">
        <div class="inner-box">
          <div class="left">
            <i class="iconfont-morality eval-icon" v-gray="evalOrganization">&#xe61b;</i>
          </div>
          <div class="right">
            <p class="right-p1" v-gray="evalOrganization">评比</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import local from '@/components/morality-manager/assets/js/localStore.js'
export default {
  name: 'statictisItem',
  props: {
    role: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isTrue: true
    }
  },
  methods: {
    toEvalIndex () { // 跳到评比页面
      if (this.evalOrganization) {
        this.$router.push({path: 'schoolEvaluationIndex', query: {role: this.role}}) // role 1代表门卫 学校主任 2代表班主任 科任老师
      }
    },
    toDetails () { // 跳到统计页面
      if (this.statisticsOrganization) {
        this.$router.push({path: 'schoolStatisticIndex', query: {role: this.role}})
      }
    }
  },
  computed: {
    statisticsOrganization () { // 查看统计权限
      return JSON.parse(local.get('schoolRoleOrganization')).statisticsOrganization
    },
    evalOrganization () { // 查看评比权限
      return JSON.parse(local.get('schoolRoleOrganization')).behaviorEvalOrganization
    }
  },
  created () {
    // this.statisticsOrganization = true
    // console.log(this.statisticsOrganization)
    // console.log(this.evalOrganization)
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
.statistic-item i.iconfont-morality {
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

