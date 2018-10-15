<template>
  <div class="acord-class">
    <tabsClass :msg="role===1?['选择班级', '选择时间']:['选择时间']" @transClassId="transClassId" @transNum="transNum" @firstClick="firstClick"></tabsClass>
    <searchClassItem :sysList="sysList"></searchClassItem>
  </div>
</template>
<script>
import tabsClass from '@/components/morality-manager/pages/schoolStatistic/tabsClass'
import searchClassItem from '@/components/morality-manager/pages/schoolStatistic/searchClassItem'
export default {
  name: 'acordClass',
  components: {
    tabsClass,
    searchClassItem
  },
  data () {
    return {
      classArgs: '',
      timeArgs: '',
      sysList: [],
      role: 1,
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
    getStatisticData () {
      // this.classArgs = ''
      this.getData('/palm/v2/campusstatistics?condition=class' + this.classArgs + this.timeArgs).then(data => {
        this.sysList = data.statistics
        // console.log(this.sysList)
        // console.log(data)
      })
    },
    transClassId (obj) { // 根据班级id查询
      // console.log(obj.class_id)
      // console.log(id)
      this.classArgs = '&class_id=' + obj.class_id
      if (this.firstClickFlag && this.role === 1) { // 第一次点进入统计页面需要显示所有数据 第一次不请求
        this.getStatisticData()
      }
    },
    initClassArgs () {
      if (this.role === 2) {
        this.classArgs = '&class_id=' + this.$moralityBus.classId
        this.getStatisticData()
        // console.log(this.$moralityBus.classId)
      }
    },
    transNum ({timeNum}) { // 根据时段查询
      if (timeNum) {
        this.timeArgs = '&range=' + timeNum
        this.getStatisticData()
      }
    },
    firstClick () {
      if (this.role === 1 && this.firstClickFlag === false) {
        // console.log(1111)
        this.firstClickFlag = true
        this.getStatisticData()
      }
    }
  },
  created () {
    // this.role = this.$managerBus.role
    this.role = this.$moralityBus.role // @/assets/eventBus.js 找到role
    this.initClassArgs()
    this.role === 1 && this.getStatisticData()
  },
  activated () {
  }
}
</script>