<template>
  <div class="acord-dormitory">
    <tabsDormitory :msg="['选择宿舍', '选择时间']" @transDormitoryId="transDormitoryId" @transNum="transNum" @firstClick="firstClick"></tabsDormitory>
    <searchClassItem :sysList="sysList"></searchClassItem>
  </div>
</template>
<script>
import tabsDormitory from '@/components/morality-manager/pages/schoolStatistic/tabsDormitory'
import searchClassItem from '@/components/morality-manager/pages/schoolStatistic/searchClassItem'
export default {
  name: 'acordDormitory',
  components: {
    tabsDormitory,
    searchClassItem
  },
  data () {
    return {
      sysList: [],
      dormitoryArgs: '',
      screenArgs: '',
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
    transDormitoryId (obj) {
      // console.log(obj)
      this.dormitoryArgs = '&dorm_id=' + obj.dorm_id
      if (this.firstClickFlag) {
        this.getStatisticsData()
      }
    },
    transNum ({timeNum}) {
      if (timeNum) {
        this.screenArgs = '&range=' + timeNum
        this.getStatisticsData()
      }
    },
    getStatisticsData () {
      this.getData('/palm/v2/campusstatistics?condition=dorm' + this.screenArgs + this.dormitoryArgs).then(data => {
        // console.log(data)
        this.sysList = data.statistics
      })
    },
    firstClick () {
      if (this.firstClickFlag === false) {
        this.firstClickFlag = true
        this.getStatisticsData()
      }
    }
  },
  created () {
    this.getStatisticsData()
    // console.log(this)
  }
}
</script>