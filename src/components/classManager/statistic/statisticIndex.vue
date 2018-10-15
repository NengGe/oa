<template>
  <div class="statistic-index">
    <tabs @condition="getCondition"></tabs>
    <staticSearch @time="getTime"></staticSearch>
    <systemItem :sysList="sysList" :type="condition"></systemItem>
  </div>
</template>
<script>
import tabs from '@/components/classManager/statistic/tabs'
import staticSearch from '@/components/classManager/statistic/staticSearch'
import systemItem from '@/components/classManager/statistic/systemItem'
export default {
  name: 'statistic-index',
  components: {
    tabs,
    staticSearch,
    systemItem
  },
  data () {
    return {
      sysList: [],
      condition: 'student',
      timeNum: 3,
      classId: ''
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
    getCondition (condition) {
      if (this.condition !== condition) {
        this.condition = condition
        this.getSysList()
      }
      // console.log(condition)
    },
    getTime (num) {
      this.timeNum = num
      this.getSysList()
      // console.log(num)
    },
    getSysList () {
      this.getData('/palm/v2/classstatistics?class_id=' + this.classId + '&condition=' + this.condition + '&range=' + this.timeNum).then(data => {
        this.sysList = data.statistics
        // console.log(data)
      })
    }
  },
  created () {
    this.classId = this.$managerBus.classId
    // console.log(this.conditon)
    this.getSysList()
    // console.log(this.classId)
  }
}
</script>

<style scoped>
.statistic-index /deep/ .iconfont {
  font-family: "iconfont-morality";
  font-size: 32px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>