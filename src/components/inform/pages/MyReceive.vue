<template>
  <div class="content-box myReceiveCom">
    <!-- 背景图片 -->
    <oa-bg-nodata v-show="showBg"></oa-bg-nodata>
    <oa-search position :keyword.sync='inputV' placeholder="搜索..."></oa-search>
    <!-- 内容部分 -->
    <LoaderRefresh @loadData="loadData" colorTop="black" colorBottom="black">
      <listCom :item='item' :needRedDot="item.hasRead === 'false'" v-for="(item,i) in dataArr" :key="i" @action="itemContentAction(item.id)">
        <div v-show="item.isNeedStick" class="status bg-green">顶</div>
      </listCom>
    </LoaderRefresh>

  </div>
</template>

<script>
import LoaderRefresh from '@/modules/loader-refresh/LoaderRefresh.vue'
import listCom from '../components/listCom-inform'
export default {
  components: {
    LoaderRefresh,
    listCom
  },
  data () {
    return {
      timer: null,
      inputV: '',
      size: 10,
      inputVal: '',
      isTabActive: 0,
      dataArr: [],
      showBg: false
    }
  },
  computed: {
    begin: function () {
      return this.dataArr.length
    }
  },
  watch: {
    inputVal: function (newVal) {

    }
  },
  created () {
    // 获取我收到列表数据
    // this.getMyReceiveData().then((dataArr) => {
    //   console.log('dataArr', dataArr)
    //   this.dataArr = dataArr
    // })
  },
  methods: {
    // 下拉刷新 && 上拉加载更多
    loadData ({ type, complete, vLoaderBottom }) {
      if (type === 'refresh') { // 刷新情况
        console.log('开始刷新')
        this.getMyReceiveData(0, this.size).then(dataArr => {
          // console.log('dataArr', dataArr)
          this.dataArr = dataArr
          this.$nextTick(() => {
            // 元素渲染就绪后，下拉加载重置并检测
            vLoaderBottom.reset() // 重置激活
            vLoaderBottom.tryLoad() // 检测是否执行加载
          })
          complete()
        })
      } else { // 下拉加载情况
        this.getMyReceiveData(this.begin, this.size).then(dataArr => {
          console.log('dataArr', dataArr)
          dataArr = dataArr || []
          let dataLength = dataArr.length
          this.dataArr = this.dataArr.concat(dataArr)
          this.$nextTick(() => {
            if (vLoaderBottom.$el.offsetTop + 90 < window.innerHeight) {
              vLoaderBottom.hide()
            }
            complete((dataLength === 0))
          })
        })
      }
    },
    // tabAction (params) {
    //   this.isTabActive = params
    // },
    // 进入审批详情
    itemContentAction (id) {
      // this.$router.push({path: 'approvalDetail/' + id})
      this.$router.push({ name: 'informDetail', params: { status: 'myReceive', id: id } })
    },
    // 请求 获取我收到列表数据
    getMyReceiveData (begin, size) {
      begin = begin || 0
      size = size || 10
      let params = {
        id: 0,
        title: 0,
        type_id: 0,
        type_name: 0,
        process_state: 0,
        begin,
        size
      }
      return this.$axios.get(`/mobicampus/announce/v1/getListReceived`, { params }).then(({ data }) => {
        if (data.status === 200) {
          console.log('IF-myReceive-data', data)
          let dataArr = []
          let dataList = data.result.data.announce_list
          this.showBg = this.begin === 0 && dataList.length === 0 // 列表数据 为空
          dataList.map((item, index) => {
            // 提交时间
            let dateAndTime = item.create_time.split('+')[0].split('T')
            // 判断是否为今天
            let todayStr = new Date().toDateString()
            let dateStr = new Date(dateAndTime[0]).toDateString()
            // 去除 年 的的显示
            let yearIndex = dateAndTime[0].indexOf('-')
            dateAndTime[0] = dateAndTime[0].slice(yearIndex + 1)
            // 去除 秒 的的显示
            let secIndex = dateAndTime[1].lastIndexOf(':')
            dateAndTime[1] = dateAndTime[1].slice(0, secIndex)
            // console.log('todayStr', todayStr)
            // console.log('dateStr', dateStr)
            let time = todayStr === dateStr ? dateAndTime[1] : dateAndTime[0] + ' ' + dateAndTime[1]
            let obj = {
              id: item.id,
              title: item.title,
              contentText: item.abstract,
              processState: item.process_state,
              time,
              hasRead: item.has_read,
              isNeedStick: parseInt(item.stick2top_id) !== 0
            }
            obj.isNotSearched = false
            dataArr.push(obj)
          })
          return dataArr
        }
      }).catch(error => {
        // this.$simpleMsg(error)
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.myReceiveCom {
  padding: 44px 0 70px;
}
.status {
  font-size: 13px;
  line-height: 20px;
  padding: 0 9px;
  color: #fff;
  border-radius: 4px;
  margin-left: 10px;
}
.bg-green {
  background-color: #bdddb7;
}
</style>
