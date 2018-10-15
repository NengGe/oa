<template>
  <div class="schoolBehaviorIndex">
    <tabsSlide 
    @transNum="transNum" 
    @transClassId="transClassId"
    @first="firstClick"
    ></tabsSlide>
    <schoolBehaviorItem :behaviorList="behaviorList" @loadData="loadData"></schoolBehaviorItem>
  </div>
</template>
<script>
import tabsSlide from '@/components/morality-manager/pages/schoolBehaviorDetails/tabsSlide'
import schoolBehaviorItem from '@/components/morality-manager/pages/schoolBehaviorDetails/schoolBehaviorItem'
import dateTo from '@/components/morality-manager/assets/js/dateTo.js'
import session from '@/components/morality-manager/assets/js/session.js'
import parseUrl from '@/components/classManager/assets/js/parseUrl.js'
export default {
  name: 'schoolBehaviorIndex',
  components: {
    tabsSlide,
    schoolBehaviorItem
  },
  data () {
    return {
      behaviorList: [],
      classId: '',
      loadmore: {},
      pageSize: 0,
      argsObj: {},
      args: '',
      firstFlag: true
    }
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
    transClassId (obj) { // 通过班级筛选时
      this.classId = obj.class_id
      if (this.classId) {
        this.argsObj.class_id = this.classId
      }
      if (!this.firstFlag) { // 第一次进入该页面 由于会默认选中班级所以先让他不执行 firstFlag判断
        this.args = parseUrl(this.argsObj, '&')
        this.screenLoadData(this.loadmore)
      }
    },
    firstClick () { // 当第一次点击选择班级组件时候，对默认选择的班级进行过滤。
      if (this.firstFlag) {
        this.args = parseUrl(this.argsObj, '&')
        this.screenLoadData(this.loadmore)
        this.firstFlag = false
      }
    },
    transNum ({ classId, timeNum, stateNum, ruleId }) {
      if (classId) {
        // this.screenArgs = '&classId=' + classId
      } else if (timeNum) {
        this.argsObj.range = timeNum
      } else if (stateNum) {
        this.argsObj.state = stateNum
      } else if (ruleId) {
        this.argsObj.rule_id = ruleId
      }
      this.args = parseUrl(this.argsObj, '&')
      this.screenLoadData(this.loadmore)
      // console.log(classId)
    },
    loadData ({ type, complete, vLoaderBottom } = {}) {
      // console.log(complete)
      if (this.pageSize === 0) {
        this.loadmore.type = type
        this.loadmore.complete = complete
        this.loadmore.vLoaderBottom = vLoaderBottom
      }
      this.pageSize++
      type === 'refresh' && (this.pageSize = 1)
      this.getBehaviorList('/palm/v2/eventrecord?condition=school&size=20&page=' + this.pageSize + this.args, true).then((data) => {
        // console.log(this.pageSize + 'hahahhahah')
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
          // console.log(complete)
          typeof complete === 'function' && complete(data.records.length < 20)
          // complete(true)
        }
      })
    },
    screenLoadData ({ type, complete, vLoaderBottom } = {}) { // 筛选加载数据
      // console.log(complete + '8888')
      this.behaviorList = []
      this.pageSize = 0
      this.loadData({ type, complete, vLoaderBottom })
    },
    getSchoolClassData () { // 得到学校班级数据
      this.getData('/palm/v2/teacherclasses').then(data => {
        // console.log(data)
        session.set('schoolClassData', data.grades)
      })
    }
  },
  watch: {
  },
  created () {
    // this.getSchoolClassData()
  },
  mounted () {
    // this.classId = ''
  },
  activated () {
    // this.screenLoadData()
  }
}
</script>

<style scoped>
  .schoolBehaviorIndex /deep/ .iconfont-morality {
    font-family: "iconfont-morality";
    /* font-size: 32px; */
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* color: #ffffff; */
  }
</style>