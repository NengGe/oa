<template>
  <div class="more-box">
    <!-- <keep-alive include="behaviorItem"> -->
      <behaviorItem 
      :recordList="recordList" 
      @loadData="loadData" 
      @toAppdetails="toAppdetails"
      ></behaviorItem>
    <!-- </keep-alive> -->
  </div>
</template>
<script>
import behaviorItem from '@/components/morality-manager/components/behaviorItem'
// import getData from '@/components/classManager/assets/js/getData.js'
import dateTo from '@/components/morality-manager/assets/js/dateTo.js'
export default {
  name: 'more',
  props: {
  },
  components: {
    behaviorItem
  },
  data () {
    return {
      pageSize: 0,
      classId: '',
      recordList: [],
      condition: ''
    }
  },
  methods: {
    getData (url, isLoad) {
      // let $vue = new Vue()
      if (!isLoad) {
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
    getRecordList (url) {
      return this.getData(url)
    },
    loadData ({ type, complete, vLoaderBottom } = {}) {
      this.pageSize++
      type === 'refresh' && (this.pageSize = 1)
      this.getRecordList('/palm/v2/eventrecord?condition=' + this.condition + '&page=' + this.pageSize +
       (this.classId && '&class_id=' + this.classId), true).then(data => {
        // console.log(data)
        if (type === 'refresh') {
          let arr = data.records
          arr.map(ele => {
            ele.event_date && (ele.event_date = dateTo(ele.event_date))
          })
          this.recordList = arr
          // 刷新完成
          complete()
          // 底部加载重置并检测
          vLoaderBottom.reset() // 重置激活
          vLoaderBottom.tryLoad() // 检测是否执行加载
        } else {
          let arr = data.records
          // console.log(arr)
          arr.map(ele => {
            ele.event_date && (ele.event_date = dateTo(ele.event_date))
          })
          this.recordList = this.recordList.concat(arr)
          // console.log(data.records.length)
          complete(data.records.length < 5)
        }
      })
    },
    toAppdetails (item) {
      // alert('hehe')
      if (this.condition === 'record') { // 门卫年级长等角色 进的是更多录入详情列表项
        this.$router.push({path: 'schoolBehaviorDetails/1', query: {event_id: item.event_id}})
      } else if (this.condition === 'school') { // 老师或者任课老师角色  进入得是更多学校行为列表项
        this.$router.push({path: 'teacherSchoolactionDetails', query: {event_id: item.event_id}})
      }
    },
    getDateArr (arr, word = 'event_date') {
      return arr.map(ele => {
        return ele[word] && (ele[word] = dateTo(ele[word]))
      })
    }
  },
  created () {
    this.condition = this.$route.query.condition || 'record'
    this.classId = this.$moralityBus.classId
    // console.log(this.classId)
    // console.log(this.$route.query.condition)
    // console.log(getData)
  },
  activated () {
  }
}
</script>