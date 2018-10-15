<template>
  <div class="calendar">
    <div class="c-head"><a class="sel" @click="clickTimeSelect" :class="{unfold:timeSelectShow}">{{currYearMonth}}
      <span class="down-arrow iconfont"></span></a> <a @click="goToday" class="c-today" :class="{grey:!isToday}">今</a></div>
    <transition name="slide">
      <div class="sel-list" v-show="timeSelectShow">
        <div class="s-year" @click="yearChange">
          <span class="y">{{year}}</span>
          <a class="la">‹</a>
          <a class="ra">›</a>
        </div>
        <div class="month-box" @click="monthChange">
          <div class="mon" v-for="(m,i) in monthData" :data-index="i" :class="{selected:i===month-1}">{{m}}</div>
        </div>
      </div>
    </transition>
    <div class="week">
      <div class="wk" v-for="(v,i) in week" :class="{hday:i>4}">周{{v}}</div>
    </div>
    <div ref="eSlideLoader" class="slide-loader">
      <ul class="sl-move" @click="daySelect">
        <li class="sl-item" v-for="(week,i) in weeks" :data-index="i">
          <div class="days">
            <div class="day" v-for="d in week.firstDays" :class="{grey:whichHalf===0,tdy:week.daysKey[d]===nowWeek.currDate,selected:currWeek.startDate===week.startDate&&week.currDay===d,has:hasData(d,week)}" :data-val="d"><span>{{d}}</span></div>
            <div class="day" v-for="d in week.secondDays" :class="{grey:whichHalf===1,tdy:week.daysKey[d]===nowWeek.currDate,selected:currWeek.startDate===week.startDate&&week.currDay===d,has:hasData(d,week)}" :data-val="d"><span>{{d}}</span></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import WeekHandle from './week'
  import SliderOne from '../slider-one/slider-one'
  import scopeElements from '../corejs/dom/scope-elements'
  export default {
    name: 'calendar',
    data () {
      return {
        week: ['一', '二', '三', '四', '五', '六', '日'],
        monthData: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        weeks: [{
          currDay: 0, // 当前天
          currDate: '', // 当前选择。默认为 startDate。加载数据根据此初始化
          startDate: '', // 一周的开始时间。可作为id
          endDate: '', // 一周的结束时间
          firstDays: [],
          secondDays: [],
          // 可快速判断选定天是否在当前星期
          daysKey: {},

          // 新加
          isNowWeek: false, // 当前周
          calendarData: undefined // 这一周的日程数据
          // calendarData: {
          //   '2017-12-03': [] // 各种数据
          // }
        }, {
          currDate: '',
          startDate: '',
          endDate: '',
          firstDays: [],
          secondDays: [],
          daysKey: {}
        }, {
          currDate: '',
          startDate: '',
          endDate: '',
          firstDays: [],
          secondDays: [],
          daysKey: {}
        }],
        isToday: false,
        // 当前周
        nowWeek: {
        },
        positionData: [],

        year: '',
        month: '',
        timeSelectShow: 0, // 年月选择是否显示
        list: []
      }
    },
    computed: {
      currYearMonth () {
        return this.getCurrWeek().currDate
      },
      currWeek () {
        return this.getCurrWeek()
      },
      whichHalf () {
        let week = this.getCurrWeek()
        let firstDay = week.firstDays[0]
        if (firstDay === undefined || week.currDay < firstDay) {
          // 当前焦点在下半
          return 0
        }
        return 1
      }
    },
    created () {
      let weekHandle = this.weekHandle = new WeekHandle()
      this.nowWeek = weekHandle.buildWeekData(new Date())
    },
    mounted () {
      let {eSlideLoader} = this.$refs
      let sliderOne = this.sliderOne = new SliderOne({
        eDrag: eSlideLoader,
        boxW: eSlideLoader.clientWidth
      })
      let positionData = this.positionData = sliderOne.sliderPositionData.data
      sliderOne.changeLeft = () => {
        let week = this.weeks[positionData[1].item]
        this.buildWeeksData(week.currDate)
        this.loadWeekDate(week)
      }
      sliderOne.changeRight = () => {
        let week = this.weeks[positionData[1].item]
        this.buildWeeksData(week.currDate)
        this.loadWeekDate(week)
      }
      sliderOne.changeAnimateEnd = () => {
        this.buildWeeksData(this.weeks[positionData[1].item].currDate)
      }

      this.buildWeeksData(new Date())
      this.loadWeekDate(this.getCurrWeek())
    },
    methods: {
      // 根据当前时间构建两边 week
      buildWeeksData (date) {
        let {weeks, nowWeek, weekHandle} = this
        let currWeek = weekHandle.buildWeekData(date)
        let preWeek = new Date(currWeek.startDate)
        preWeek.setDate(preWeek.getDate() - 7)
        let nextWeek = new Date(currWeek.endDate)
        nextWeek.setDate(nextWeek.getDate() + 1)
        let ws = [
          weekHandle.buildWeekData(preWeek),
          currWeek,
          weekHandle.buildWeekData(nextWeek)
        ]
        this.positionData.forEach((d, i) => {
          let itemIndex = d.item
          let weekData = weeks[itemIndex]
          let weekTarget = ws[i]
          if (weekData.startDate !== weekTarget.startDate) {
            if (weekTarget.startDate === nowWeek.startDate) {
              weekTarget.isNowWeek = true
            }
            this.$set(this.weeks, itemIndex, weekTarget)
          }
        })
        this.todayStateHandle()
      },
      daySelect (e) {
        let {target} = e
        scopeElements(target, elem => {
          if (elem.tagName === 'UL') return false
          if (elem.classList.contains('day')) {
            this.dayChange(elem.dataset.val)
            return false
          }
        })
      },
      dayChange (day) {
        let week = this.getCurrWeek()
        week.currDay = day * 1
        week.currDate = week.daysKey[day]
        this.todayStateHandle()
        this.loadDayDataList(week)
      },
      // 编程改变。会触发滑动
      weekChange (date) {
        let {weeks, weekHandle, sliderOne, positionData} = this
        if (sliderOne.isRun) return
        let currWeek = weekHandle.buildWeekData(date)
        let week = weeks[positionData[1].item]
        if (currWeek.startDate < week.startDate) {
          let preItemIndex = positionData[0].item
          let preWeek = weeks[preItemIndex]
          if (preWeek.startDate !== currWeek.startDate) {
            this.$set(this.weeks, preItemIndex, currWeek)
          }
          sliderOne.swipeRight()
          this.loadWeekDate(currWeek)
        } else if (currWeek.startDate > week.startDate) {
          let nextItemIndex = positionData[2].item
          let nextWeek = weeks[nextItemIndex]
          if (nextWeek.startDate !== currWeek.startDate) {
            this.$set(this.weeks, nextItemIndex, currWeek)
          }
          sliderOne.swipeLeft()
          this.loadWeekDate(currWeek)
        }
      },
      getCurrWeek () {
        let position = this.positionData[1]
        let itemIndex = position ? position.item : 1
        return this.weeks[itemIndex]
      },
      goToday () {
        if (this.sliderOne.isRun) return
        let week = this.getCurrWeek()
        let {nowWeek} = this
        // 当前周切换
        if (week.startDate === nowWeek.startDate) {
          this.dayChange(nowWeek.currDay)
        } else {
          this.weekChange(new Date(), true)
        }
      },
      todayStateHandle () {
        // 当前周
        this.isToday = this.getCurrWeek().currDate === this.nowWeek.currDate
      },
      clickTimeSelect () {
        let timeSelectShow = this.timeSelectShow = !this.timeSelectShow
        if (timeSelectShow) {
          let ym = this.currYearMonth.split('-')
          this.year = ym[0]
          this.month = ym[1]
        }
      },
      yearChange (e) {
        let {classList} = e.target
        if (classList.contains('la')) {
          this.year = this.year - 1
        } else if (classList.contains('ra')) {
          this.year = this.year * 1 + 1
        }
      },
      monthChange (e) {
        let {target} = e
        let {classList} = target
        if (classList.contains('mon')) {
          let {index} = target.dataset
          let month = this.month = index * 1 + 1
          this.weekChange(`${this.year}/${month}/1`)
          this.timeSelectShow = 0
        }
      },
      // 某天是否有日程数据
      hasData (d, week) {
        let {calendarData, daysKey} = week
        if (calendarData) {
          return calendarData[daysKey[d]] !== undefined
        }
        return false
      },
      loadWeekDate (week) {
        // ('加载数据', week)
        if (!week.calendarData) {
          // ('加载数据', week)
          this.$emit('loadWeekDate', week, data => {
            let calendarData = {}
            data.forEach(d => {
              let startDate = d.start_time.match(/[\d]{1,4}-\d\d-\d\d/)[0]
              let list = calendarData[startDate]
              if (list === undefined) {
                calendarData[startDate] = list = []
              }
              list.push(d)
            })
            this.$set(week, 'calendarData', calendarData)
            this.loadDayDataList(week)
          })
        } else {
          this.loadDayDataList(week)
        }
      },
      // 显示当天日程
      loadDayDataList (week) {
        let list = []
        if (week.calendarData) {
          list = week.calendarData[week.currDate] || list
        }
        this.$emit('dayDataListChange', list)
      }
    },
    watch: {
      timeSelectShow (v) {
        this.$emit('timeSelectShow', v)
      }
    }
  }
</script>

<style scoped>
  .slide-leave-active,
  .slide-enter-active{
    transition: 0.3s ease;
    transition-property:height;
    overflow: hidden;
  }
  .slide-enter,
  .slide-leave-to{
    height: 0;
  }
  .slide-leave,
  .slide-enter-to{
    height:168px;
  }

  .calendar {
    background-color: #fff;
    border-radius: 10px;
    width: 96%;
    margin: 0 2%;
    font-size: 12px;
    padding-bottom: 9px;
    a{
      /*color: #fff;*/
    }
  }

  .c-head {
    text-align: center;
    position: relative;
    font-size: 14px;
    span {
      position: relative;
      font-size: 12px;
      display: inline-block;
      width: 18px;
      height: 16px;
      color:#ddd;
      &::after {
        content:'\e6ac';
        position: absolute;
        top:3px;
        left: 0;
        -webkit-transition: all 0.35s ease;
        -moz-transition: all 0.35s ease;
        transition: all 0.35s ease;
      }
    }
    .sel {
      padding: 14px 0 16px 0;
      font-size: 17px;
      color: #666;
      display: inline-block;

      /*border: 10px solid #000;
      border-top-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      border-left-width: 6px;
      border-right-width: 6px;*/
    }
    .sel.unfold .down-arrow{
      &::after {
        transform: rotate(180deg);
        display: inline-block;
        top:1px;
      }
    }
    .c-today {
      position: absolute;
      right: 12px;
      top: 14px;
      background: #12b7f5;
      color: #fff;
      width: 23px;
      height: 23px;
      border-radius: 50%;
      line-height: 1.6;
      &.grey {
        opacity: 0.4;
      }
    }
  }

  .sel-list{

    .s-year{
      position: relative;
      text-align: center;
      .y{
        font-size: 16px;
        color: #12b7f5;
        font-weight: bold;
      }

      a{
        position: absolute;
        right: 18px;
        top: -4px;
        width: 30px;
        height: 30px;
        line-height: 75%;
        font-size: 32px;
        color: #12b7f5;
      }
      .la{
        left: 18px;

      }
      .ra{
      }
    }
    .month-box{
      padding-top: 4px;
      padding-bottom: 4px;
      background: #fafafa;
      border-radius: 6px;
      overflow: hidden;
      margin: 12px 10px;
    }
    .mon{
      color: #12b7f5;
      width: 21%;
      margin-left: 2%;
      margin-right: 2%;
      height: 32px;
      margin-top:4px;
      margin-bottom: 4px;
      float: left;
      line-height: 32px;
      text-align: center;
      font-size: 16px;
      border-radius: 6px;
      &:active,&.selected{
        background-color: #b4e3fd;
        color:#fff;
      }
    }
  }

  .week {
    display: flex;
    text-align: center;
    height: 25px;
    .wk {
      flex: 1;
      font-size: 14px;
      line-height: 18px;
    }
    .hday {
      color: #d8cf74;
    }
  }

  .days {
    display: flex;
    text-align: center;
    .day {
      flex: 1;
      padding-top: 6px;
      span{
        display: block;
        width: 32px;
        height: 32px;
        box-sizing: border-box;
        border-radius: 100%;
        line-height: 32px;
        /*border: 1PX solid transparent;*/
        margin: 0 auto;
        font-size: 14px;
      }
      &.has:after{
        content: '';
        display: block;
        width: 7px;
        height: 7px;
        background-color: #12b7f5;
        margin: 7px auto 0;
        border-radius: 50%;

      }
    }
    .selected {
      span{
        /*border: 1PX solid #fff;*/
        background: #12b7f5;
        color: #fff;
      }

    }
    .tdy{
      span{
        /*background-color: #fff;*/
        color: #12b7f5;
        font-weight: bold;
      }
      &.selected span{
        color: #fff;
      }

    }
    .grey {
      opacity: 0.4;
    }

  }

  .slide-loader {
    height: 55px;
    .sl-move {
      height: 100%;
      -webkit-tap-highlight-color:transparent;
    }
  }
</style>
