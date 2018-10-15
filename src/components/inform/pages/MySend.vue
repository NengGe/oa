<template>
  <div class="content-box mySendCom">
    <!-- 背景图片 -->
    <oa-bg-nodata v-show="showBg"></oa-bg-nodata>
    <oa-search position :keyword.sync='inputV' placeholder="搜索..."></oa-search>
    <!-- 内容部分 -->
    <LoaderRefresh @loadData="loadData" colorTop="black" colorBottom="black">
      <listCom :item='item' v-for="(item,i) in dataArr" :key="i" @action="itemContentAction(item.processState, item.id)">
        <span class="status" :class="{'bg-gray':item.isWithdrawn === 'true','bg-blue':item.processState === '0' || item.processState === '1','bg-red':item.processState === '3'||item.processState === '4','bg-green':item.isWithdrawn === 'false'&&item.processState === '2',}">{{item.isWithdrawn==='true'?'已撤销':processStateArr[item.processState]}}</span>
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
      processStateArr: ['审批中', '审批中', '已发布', '未发布', '未发布'],
      isTabActive: 0,
      // 启用批量操作
      iSallSelectActive: false,

      // iSallSelect: false,
      // 全选按钮
      iSallSelected: false,
      dataArr: [
        // {
        //   id: '185',
        //   title: '五一放假通知',
        //   processState: '1',
        //   time: '18:16',
        //   contentText: '新华社北京1月9日电（记者侯丽军）国务院总理李克强9日下午在人民大会堂会见来华进行国事访问的法国总统马克龙'
        // }
      ]
    }
  },
  computed: {
    begin: function () {
      return this.dataArr.length
    },
    showBg: function () {
      return !this.begin
    }
  },
  watch: {
    inputV () {
      this.searchAction()
    }
  },
  created () {
    // this.getMySendData().then((dataArr) => {
    //   console.log('dataArr', dataArr)
    //   this.dataArr = dataArr
    // })
  },
  methods: {
    // 搜索匹配
    searchAction () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.dataArr.map((item, index) => {
          item.title.indexOf(this.inputV) === -1 ? item.isNotSearched = true : item.isNotSearched = false
        })
      }, 100)
    },
    // 刷新 & 加载更多
    loadData ({ type, complete, vLoaderBottom }) {
      if (type === 'refresh') { // 刷新情况
        console.log('开始刷新')
        this.getMySendData(0, this.size).then(dataArr => {
          console.log('dataArr', dataArr)
          this.dataArr = dataArr || []
          this.$nextTick(() => {
            // 元素渲染就绪后，下拉加载重置并检测
            vLoaderBottom.reset() // 重置激活
            vLoaderBottom.tryLoad() // 检测是否执行加载
          })
          complete()
        })
      } else { // 下拉加载情况
        this.getMySendData(this.begin, this.size).then(dataArr => {
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
    // 进入审批详情
    itemContentAction (processState, id) {
      // this.$router.push({path: 'approvalDetail/' + id})
      this.$router.push({ name: 'informDetail', params: { status: processState, id: id } })
    },
    // 获取数据
    getMySendData (begin, size) {
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
      return this.$axios.get(`/mobicampus/announce/v1/getListMyPublished`, { params }).then(({ data }) => {
        // let msg = '请求成功'
        console.log('mySend-data', data)
        if (data.status === 200) {
          console.log('IF-mySend-data', data)
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
              // processState: '4',
              time
            }
            obj.isWithdrawn = item.is_withdrawn
            obj.isNotSearched = false
            dataArr.push(obj)
          })
          return dataArr
        } else {
          // alert(data)
          // alert(data.message)
        }
      }).catch(error => {
        // this.$simpleMsg(error)
        console.log(error)
      })
    },
    // 提交公告 置顶
    postPublishInform (announceID) {
      return this.$axios.post(`mobicampus/announce/v1/stick2top${announceID}`).then(({ data }) => {
        // console.log('发布公告', data)
        if (data.status === 200) {
          console.log('置顶 成功')
        } else {
          console.log('置顶 失败')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mySendCom {
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
.bg-blue {
  background-color: #6aa2d7;
}
.bg-red {
  background-color: #ed5564;
}
.bg-green {
  background-color: #1ab394;
}
.bg-gray {
  color: #999;
  border: #999 1PX solid;
  box-sizing: border-box;
}
</style>
