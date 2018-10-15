<template>
  <div class="leaveSchool">
    <CalendarWeek @dateChange="onDateChange"></CalendarWeek>
    <div class="list-head">
      <span class="text">我的班级</span>
    </div>
    <ul class="list">
      <li class="item" v-for="(item, i) in dataArr" :key="'dataArr'+i" v-show="item.isShow">
        <div class="l grade-class">
          <div class="name-box">
            <span>{{`${item.grade_name}${item.class_name}`}}</span>
            <span v-show="item.is_self === 'false'">(代管)</span>
          </div>
          <div class="time-box">
            放学时间： {{isAM? '上午':'下午'}}
            <span class="time">{{isAM? item.am_end_time:item.pm_end_time}}</span>
            放学
          </div>
        </div>
        <div class="r btn" :class="[item.overType === 0?'green':item.overType === 1?'red':'gray']" @click="btnAction(item)">{{item.overType === 0?'确定离校':item.overType === 1?'正在离校':'已经离校'}}</div>
      </li>
    </ul>
    <confirmBox v-show="isShowConfirmBox" @cancelAction='onCancel' @confirmAction='onConfirm'></confirmBox>
  </div>
</template>

<script>
import CalendarWeek from '@/modules/calendar/calendarWeek'
import confirmBox from './index/confirmBox'
export default {
  components: {
    CalendarWeek,
    confirmBox
  },
  data () {
    return {
      isAM: new Date().getHours() < 13,
      currClass: null,
      isShowConfirmBox: false,
      dateStr: '',
      dataArr: []
    }
  },
  computed: {
    isToday () {
      let arr = this.dateStr ? this.dateStr.split('-') : []
      let d = new Date()
      let y = d.getFullYear()
      let m = d.getMonth() + 1
      let day = d.getDate()
      if (y === Number(arr[0]) && m === Number(arr[1]) && day === Number(arr[2])) {
        return true
      }
      return false
    }
  },
  created () {
    this.aaa()
  },
  methods: {
    aaa () {
      this.dateStr = '2018-08-30'
      // let arr = this.dateStr.split('-') || []
      // let b = new Date(...arr)
    },
    onConfirm () {
      let data = {
        class_id: this.currClass.class_id,
        over_type: 1,
        range_type: this.isAM ? 'am' : 'pm'
      }
      this.postUpdateClassOverStatus(data).then(() => {
        this.currClass.overType = 2
        this.isShowConfirmBox = false
        this.$simpleMsg('已推迟放学')
      })
    },
    onCancel () {
      this.isShowConfirmBox = false
    },
    btnAction (item) {
      if (!this.isToday) return
      this.currClass = item
      if (item.overType === 0) {
        // this.isShowConfirmBox = true
        this.postSet(item.class_id).then(() => {
          item.overType = 1
        })
      } else if (item.overType === 1) {
        // item.overType = 3
        // let data = {
        //   class_id: item.class_id,
        //   over_type: 3,
        //   range_type: this.isAM ? 'am' : 'pm'
        // }
        // this.postUpdateClassOverStatus(data).then(() => {
        //   this.$simpleMsg('已放学')
        // })
      }
    },
    onDateChange ({ dateStr }) {
      this.dateStr = dateStr
      this.getMyManagedClasses(dateStr).then(dataArr => {
        this.dataArr = dataArr
      })
    },
    // 请求班级数据
    getMyManagedClasses (dateStr) {
      this.$preloaderFull.show()
      return this.$axios.get(`/classcard/v1/myManagedClasses?query_date=${dateStr}`).then(({ data }) => {
        // console.log('data', data)
        if (data.status === 200) {
          let dataArr = data.result.classes.map(item => {
            item.overType = parseInt(item.over_type)
            item.isShow = item.is_self === 'true' || item.escrow_type === '3' || item.escrow_type - this.isAM !== 1
            return item
          })
          this.$preloaderFull.close()
          return dataArr
        }
      })
    },
    // 更新离校状态
    postUpdateClassOverStatus (data) {
      this.$preloaderFull.show()
      // return this.$axios.get(`/classcard/v1/myManagedClasses?query_date=${'2018-05-20'}`).then(({ data }) => {
      return this.$axios.post(`/classcard/v1/updateClassOverStatus`, data).then(({ data }) => {
        // console.log('data', data)
        if (data.status === 200) {
          this.$preloaderFull.close()
        }
      })
    },
    // 插入离校状态
    postSet (classId) {
      let d = {
        class_id: classId,
        over_type: 1
      }
      this.$preloaderFull.show()
      return this.$axios.post(`/classcard/v1/ludui/classover/set`, d).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.$simpleMsg('正在离校')
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.list-head {
  font-size: 15px;
  color: #5097f8;
  line-height: 65px;
  padding-left: 16px;
}
.list {
  border-top: solid 1PX #dddddd;
  background-color: #fff;
  padding: 0 16px;
  .item {
    border-top: solid 1PX #dddddd;
    padding-top: 17px;
    display: flex;
    height: 92px;
    line-height: 26px;
    box-sizing: border-box;
    &:first-child {
      border-top: 0;
    }
    .l {
      flex: 1;
      .name-box {
        font-size: 16px;
        font-weight: bold;
      }
    }
    .r {
      height: 26px;
      line-height: 26px;
      border-radius: 13px;
      padding: 0 18px;
    }
    .time-box {
      color: #999;
      .time {
        color: #efb458;
      }
    }
  }
}
.red {
  color: #ed5564;
  border: 1PX #ed5564 solid;
}
.green {
  color: #fff;
  background-color: #1ab394;
}
.gray {
  color: #999;
  border: 1PX #999 solid;
}
</style>


