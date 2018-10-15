<template>
  <div class="class-behavior">
    <div class="search-outer">
      <nameSearch 
      @search="search"
      ></nameSearch>
    </div>
    <tabsSlide :msg="tabsList" @transNum="transNum"></tabsSlide>
    <classBehaviorItem 
      :behaviorList="behaviorList"
      @loadData="loadData"
    ></classBehaviorItem>
  </div>
</template>
<script>
// import app from '@/app'
import nameSearch from '@/components/classManager/pages/nameSearch'
import tabsSlide from '@/components/classManager/classBehavior/tabsSlide.vue'
import classBehaviorItem from '@/components/classManager/classBehavior/classBehaviorItem.vue'
import dateTo from '@/components/classManager/assets/js/dateTo.js'
import parseUrl from '@/components/classManager/assets/js/parseUrl.js'
export default {
  name: 'classBehavior',
  components: {
    nameSearch,
    tabsSlide,
    classBehaviorItem
  },
  data () {
    return {
      tabsList: ['时间', '申诉状态', '制度'],
      behaviorList: [],
      classId: '',
      args: '', // 帅选时候参数
      pageSize: 0,
      loadmore: {},
      searchArgs: '',
      argsObj: {}
    }
  },
  beforeRouteLeave (to, from, next) {
    // console.log(this.$root.unCacheComponets)
    // console.log(to.name)
    if (to.name === 'classDetailPage') { // 路由往列表详情页加上缓存
      // let {unCacheComponets} = this.$root
      // let index = unCacheComponets.indexOf('classBehavior')
      // if (index > -1) {
      //   this.$root.unCacheComponets.splice(index, 1)
      // }
    } else { // 不是详情列表页则去除缓存
      let {unCacheComponets} = this.$root
      if (unCacheComponets.indexOf('classBehavior') === -1) {
        this.$root.unCacheComponets.push('classBehavior')
      }
    }
    // console.log(this.$root.unCacheComponets)
    next()
  },
  activated () {
    // this.repeatLoadData()
  },
  methods: {
    getData (url, boo) {
      if (!boo) {
        this.$preloaderFull.show({ mask: true })
      }
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
    getBehaviorList (url) {
      return this.getData(url)
    },
    search (info) { // 搜索
      // if (!info) return
      let re = /^[0-9]+$/g
      if (re.test(info)) { // 全是数字按照学号查找
        this.searchArgs = '&student_no=' + info
        this.repeatLoadData()
      } else { // 按照姓名查找
        this.searchArgs = '&student_name=' + info || ''
        this.repeatLoadData()
      }
    },
    transNum ({timeNum, stateNum, ruleId}) { // 帅选时候的参数处理
      // console.log(timeNum, stateNum, ruleId)
      if (timeNum) {
        // this.args += '&range=' + timeNum
        this.argsObj.range = timeNum
      }
      if (stateNum) {
        this.argsObj.state = stateNum
        // this.args += '&state=' + stateNum
      }
      if (ruleId) {
        this.argsObj.rule_id = ruleId
        // this.args += '&rule_id=' + ruleId
      }
      this.args = parseUrl(this.argsObj, '&')
      this.repeatLoadData()
    },
    loadData ({ type, complete, vLoaderBottom } = {}) {
      if (this.pageSize === 0) {
        this.loadmore.type = type
        this.loadmore.complete = complete
        this.loadmore.vLoaderBottom = vLoaderBottom
      }
      this.pageSize++
      // console.log(this.pageSize)
      type === 'refresh' && (this.pageSize = 1)
      this.getBehaviorList('/palm/v2/classeventrecord?class_id=' + this.classId + this.args + this.searchArgs + '&page=' + this.pageSize, true).then((data) => {
        // console.log(data)
        if (type === 'refresh') {
          let arr = data.records
          arr.map(ele => {
            return ele.event_date && (ele.event_date = dateTo(ele.event_date))
          })
          this.behaviorList = arr
          // 刷新完成
          complete()
          // 底部加载重置并检测
          vLoaderBottom.reset() // 重置激活
          vLoaderBottom.tryLoad() // 检测是否执行加载
        } else {
          // let arr = []
          // let _this = this
          let arr = data.records
          arr.map(ele => {
            return ele.event_date && (ele.event_date = dateTo(ele.event_date))
          })
          this.behaviorList = this.behaviorList.concat(arr)
          // this.behaviorList = arr
          complete(data.records.length < 10)
          // complete(true)
        }
      })
    },
    repeatLoadData () { // 再次重新加载
      this.behaviorList = []
      this.pageSize = 0
      let {type, complete, vLoaderBottom} = this.loadmore
      this.loadData({type, complete, vLoaderBottom})
    }
  },
  created () {
    this.classId = this.$managerBus.classId
    // console.log('hehe')
  }
}
</script>
<style scoped>
.search-outer {
  padding: 10px 10px 0px 10px;
  /* margin-top: 10px; */
  background: #ffffff;
  position: relative;
  z-index: 10;
}
.class-behavior /deep/ .iconfont {
  font-family: "iconfont-morality";
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
