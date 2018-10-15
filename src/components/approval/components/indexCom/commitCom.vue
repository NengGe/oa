<template>
  <div class="content-box commitCom">
    <!-- 背景图片 -->
    <oa-bg-nodata v-show="showBg"></oa-bg-nodata>
    <div class="head-bg-box"></div>
    <oa-search position :keyword.sync='inputV' placeholder="搜索..."></oa-search>
    <!-- 内容部分 -->
    <LoaderRefresh @loadData="loadData" colorTop="black" colorBottom="black">
      <div class="refreshTop-container" @click="onClick">
        <oa-listCom class="item-box" v-for="(item,index) in dataArr" :key="index" :class="{searchActive: item.isNotSearched}">
          <div class="itemContent-box" @click="itemAction(item.id, item.processState, item.moduleCode)">
            <div class="title-box clearfix">
              <p class="title">{{item.event}}</p>
              <span class="status" :class="{'bg-blue':item.processState === '1','bg-red':item.processState === '3','bg-green':item.processState === '2','bg-gray':item.processState === '4'}">{{processStateArr[item.processState]}}</span>
              <span class="time">{{item.time}}</span>
            </div>
            <div class="itemType" v-for="(item,index) in item.contentArr" :key="index">
              <span>{{item[0]}}</span>
              ：
              <span class="contentText" v-html="item[1]">{{item[1]}}</span>
            </div>
          </div>
        </oa-listCom>
      </div>
    </LoaderRefresh>
  </div>
</template>

<script>
import { getInitType } from '@/components/approval/approvalStatic/js/commonServer.js'
import LoaderRefresh from '@/modules/loader-refresh/LoaderRefresh.vue'
import scopeElements from '@/modules/corejs/dom/scope-elements.js'
export default {
  data () {
    return {
      size: 10,
      inputV: '',
      timer: null,
      processStateArr: ['', '审批中', '已通过', '未通过', '已撤销'],
      leaveTypeList: [],
      biztripTypeList: [],
      isLoadAdd: false,
      dataArr: [],
      showBg: false
    }
  },
  computed: {
    begin: function () {
      return this.dataArr.length
    }
  },
  created () {
    // 初始化请假类型
    getInitType.call(this, 'leave').then(types => {
      this.leaveTypeList = types
    })
    // 初始化外出类型
    getInitType.call(this, 'biztrip').then(types => {
      this.biztripTypeList = types
    })
  },
  components: {
    LoaderRefresh
  },
  methods: {
    onClick (e) {
      scopeElements(e.target, function (elem) {
        let { classList } = elem
        if (classList.contains('refreshTop-container')) return false
        if (classList.contains('itemContent-box')) {
          // console.log(123)
          return false
        }
      })
    },
    // 下拉刷新 && 上拉加载更多
    loadData ({ type, complete, vLoaderBottom }) {
      if (type === 'refresh') { // 刷新情况
        this.getDataList(0, this.size).then(dataArr => {
          this.dataArr = dataArr || []
          this.$nextTick(() => {
            // 元素渲染就绪后，下拉加载重置并检测
            vLoaderBottom.reset() // 重置激活
            vLoaderBottom.tryLoad() // 检测是否执行加载
          })
          complete()
        })
      } else { // 下拉加载情况
        this.getDataList(this.begin, this.size).then(dataArr => {
          dataArr = dataArr || []
          let dataLength = dataArr.length
          this.dataArr = this.dataArr.concat(dataArr)
          this.$nextTick(() => {
            if (vLoaderBottom.$el.offsetTop + 90 < window.innerHeight) {
              vLoaderBottom.hide()
            }
            complete((dataLength === 0))
          })
          // complete((dataLength === 0))
        })
      }
    },
    // 进入审批详情
    itemAction (id, processState, moduleCode) {
      let type = '0'
      if (processState === '1') { // 审批中
        type = '2'
      } else { // 非审批中
        type = '3'
      }
      if (moduleCode === 'announce' || moduleCode === 'attend_appeal') { // 不能重新提交
        type = type === '3' ? '0' : type
      }
      this.$router.push({ name: 'approvalDetail', params: { id: id, type: type } })
    },
    // 搜索
    searchAction () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.dataArr.map((item, index) => {
          let jsonStr = JSON.stringify(item)
          jsonStr.indexOf(this.inputV) === -1 ? item.isNotSearched = true : item.isNotSearched = false
        })
      }, 100)
    },
    // 请求 & 整理 列表数据
    getDataList (begin, size) {
      // begin = begin || 0
      // size = size || 5
      return this.$axios.get(`/mobicampus/approve/v1/getApplicationList?list_type=submitted&begin=${begin}&size=${size}`).then(({ data }) => {
        if (data.status === 200) {
          console.log('if-我提交的', data)
          let dataArr = []
          let dataList = data.result.data.application_list
          this.showBg = begin === 0 && dataList.length === 0 // 判断列表数据 为空
          dataList.map(item => {
            item.resource = item.resource || {}
            let dataObj = {}
            dataObj.moduleCode = item.application.module_code
            // 流程状态
            dataObj.processState = item.application.process_state
            // 当前节点状态
            dataObj.curNodeState = item.application.state_processed
            // 审批ID
            dataObj.id = item.application.id
            // 提交人姓名
            dataObj.personName = item.resource.create_user_name
            let dateAndTime = item.application.create_time.split('+')[0].split('T')
            // 判断是否为今天
            let todayStr = new Date().toDateString()
            let dateStr = new Date(dateAndTime[0]).toDateString()
            // 去除 年 的的显示
            let yearIndex = dateAndTime[0].indexOf('-')
            dateAndTime[0] = dateAndTime[0].slice(yearIndex + 1)
            // 去除 秒 的的显示
            let secIndex = dateAndTime[1].lastIndexOf(':')
            dateAndTime[1] = dateAndTime[1].slice(0, secIndex)
            dataObj.time = todayStr === dateStr ? dateAndTime[1] : dateAndTime[0] + ' ' + dateAndTime[1]
            // 请假
            if (item.application.module_code === 'leave') {
              // 审批事件
              dataObj.event = '请假'
              // let statusArr = ['审批中', '已通过', '未通过', '已撤销']
              // 状态
              dataObj.processState = item.application.process_state
              dataObj.processStateText = this.processStateArr[item.application.process_state]
              // 开始时间 （数组）
              let startTime = item.resource.start_time.split('+')[0].split('T')
              // 结束时间 （数组）
              let endTime = item.resource.end_time.split('+')[0].split('T')
              // 请假时长
              let duration = item.resource.duration / 8
              dataObj.contentArr = [
                ['请假类型', item.resource.type_name],
                ['请假时间', startTime[0] + '~' + endTime[0]],
                ['请假时长', duration + '天']
              ]
            } else if (item.application.module_code === 'biztrip') {
              dataObj.event = '外出'
              dataObj.processState = item.application.process_state
              // 开始时间 （数组）
              let startTime = item.resource.start_time.split('+')[0].split('T')
              // 结束时间 （数组）
              let endTime = item.resource.end_time.split('+')[0].split('T')
              dataObj.contentArr = [
                ['外出地点', item.resource.destination],
                ['开始结束', startTime[0] + '~' + endTime[0]],
                ['外出事由', item.resource.desc]
              ]
            } else if (item.application.module_code === 'course_exchange_tk') {
              dataObj.event = '调课'
              dataObj.processState = item.application.process_state
              dataObj.contentArr = [
                ['调课事由', item.resource.reason]
              ]
            } else if (item.application.module_code === 'course_exchange_dnk') {
              dataObj.event = '顶课'
              dataObj.processState = item.application.process_state
              dataObj.contentArr = [
                ['顶课事由', item.resource.reason]
              ]
            } else if (item.application.module_code === 'announce') {
              dataObj.event = '公告'
              // dataObj.statusText = this.statusArr[item.application.state_processed]
              dataObj.processState = item.application.process_state
              dataObj.contentArr = [
                ['公告标题', item.resource.title],
                ['公告类型', item.resource.type_name],
                ['公告内容', item.resource.content]
              ]
            } else if (item.application.module_code === 'attend_appeal') {
              let typeArr = ['', '迟到', '早退', '正常', '异常', '缺卡']
              dataObj.event = '考勤申诉'
              dataObj.processState = item.application.process_state
              dataObj.contentArr = [
                ['异常日期', item.resource.date_to_clock.split('T')[0]],
                ['异常情况', typeArr[item.resource.type]],
                ['申诉理由', item.resource.reason]
              ]
            } else if (item.application.module_code === 'fund') {
              dataObj.event = '经费'
              dataObj.processState = item.application.process_state
              dataObj.contentArr = [
                ['经费金额', item.resource.amount],
                ['经费类型', item.resource.type_name],
                ['经费事由', item.resource.desc]
              ]
            } else if (item.application.module_code === 'assets_purchase') {
              dataObj.event = '采购'
              dataObj.processState = item.application.process_state
              dataObj.contentArr = [
                ['采购事由', item.resource.desc],
                ['采购金额', item.resource.amount]
              ]
            } else if (item.application.module_code === 'car_using') {
              dataObj.event = '用车'
              dataObj.processState = item.application.process_state
              dataObj.contentArr = [
                ['用车事由', item.resource.desc],
                ['用车目的地', item.resource.destination],
                ['用车人数', item.resource.number_of_people + '人']
              ]
            }
            dataObj.isNotSearched = false
            dataArr.push(dataObj)
            // resolve(dataArr)
          })
          return dataArr
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.clearfix:after {
  content: ".";
  height: 0px;
  display: block;
  clear: both;
  overflow: hidden;
  visibility: hidden;
}
.commitCom {
  padding: 46px 0 80px;
  // background: url('@/assets/imgs/no-data.png') no-repeat;
  .head-bg-box {
    position: fixed;
    width: 100%;
    height: 29px;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 1;
  }
  .item-box {
    &:last-child {
      margin-bottom: 10px;
    }
    transform: translate(0, 0);
    .itemContent-box {
      // position: relative;
      // width: 355px;
      // margin: 6px 10px;
      box-sizing: border-box;
      padding: 19px 15px 19px 19px;
      transition: all 0.5s;
      .title-box {
        display: flex;
        margin-bottom: 3px;
        .title {
          flex: 1;
          font-size: 17px;
          font-weight: bold;
          // float: left;
          color: #555555;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .status {
          // float: left;
          // width: 40px;
          font-size: 13px;
          line-height: 20px;
          /* background-color: #6aa2d7; */
          padding: 0 9px;
          color: #fff;
          border-radius: 4px;
          margin-left: 10px;
        }
        .status.bg-blue {
          background-color: #6aa2d7;
        }
        .status.bg-red {
          background-color: #ed5564;
        }
        .status.bg-green {
          background-color: #1ab394;
        }
        .status.bg-gray {
          color: #999;
          border: #999 1PX solid;
          box-sizing: border-box;
        }
        .time {
          text-align: right;
          width: 120px;
          line-height: 20px;
          font-size: 12px;
          color: #999;
        }
      }
      .itemType {
        line-height: 27px;
        font-size: 13px;
        color: #999;
        display: flex;
        .contentText {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .itemContent-box.active {
      transform: translateX(49px);
    }
  }
  .item-box.searchActive {
    display: none;
  }
}
.icon-search:before {
  content: "\e661";
  line-height: 40px;
}
</style>
