<template>
  <div class="more-box">
    <!-- <keep-alive include="behaviorItem"> -->
      <behaviorItem 
      :recordList="recordList" 
      @loadData="loadData" 
      @click="toDetails"
      ></behaviorItem>
    <!-- </keep-alive> -->
  </div>
</template>
<script>
import behaviorItem from '@/components/classManager/components/behaviorItem'
// import getData from '@/components/classManager/assets/js/getData.js'
import dateTo from '@/components/classManager/assets/js/dateTo.js'
export default {
  name: 'classMore',
  components: {
    behaviorItem
  },
  data () {
    return {
      pageSize: 0,
      classId: '',
      recordList: []
    }
  },
  beforeRouteLeave (to, from, next) {
    // console.log(this.$root.unCacheComponets)
    // console.log(to.name)
    if (to.name === 'classDetailPage') { // 路由往列表详情页加上缓存
    } else { // 不是详情列表页则去除缓存
      let {unCacheComponets} = this.$root
      if (unCacheComponets.indexOf('classMore') === -1) {
        this.$root.unCacheComponets.push('classMore')
      }
    }
    console.log(this.$root.unCacheComponets)
    next()
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
      this.getRecordList('/palm/v2/classeventrecord?class_id=' + this.classId + '&page=' + this.pageSize + '&condition=record', true).then(data => {
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
          arr.map(ele => {
            ele.event_date && (ele.event_date = dateTo(ele.event_date))
          })
          this.recordList = this.recordList.concat(arr)
          // console.log(data.records.length)
          complete(data.records.length < 5)
        }
      })
    },
    toDetails (item) {
      this.$router.push({path: '/classManagerindex/classDetailPage/1', query: {class_id: item.class_id, event_id: item.event_id}})
    },
    getDateArr (arr, word = 'event_date') {
      return arr.map(ele => {
        return ele[word] && (ele[word] = dateTo(ele[word]))
      })
    }
  },
  created () {
    this.classId = this.$route.params.class_id
    // console.log(getData)
  },
  activated () {
  }
}
</script>



