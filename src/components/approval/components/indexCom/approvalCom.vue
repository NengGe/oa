<template>
  <div class="content-box approvalCom" :class="{isHide}">
    <!-- 背景图片 -->
    <oa-bg-nodata v-show="showBg"></oa-bg-nodata>
    <oa-tabHead position :list="tabList" @action="(i)=>tabAction(i)" :currIndex="isTabActive">
      <oa-search :keyword.sync='inputV' placeholder="搜索...">
        <div slot="right" class="all-select" @click="allSelectAction" :class="{'active': iSallSelectActive}" v-show="isTabActive === 0">
          <div class="icon-box allSel">
            <span class="iconfont icon-allSel"></span>
          </div>
          <div class="words-box">
            <span>批量通过</span>
          </div>
        </div>
      </oa-search>
    </oa-tabHead>

    <!-- 内容部分 -->
    <!-- 待审批 -->
    <LoaderRefresh ref="LoaderRefresh" @loadData="loadDataA" colorTop="black" colorBottom="black">
      <oa-listCom class="item-box" v-for="(item,index) in todoDataArr" :key="index+'2'" v-show="isTabActive === 0" :class="{searchActive: item.isNotSearched}">
        <div class="singleSel-box" :class="{active:item.isSelected}" @click="()=>singleSelAction(item)">
          <span class="iconfont-approval" v-show="item.isSelected">&#xe60c;</span>
        </div>
        <div class="itemContent-box" :class="{'active': iSallSelectActive}" @click="()=>itemContentAction(item.id, item.curNodeState, item.processState)">
          <div class="title-box clearfix">
            <p class="title">{{item.applicationName}}</p>
            <span class="time">{{item.time}}</span>
          </div>
          <p class="itemType" v-for="(item,index) in item.contentArr" :key="index">
            <span>{{item[0]}}</span>
            ：
            <span class="contentText">{{item[1]}}</span>
          </p>
        </div>
      </oa-listCom>
      <!-- </LoaderRefresh> -->
      <!-- 已审批 -->
      <!-- <LoaderRefresh @loadData="loadDataB"  v-show="isTabActive === 1" colorTop="black" colorBottom="black"> -->
      <oa-listCom class="item-box" v-if="item.curNodeState !=='4'" v-for="(item,index) in approvedDataArr" :key="index+'3'" v-show="isTabActive === 1" :class="{searchActive: item.isNotSearched}">
        <div class="itemContent-box" @click="()=>itemContentAction(item.id, item.curNodeState, item.processState)">
          <div class="title-box clearfix">
            <p class="title">{{item.applicationName}}</p>
            <span class="status" :class="{'filtelActive':item.curNodeState === '4','bg-blue':item.curNodeState === '5','bg-red':item.curNodeState === '3','bg-green':item.curNodeState === '2',}">{{item.statusText}}</span>
            <span class="time">{{item.time}}</span>
          </div>
          <p class="itemType" v-for="(item,index) in item.contentArr" :key="index+'4'">
            <span>{{item[0]}}</span>
            ：
            <span class="contentText">{{item[1]}}</span>
          </p>
        </div>
      </oa-listCom>
    </LoaderRefresh>
    <!-- 底部 审批 确定&取消 -->
    <div class="bottom-allSel-box" :class="{active: iSallSelectActive}">
      <div class="btn-cancel">
        <div class="cancel-left" @click="allSelBoxAction">
          <div class="singleSel-box" :class="{active:iSallSelected}">
            <span class="iconfont-approval" v-show="iSallSelected">&#xe60c;</span>
          </div>
        </div>
        <div class="cancel-right" @click="cancelAction">
          <span class="cancelText">取消</span>
        </div>
      </div>
      <div class="btn-sure" @click="sureAction">一键通过</div>
    </div>
  </div>
</template>

<script>
import { getInitType } from '@/components/approval/approvalStatic/js/commonServer.js'
import LoaderRefresh from '@/modules/loader-refresh/LoaderRefresh.vue'
export default {
  data () {
    return {
      isHide: false,
      // showBg: false,
      size: 10,
      timer: null,
      inputV: '',
      statusArr: ['待审批', '', '已通过', '未通过', '已撤销', '已转交'],
      leaveTypeList: [],
      biztripTypeList: [],
      isLoadAdd: false,
      tabList: ['待审批', '已审批'],
      isTabActive: 0,
      // 启用批量操作
      iSallSelectActive: false,
      // iSallSelect: false,
      // 全选按钮
      iSallSelected: false,
      // 待审批数据
      todoDataArr: [],
      // 已审批数据
      approvedDataArr: [],
      showBg: false
    }
  },
  computed: {
    // 待审批 请求数据起始位置
    beginA: function () {
      return this.todoDataArr.length
    },
    // 已审批 请求数据起始位置
    beginB: function () {
      return this.approvedDataArr.length
    }
  },
  watch: {
    '$route': function (to, from) {
      this.isHide = to.name === 'ApprovalDetail'
    }
  },
  components: {
    LoaderRefresh
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
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'approvalDetail') {
        vm.isTabActive = parseInt(from.params.type) === 1 ? 0 : 1
      }
    })
  },
  methods: {
    // 上拉刷新 && 下拉加载更多 待审批
    loadDataA ({ type, complete, vLoaderBottom }) {
      if (type === 'refresh') { // 刷新情况
        if (this.isTabActive === 0) {
          this.getDataList('todo', 0, this.size).then(dataArr => {
            this.todoDataArr = dataArr || []
            this.$nextTick(() => {
              // 元素渲染就绪后，下拉加载重置并检测
              vLoaderBottom.reset() // 重置激活
              vLoaderBottom.tryLoad() // 检测是否执行加载
            })
            complete()
          })
        } else {
          this.getDataList('approved', 0, this.size).then(dataArr => {
            this.approvedDataArr = dataArr || []
            this.$nextTick(() => {
              // 元素渲染就绪后，下拉加载重置并检测
              vLoaderBottom.reset() // 重置激活
              vLoaderBottom.tryLoad() // 检测是否执行加载
            })
            complete()
          })
        }
      } else { // 下拉加载情况
        let dataLength
        if (this.isTabActive === 0) {
          this.getDataList('todo', this.beginA, this.size).then(dataArr => {
            dataArr = dataArr || []
            dataLength = dataArr.length
            this.todoDataArr = this.todoDataArr.concat(dataArr)
            // this.showBg = this.todoDataArr.length === 0
            this.$nextTick(() => {
              // 元素渲染就绪后，进行下拉检测。或者传入 true 加载结束
              if (vLoaderBottom.$el.offsetTop + 90 < window.innerHeight) {
                vLoaderBottom.hide()
              }
              complete((dataLength === 0))
            })
          })
        } else {
          this.getDataList('approved', this.beginB, this.size).then(dataArr => {
            dataArr = dataArr || []
            dataLength = dataArr.length
            this.approvedDataArr = this.approvedDataArr.concat(dataArr)
            // this.showBg = this.approvedDataArr.length === 0
            this.$nextTick(() => {
              // 元素渲染就绪后，进行下拉检测。或者传入 true 加载结束
              if (vLoaderBottom.$el.offsetTop + 90 < window.innerHeight) {
                vLoaderBottom.hide()
              } else {
                vLoaderBottom.show()
              }
              complete((dataLength === 0))
            })
          })
        }
      }
    },
    // 切换 待审批/已审批testLoad
    tabAction (params) {
      this.isTabActive = params
      this.iSallSelectActive = false
      this.$refs.LoaderRefresh.$refs.vLoaderBottom.reStart()
    },
    // 批量操作
    allSelectAction () {
      if (this.todoDataArr.length === 0) return
      this.iSallSelectActive = !this.iSallSelectActive
    },
    // 是否全选
    allSelBoxAction () {
      this.iSallSelected = !this.iSallSelected
      for (var i = 0; i < this.todoDataArr.length; i++) {
        this.todoDataArr[i].isSelected = this.iSallSelected
      }
    },
    // 单选
    singleSelAction (item) {
      item.isSelected = !item.isSelected
    },
    // 取消
    cancelAction () {
      this.iSallSelectActive = false
      this.iSallSelected = false
      this.todoDataArr.map(item => {
        item.isSelected = false
      })
    },
    // 一键通过
    sureAction () {
      this.iSallSelectActive = false
      this.iSallSelected = false
      let approveObj = {
        process_id_list: []
      }
      this.todoDataArr.map((item, index) => {
        if (item.isSelected) {
          approveObj['process_id_list'].push(parseInt(item.processId))
        }
      })
      // 提交一键通过
      this.$axios.post('/mobicampus/approve/v1/approvePassBatch', approveObj).then(({ data }) => {
        if (data.status === 200) {
          // 提交成功 刷新页面
          this.getDataList('todo').then(dataArr => {
            this.todoDataArr = dataArr || []
            // this.showBg = this.todoDataArr.length === 0
          })
        }
      })
    },
    // 进入审批详情
    itemContentAction (id, curNodeState, processState) {
      let type = '0'
      // type = '0'
      if (curNodeState === '0') {
        type = '1'
      } else if (processState === '1') {
        type = '4'
      }
      this.$router.push({ name: 'approvalDetail', params: { id: id, type: type } })
    },
    // 搜索匹配
    searchAction () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        let dataList = this.isTabActive === 0 ? this.todoDataArr : this.approvedDataArr
        dataList.map((item, index) => {
          let jsonStr = JSON.stringify(item)
          jsonStr.indexOf(this.inputV) === -1 ? item.isNotSearched = true : item.isNotSearched = false
        })
      }, 100)
    },
    // 请求 & 整理 列表数据
    getDataList (listType, begin, size) {
      begin = begin || 0
      size = size || 10
      return this.$axios.get(`/mobicampus/approve/v1/getApplicationList?list_type=${listType}&begin=${begin}&size=${size}`).then(({ data }) => {
        if (data.status === 200) {
          let dataArr = []
          let dataList = data.result.data.application_list
          this.showBg = begin === 0 && dataList.length === 0 // 判断列表数据 为空
          dataList.map(item => {
            // if (item.application.state_processed === '4') return
            // console.log('审批item', item)
            let dataObj = {}
            // 流程状态
            dataObj.processState = item.application.process_state
            // 当前节点状态
            dataObj.curNodeState = item.application.state_processed
            // 当前节点状态 文本
            dataObj.statusText = this.statusArr[item.application.state_processed]
            // 申请ID
            dataObj.id = item.application.id
            // 流程ID
            dataObj.processId = item.application.process_id
            // 提交人姓名
            dataObj.personName = item.application.create_user_name
            // 申请 title or name
            dataObj.applicationName = item.application.name
            // 提交时间
            let dateAndTime = item.application.create_time.split('+')[0].split('T')
            // 判断是否为今天
            let todayStr = new Date().toDateString()
            let dateStr = new Date(dateAndTime[0]).toDateString()
            // console.log('dateAndTime', dateAndTime)
            // 去除 年 的的显示
            let yearIndex = dateAndTime[0].indexOf('-')
            dateAndTime[0] = dateAndTime[0].slice(yearIndex + 1)
            // 去除 秒 的的显示
            let secIndex = dateAndTime[1].lastIndexOf(':')
            dateAndTime[1] = dateAndTime[1].slice(0, secIndex)
            dataObj.time = todayStr === dateStr ? dateAndTime[1] : dateAndTime[0] + ' ' + dateAndTime[1]
            // 请假
            if (item.application.module_code === 'leave') {
              dataObj.event = '请假'
              // 状态
              dataObj.statusText = this.statusArr[item.application.state_processed]
              dataObj.processState = item.application.process_state
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
              // 外出
            } else if (item.application.module_code === 'biztrip') {
              dataObj.event = '外出'
              // console.log('外出item', item)
              dataObj.processState = item.application.process_state
              dataObj.statusText = this.statusArr[item.application.state_processed]
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
              dataObj.statusText = this.statusArr[item.application.state_processed]
              dataObj.processState = item.application.process_state
              dataObj.contentArr = [
                ['调课事由', item.resource.reason]
              ]
            } else if (item.application.module_code === 'course_exchange_dnk') {
              dataObj.event = '顶课'
              // dataObj.statusText = this.statusArr[item.state_processed]
              dataObj.processState = item.application.process_state
              dataObj.statusText = this.statusArr[item.application.state_processed]
              dataObj.contentArr = [
                ['顶课事由', item.resource.reason]
              ]
            } else if (item.application.module_code === 'announce') {
              dataObj.event = '公告'
              dataObj.statusText = this.statusArr[item.application.state_processed]
              dataObj.processState = item.application.process_state
              dataObj.contentArr = [
                ['公告标题', item.resource.title],
                ['公告类型', item.resource.type_name],
                ['公告内容', item.resource.content]
              ]
            } else if (item.application.module_code === 'attend_appeal') {
              let typeArr = ['', '迟到', '早退', '正常', '异常', '缺卡']
              dataObj.event = '申诉'
              dataObj.statusText = this.statusArr[item.application.state_processed]
              dataObj.processState = item.application.process_state
              dataObj.contentArr = [
                ['异常日期', item.resource.date_to_clock.split('T')[0]],
                ['异常情况', typeArr[item.resource.type]],
                ['申诉理由', item.resource.reason]
              ]
            } else if (item.application.module_code === 'fund') {
              dataObj.event = '经费'
              dataObj.statusText = this.statusArr[item.application.state_processed]
              dataObj.processState = item.application.process_state
              dataObj.contentArr = [
                ['经费金额', item.resource.amount],
                ['经费类型', item.resource.type_name],
                ['经费事由', item.resource.desc]
              ]
            } else if (item.application.module_code === 'assets_purchase') {
              dataObj.event = '采购'
              dataObj.statusText = this.statusArr[item.application.state_processed]
              dataObj.processState = item.application.process_state
              dataObj.contentArr = [
                ['采购事由', item.resource.desc],
                ['采购金额', item.resource.amount + '元']
              ]
            } else if (item.application.module_code === 'car_using') {
              dataObj.event = '用车'
              dataObj.statusText = this.statusArr[item.application.state_processed]
              dataObj.processState = item.application.process_state
              dataObj.contentArr = [
                ['用车人数', item.resource.desc],
                ['用车目的地', item.resource.destination],
                ['用车事由', item.resource.number_of_people + '人']
              ]
            }
            dataObj.isSelected = false
            dataObj.isNotSearched = false
            dataArr.push(dataObj)
          })
          // console.log('dataArr', dataArr)
          return dataArr
        }
      })
      // })
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
.approvalCom {
  padding: 86px 0 80px;
  &.isHide {
    height: 0;
    overflow: hidden;
  }
  .head {
    padding-top: 12px;
    // height: 54px;
    margin-bottom: 26px;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 1;
    .tabs-box {
      display: flex;
      .tab {
        flex: 1;
        text-align: center;
        font-size: 15px;
        line-height: 19px;
        color: #7abfff;
        position: relative;
        /* font-weight: bold; */
        .underline-box {
          width: 30px;
          height: 2px;
          background-color: #fff;
          position: absolute;
          bottom: -5px;
          left: 50%;
          margin-left: -15px;
        }
      }
      .tab.active {
        color: #fff;
      }
    }
  }
  .item-box {
    padding: 1PX 0;
    width: 100%;
    position: relative;
    overflow: hidden;
    transform: translate(0, 0);
    .singleSel-box {
      width: 22px;
      height: 22px;
      /* background-color: #88b8f8; */
      border-radius: 50%;
      border: #c4c5c7 1PX solid;
      position: absolute;
      left: 16px;
      top: 50%;
      margin-top: -11px;
    }
    .singleSel-box.active {
      border: none;
    }
    .itemContent-box {
      position: relative;
      background-color: #fff;
      border-radius: 9px;
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
        .status.filtelActive {
          display: none;
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
          width: 80px;
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
  .bottom-allSel-box {
    position: fixed;
    width: 100%;
    height: 54px;
    display: flex;
    bottom: -54px;
    left: 0;
    z-index: 10;
    transition: all 0.5s;
    .btn-cancel {
      flex: 1;
      background-color: #fff;
      color: #999;
      display: flex;
      .cancel-left {
        width: 55px;
      }
      .cancel-right {
        flex: 1;
        text-align: center;
        line-height: 54px;
      }
      .singleSel-box {
        width: 22px;
        height: 22px;
        /* background-color: #88b8f8; */
        border-radius: 50%;
        position: absolute;
        left: 16px;
        top: 50%;
        margin-top: -11px;
        border: #c4c5c7 1PX solid;
      }
      .singleSel-box.active {
        border: none;
      }
    }
    .btn-sure {
      flex: 1;
      background-color: #7fc1fe;
      text-align: center;
      line-height: 54px;
      color: #fff;
    }
  }
  .bottom-allSel-box.active {
    bottom: -0px;
  }
}
.singleSel-box .iconfont-approval {
  font-size: 25px;
  line-height: 25px;
  display: inline-block;
  position: relative;
  left: -1PX;
  top: -1PX;
  color: #88b8f8;
}
.all-select {
  width: 79px;
  border-left: 1PX solid #ddd;
  color: #999;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
  .icon-box.allSel {
    display: inline-block;
    margin-left: 12px;
    float: left;
    line-height: 30px;
    /* vertical-align: middle; */
    .icon-allSel:before {
      font-size: 20px;
      content: "\e6ca";
    }
  }
  .words-box {
    width: 28px;
    line-height: 12px;
    font-size: 12px;
    margin-left: 8px;
    display: inline-block;
    float: left;
    /* vertical-align: middle; */
    span {
      align-items: center;
      height: 24px;
      display: inline-block;
      margin-top: 3px;
      font-weight: bold;
    }
  }
}
.all-select.active {
  background-color: #88b8f8;
  color: #fff;
}
</style>
