<template>
  <div class="calendar">
    <!-- 当前日期 && 今天Btn -->
    <div class="head date">
      <a class="todayBtn" @click="todayBtnAction">今</a>
      <div class="date-box" @click="dateBoxAction">
        <span>{{dateStr}}</span>
        <span class="iconfont icon" :class="{active: isShowSelectBox}">&#xe6ac;</span>
      </div>
    </div>
    <!-- 选择年月 -->
    <div class="select-box" :class="{active: isShowSelectBox}">
      <!-- 年 -->
      <div class="select-year">
        <span class="sub icon" @click="yearSubAdd(-1)">‹</span>
        <span class="year">{{currYear}}</span>
        <span class="add icon" @click="yearSubAdd(1)">›</span>
      </div>
      <!-- 月 -->
      <div class="select-month">
        <ul class="monthList cf">
          <li class="month" :class="{active: parseInt(currMonth)===i+1}" @click="monthActive(i)"
            v-for="(month, i) in monthList" :key="'monthList'+i">{{month}}
          </li>
        </ul>
      </div>
    </div>
    <!-- 日历 -->
    <div class="calendar-box">
      <div class="week-box">
        <ul class="weekList">
          <li class="week" v-for="(week, i) in weekList" :key="'weekList'+i">{{week}}</li>
        </ul>
      </div>
      <div class="swiper-container">
        <div class="wrapper cf" ref="wrapper" :class="{active: isActiveWrapper}">
          <!-- 上个月daylist -->
          <div class="day-box last">
            <ul class="dayList  cf">
              <li class="day" :class="{'noCurrMonth': parseInt(oDate.month)%12!==parseInt(currMonth - 1)}" v-for="(oDate, i) in lastMonthDayList" :key="'lastMonthDayList'+i">
                <span class="num">{{oDate.day}}</span>
              </li>
            </ul>
          </div>
          <!-- 当月daylist -->
          <div class="day-box curr">
            <ul class="dayList  cf">
              <li @click="dayAction(oDate)" class="day" :class="{'noCurrMonth': parseInt(oDate.month)!==parseInt(currMonth)}" v-for="(oDate, i) in dayList" :key="'dayList'+i">
                <span class="num" :class="{'active': parseInt(currDay) === parseInt(oDate.day)}">{{oDate.day}}</span>
              </li>
            </ul>
          </div>
           <!-- 下个月daylist -->
          <div class="day-box next">
            <ul class="dayList  cf">
              <li class="day" :class="{'noCurrMonth': parseInt(oDate.month)!==parseInt(currMonth)%12+1}" v-for="(oDate, i) in nextMonthDayList" :key="'nextMonthDayList'+i">
                <span class="num">{{oDate.day}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActiveWrapper: false,
      startX: 0, // 按下位置
      endX: 0, // 松开位置
      offsetX: 0, // 偏移位置
      isShowSelectBox: false,
      currYear: '',
      currMonth: '',
      currDay: '',
      monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      weekList: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      dayList: [],
      lastMonthDayList: [],
      nextMonthDayList: []
    }
  },
  computed: {
    'dateStr': function () {
      let year = this.currYear
      let month = this.fillNum(this.currMonth)
      let day = this.fillNum(this.currDay)
      return `${year}-${month}-${day}`
    }
  },
  watch: {
    'dateStr': function () {
      this.$emit('dateChange', {
        year: this.currYear,
        month: this.currMonth,
        day: this.currDay,
        dateStr: this.dateStr
      })
    },
    'currYear': function () {
      this.getAllDayList(this.currYear, this.currMonth)
    },
    'currMonth': function (newV, oldV) {
      // console.log(newV, oldV)
      this.getAllDayList(this.currYear, this.currMonth)
    }
  },
  created () {
    let d = new Date()
    this.getCurrDate(d)
  },
  mounted () {
    let wrapper = this.$refs.wrapper
    wrapper.addEventListener('touchstart', this.onTouchstart)
  },
  methods: {
    todayBtnAction () {
      let d = new Date()
      this.getCurrDate(d)
    },
    onTouchstart (ev) {
      if (this.isActiveWrapper) return
      let wrapper = this.$refs.wrapper
      this.startX = ev.changedTouches[0].clientX
      wrapper.addEventListener('touchmove', this.onTouchmove)
      wrapper.addEventListener('touchend', this.onTouchend)
    },
    onTouchmove (ev) {
      let wrapper = this.$refs.wrapper
      let currX = ev.changedTouches[0].clientX
      this.offsetX = currX - this.startX + this.endX
      wrapper.style.left = this.offsetX + 'px'
    },
    onTouchend () {
      let wrapper = this.$refs.wrapper
      this.endX = this.offsetX
      wrapper.removeEventListener('touchmove', this.onTouchmove)
      wrapper.removeEventListener('touchend', this.onTouchend)
      this.touchendCb(this.offsetX)
    },
    touchendCb (offsetX) {
      this.initMoveData()
      if (offsetX > 100) { // 右滑
        this.transitionAction(-1)
        this.$refs.wrapper.style.left = '100%'
      } else if (offsetX < -100) { // 左滑
        this.transitionAction(1)
        this.$refs.wrapper.style.left = '-100%'
      } else { // 滑动距离不够
        this.transitionAction(0)
        this.$refs.wrapper.style.left = 0
      }
    },
    transitionAction (p) {
      this.isActiveWrapper = true
      setTimeout(() => {
        this.monthSubAdd(p)
        this.isActiveWrapper = false
        this.$refs.wrapper.style.left = 0
      }, 300)
    },
    initMoveData () {
      this.startX = 0
      this.endX = 0
      this.offsetX = 0
    },
    dayAction (day) {
      if (parseInt(day.month) === parseInt(this.currMonth)) {
        this.currDay = day.day
      }
    },
    getAllDayList (currYear, currMonth) {
      this.dayList = this.getDayList(currYear, currMonth)
      this.lastMonthDayList = this.getDayList(currYear, currMonth - 1)
      this.nextMonthDayList = this.getDayList(currYear, parseInt(currMonth) + 1)
    },
    getDayList (currYear, currMonth) {
      let d = new Date(currYear, currMonth - 1, 1)
      let dayOfWeek = d.getDay() // 1号星期几
      d.setMonth(currMonth)
      d.setDate(0)
      let dayNum = d.getDate() // 获取当月天数
      let dayList = []
      for (let i = 1; i <= dayNum + dayOfWeek; i++) {
        if (i <= dayNum) {
          dayList.push({
            year: currYear,
            month: currMonth,
            day: i
          })
        } else {
          let oDate = new Date(currYear, currMonth - 1, i - dayNum - dayOfWeek)
          dayList.unshift({
            year: oDate.getFullYear(),
            month: oDate.getMonth() + 1,
            day: oDate.getDate()
          })
        }
      }
      return dayList
    },
    monthActive (i) {
      this.currMonth = i + 1
      this.isShowSelectBox = false
    },
    monthSubAdd (p) {
      let d = new Date(this.currYear, parseInt(this.currMonth) - 1 + parseInt(p), this.currDay)
      this.getCurrDate(d)
    },
    yearSubAdd (p) {
      this.currYear += p
    },
    dateBoxAction () {
      this.isShowSelectBox = !this.isShowSelectBox
    },
    // 获取当前--年月日
    getCurrDate (d) {
      this.currYear = d.getFullYear()
      this.currMonth = d.getMonth() + 1
      this.currDay = d.getDate()
    },
    // 补齐两位
    fillNum (num) {
      return num >= 10 ? num : `0${parseInt(num)}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .calendar{
    .head{
      background-color: #fff;
      position: relative;
      font-size: 18px;
      color: #3d72a4;
      text-align: center;
      line-height: 44px;
      .date-box{
        width: 133px;
        margin: 0 auto;
        .icon{
          vertical-align: bottom;
          font-size: 12px;
          display: inline-block;
          transition: transform 0.3s;
          &.active{
            transform: rotate(180deg);
          }
        }
      }
      .todayBtn{
        font-size: 12px;
        position: absolute;
        right: 12px;
        top: 11px;
        background: #75d5f9;
        color: #fff;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        line-height: 22px;
      }
    }
    .select-box{
      transition: height 0.3s;
      height: 0px;
      overflow: hidden;
      &.active{
        height: 164px;
      }
      .select-year{
        color: #12b7f5;
        font-weight: bold;
        text-align: center;
        line-height: 40px;
        .icon{
          padding: 0 28px;
          font-size: 30px;
          vertical-align: sub;
        }
      }
      .select-month{
        .monthList{
          .month{
            color: #12b7f5;
            width: 21%;
            margin-left: 2%;
            margin-right: 2%;
            height: 32px;
            margin-top: 4px;
            margin-bottom: 4px;
            float: left;
            line-height: 32px;
            text-align: center;
            font-size: 14px;
            border-radius: 6px;
            &.active{
              background-color: #15c7f4;
              color: #fff;
            }
          }
        }
      }
    }
    .calendar-box{
      .week-box{
        padding: 0 10px;
        background: #fff;
        font-size: 11px;
        line-height: 44px;
        color: #666;
        border-bottom: 1PX #ddd solid;
        .weekList{
          display: flex;
          .week{
            flex: 1;
            text-align: center;
            &:nth-child(7n+1){
              color: #999;
            }
            &:nth-child(7n){
              color: #999;
            }
          }
        }
      }
      .swiper-container{
        overflow: hidden;
        .wrapper{
          position: relative;
          left: 0;
          top: 0;
          // transform: translateX(-33.33%);
          width: 100%;
          // display: flex;
          &.active{
            transition: all 0.3s;
          }
          .day-box{
            transition: all 0.3s;
            box-sizing: border-box;
            float: left;
            background-color: #fff;
            padding: 0 10px;
            // flex: 1;
            width: 100%;
            &.last{
              position: absolute;
              left: -100%;
              top: 0;
            }
            &.next{
              position: absolute;
              left: 100%;
              top: 0;
            }
            .dayList{
              .day{
                // display: flex;
                height: 50px;
                font-size: 17px;
                color: #111;
                float: left;
                width: 14.28%; // 1/7
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                &.noCurrMonth{
                  opacity: 0;
                  // color: red;
                }
                &:nth-child(7n+1){
                  color: #999;
                }
                &:nth-child(7n){
                  color: #999;
                }
                .num{
                  font-weight: 500;
                  width: 37px;
                  height: 37px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-radius: 50px;
                  &.active{
                    background: #69a1d6;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
