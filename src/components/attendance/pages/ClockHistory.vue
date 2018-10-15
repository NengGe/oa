<template>
  <div class="clock-history page-bg">
    <calendarMonth @dateChange="onDateChange"></calendarMonth>
    <div class="detail-box">
      <div class="duration" v-for="(item, i) in dataList" :key="'dataList'+i">
        <div class="time-box">
          <span class="time">{{item.startTime}}</span>
          <span class="line"></span>
          <span class="time">{{item.endTime}}</span>
        </div>
        <div class="content">
          <div class="status-box row1">
            <span :class="['status', stateClassArr[item.signIn.state]]">{{item.signIn.stateText}}</span>
            <span class="status-time">{{item.signIn.clockTime?`打卡时间${item.signIn.clockTime}`:''}}</span>
            <span class="appeal-btn" v-if="item.signIn.state !== '3'" @click="appealAction(item, 'signIn', item.startTime)">申诉</span>
          </div>
          <div class="status-box row2">
            <span :class="['status', stateClassArr[item.signOut.state]]">{{item.signOut.stateText}}</span>
            <span class="status-time">{{item.signOut.clockTime?`打卡时间${item.signOut.clockTime}`:''}}</span>
            <span class="appeal-btn"  v-if="item.signOut.state !== '3'"  @click="appealAction(item, 'signOut', item.endTime)">申诉</span>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import calendarMonth from '@/modules/calendar/calendarMonth'
export default {
  data () {
    return {
      dateStr: '',
      stateArr: ['', '迟到', '早退', '正常', '异常', '缺卡'],
      stateClassArr: ['', 'orange', 'red', 'green', 'red', 'red'],
      timer: null,
      dataList: [],
      dataCache: {} // 缓存已请求的日期数据
    }
  },
  created () {

  },
  components: {
    calendarMonth
  },
  methods: {
    appealAction (item, typeStr, timeToClock) {
      let query = {
        schedule_id: item.scheduleId,
        clocking_id: item[typeStr].clockId,
        date_to_clock: this.dateStr,
        time_to_clock: timeToClock,
        type: item[typeStr].state,
        old_clock_time: item[typeStr].clockTime
      }
      this.$router.push({name: 'appeal', query})
    },
    // 监听日期改变
    onDateChange ({dateStr}) {
      this.dateStr = dateStr
      if (this.dataCache.hasOwnProperty(dateStr)) {
        this.dataList = this.dataCache[dateStr]
        return
      }
      this.getClockingHistory(dateStr).then((dataArr) => {
        this.dataCache[dateStr] = dataArr
        this.dataList = dataArr
        // console.log('this.dataList', this.dataList)
      })
    },
    getClockingHistory (dateStr) {
      // let {currYear, currMonth, currDay} = this
      return this.$axios.get(`/mobicampus/attend/v1/getClockingHistory?date=${dateStr}`).then(({data}) => {
        if (data.status === 200) {
          console.log('if-data', data)
          let dataList = data.result.data
          let dataArr = []
          dataArr = dataList.map(item => {
            let signIn = { // 签到状态
              clockId: '0',
              state: '5',
              stateText: '缺卡',
              clockTime: ''
            }
            let signOut = { // 签退状态
              clockId: '0',
              state: '5',
              stateText: '缺卡',
              clockTime: ''
            }
            item.clocking_list.forEach(clockItem => {
              if (clockItem.clock_type === '1') {
                signIn.clockId = clockItem.id
                signIn.state = clockItem.state
                signIn.stateText = this.stateArr[clockItem.state]
                signIn.clockTime = clockItem.clock_time.split('+')[0].split('T')[1].substring(0, 5)
              } else if (clockItem.clock_type === '2') {
                signOut.clockId = clockItem.id
                signOut.state = clockItem.state
                signOut.stateText = this.stateArr[clockItem.state]
                signOut.clockTime = clockItem.clock_time.split('+')[0].split('T')[1].substring(0, 5)
              }
            })
            if (item.clockin_is_special_occasion === 'true') { // 上班打卡 特殊情况
              signIn.state = '3'
              // console.log('item', item.clockin_is_special_occasion)
              signIn.stateText = item.clockin_special_list[0]
              signIn.clockTime = ''
            }
            if (item.clockout_is_special_occasion === 'true') { // 下班打卡 特殊情况
              signOut.state = '3'
              signOut.stateText = item.clockin_special_list[0]
              signOut.clockTime = ''
            }
            return {
              scheduleId: item.schedule_id,
              startTime: item.start_time,
              endTime: item.end_time,
              signIn,
              signOut
            }
          })
          return dataArr
        } else {
          console.log('else-data', data)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.clock-history{
  .detail-box{
    margin-top: 12px;
    background: #fff;
    padding: 10px;
    .duration{
      padding-bottom: 10px;
      padding-top: 10px;
      &:last-child{
        border-bottom: 0;
      }
      border-bottom: 1PX #ddd solid;
      line-height: 22px;
      display: flex;
      .time-box{
        width: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        span{
          display: block;
        }
        .time{
          color: #333;
        }
        .line{
          height: 33px;
          border-left: 1PX solid #000;
        }
      }
      .content{
        font-size: 18px;
        flex: 1;
        span{
          display: inline-block;
        }
        .status-box{
          position: relative;
          &.row1{
            margin-bottom: 33px;
          }
          .status{
            margin: 0 18px;
          }
          .appeal-btn{
            font-size: 15px;
            position: absolute;
            right: 10px;
            top: 0;
            color: #53a2ed;
          }
        }
      }
    }
  }
}
.status.red{
  color: #ed5564;
}
.status.green{
  color: #47d192;
}
.status.orange{
  color: #fea21e;
}
</style>
