<template>
  <div id="confer-main" class="main">
    <!--<button id="time-selected-as" style="display:none"></button>-->
    <!--<button id="time-selected" style="display:none"></button>-->
    <div class="main" id="contant-main">
      <div class="calendar-box" ref="calendarBox">
        <Calendar :calendarData="calendarData" @select="onDateSelect" @loadWeekDate="loadCalendarData" @dayDataListChange="dayDataListChange" @timeSelectShow="v=>{calendarTimeSelectShow=v}"></Calendar>
      </div>
      <div class="confer_main cf">
        <h4 ref="mainerH4">今日会议安排</h4>
        <div class="add-confer">
          <router-link :to="{name:'ConferenceCreate'}">
            <span class="iconfont icon">&#xe61a;</span>新建</router-link>
        </div>
        <div :class="[calendarTimeSelectShow?'time-se-true':'time-se-false']">
          <ul @click="listAction">
            <li v-for="(item,i) in list" :key="item.id" :class="[item.curr_user_is_creator==='true'?'confe-a':'confe-b']" :data-index="i">
              <div class="main-info">
                <div class="title">
                  <h5>{{item.title}}</h5>
                  <div class="clock">
                    <a v-if="item.curr_user_is_charger==='true'||item.curr_user_is_creator==='true'" class="iconfont icon-erweima" :data-id="item.id" data-url=""></a>
                    <i class="iconfont icon-clock active" :data-id="item.id"></i>
                  </div>
                </div>
                <p class="addr">地址：{{item.addr}}</p>
                <p class="time">时间：{{timeFormat(item.start_time)}}-{{timeFormat(item.end_time)}}</p>

              </div>
            </li>
          </ul>
        </div>
        <div v-if="nothing" :class="[calendarTimeSelectShow?'confer-non time-se-true':'confer-non time-se-false']"></div>
      </div>
    </div>
    <SlideSelectTimeEdit :value.sync="slideSelectTimeEditValue" :show.sync="slideSelectTimeEditShow" @confirm="slideSelectTimeEdit"></SlideSelectTimeEdit>
  </div>
</template>

<script>
// import Calendar from '@/modules/calendar/Main.vue'
import '@/assets/css/conference.css'
import Calendar from '@/modules/calendar2/calendar.vue'
import scopeElements from '@/modules/corejs/dom/scope-elements'
import SlideSelectTimeEdit from '@/modules/slide-select/date/SlideSelectTimeEdit.vue'
// import getServerGo from '@/modules/ajax-mid/get-server-go'
// import QRCode from '@/modules/qr.js'

export default {
  data () {
    return {
      calendarData: [],
      list: [],
      nothing: false,
      showPopup: 0,
      qrCodeData: '',
      calendarTimeSelectShow: 0,

      slideSelectTimeEditElem: null,
      slideSelectTimeEditValue: 0,
      slideSelectTimeEditShow: 0
    }
  },
  methods: {
    listAction (e) {
      scopeElements(e.target, elem => {
        let { tagName, classList } = elem
        if (tagName === 'UL') return false
        if (tagName === 'LI') {
          this.$router.push({
            name: 'ConferenceDetail',
            params: {
              id: this.list[elem.dataset.index].id
            }
          })
          return false
        }
        if (classList.contains('icon-erweima')) {
          // this.$popup({content: `<img style="display:block" src="${QRCode.generatePNG(location.origin + elem.dataset.url, {ecclevel: 'H', margin: 1})}"/>`})
          this.$axios.get('/mobicampus/meeting/v1/getSignMeetingQRCodeBase64/' + elem.dataset.id).then(({ data }) => {
            if (data.status === 200) {
              this.$popup({
                // content: `<img style="display:block" src="${}"/>`,
                created () {
                  let img = new Image()
                  img.src = data.result.data
                  img.style.display = 'block'
                  this.elemCont.children[0].appendChild(img)
                }
              })
            } else {
              this.$simpleMsg('获取二维码失效')
            }
          })
          return false
        }
        if (classList.contains('icon-clock')) {
          this.slideSelectTimeEditValue = elem.dataset.val || 0
          this.slideSelectTimeEditShow = 1
          this.slideSelectTimeEditElem = elem
          return false
        }
      })
    },
    slideSelectTimeEdit (time) {
      let elem = this.slideSelectTimeEditElem
      this.slideSelectTimeEditValue = elem.dataset.val = time
      this.$axios.post('/mobicampus/meeting/v1/changeMeetingAdvanceTime', {
        meet_id: elem.dataset.id,
        advance_time: time
      }).then(({ data }) => {
        if (data.status === 200 && data.result.data) {
          this.$simpleMsg(time ? `会前${time}分钟提醒` : '不提醒')
        } else {
          this.$simpleMsg('提前时间修改失败')
        }
      })
    },
    loadCalendarData (weekData, cb) {
      console.log('weekData', weekData)
      this.$axios.post('/mobicampus/meeting/v1/getMeetingList', {
        // 'meet_id': 0, // 会议id
        // 'date_time': '', // 会议日期
        'start_time_ymd': weekData.startDate, // 会议创建时间开始
        'end_time_ymd': weekData.endDate, // 会议创建时间结束
        // 'meet_title': 'test', // 会议标题
        'begin': 0, // 列表开始
        'size': 100 // 列表大小
      }).then(({ data }) => {
        if (data.status === 200) {
          console.log('getMeetingList', data)
          cb(data.result.data)
        } else {
          this.$simpleMsg(data.message)
        }
      })
    },
    onDateSelect (d) {
      this.list = []
      if (d.calendarIndex) {
        this.nothing = false
        d.calendarIndex.forEach(i => {
          this.list.push(this.calendarData[i])
        })
      } else {
        this.nothing = true
      }
    },
    // 2017-01-01 11:11 -> 11:11
    timeFormat (time) {
      return time.match(/\d\d:\d\d/)[0]
    },
    dayDataListChange (list) {
      this.list = list
      if (list.length) {
        this.nothing = false
      } else {
        this.nothing = true
      }
    }
  },
  components: {
    Calendar,
    SlideSelectTimeEdit
  }
}
</script>
<style scoped lang="scss">
.add-confer {
  float: right;
  width: 78px;
  height: 28px;
  background: #12b7f5;
  border-radius: 19px;
  margin-top: 15px;
  a {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: block;
    line-height: 28px;
    font-size: 16px;
    text-align: center;
    color: #fff;
    .icon {
      margin-right: 5px;
    }
  }
}
.confer_main {
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
  h4 {
    font-size: 14px;
    color: #aaa;
    line-height: 58px;
    margin: 0;
    font-weight: normal;
    float: left;
  }
  .time-se-true {
    width: 100%;
    top: 430px;
    left: 0;
    bottom: 21px;
    position: fixed;
    padding-top: 2px;
    // padding-bottom: 6px;
    overflow-y: scroll;
    background-size: 65%;
    transition: top 0.3s ease;
    -webkit-transition: top 0.3s ease;
  }
  .time-se-false {
    width: 100%;
    top: 250px;
    left: 0;
    bottom: 0px;
    position: fixed;
    padding-top: 2px;
    // padding-bottom: 6px;
    overflow-y: scroll;
    background-size: 65%;
    transition: top 0.3s ease;
    -webkit-transition: top 0.3s ease;
  }
  ul {
    max-width: 750px;
    padding: 0 20px;
    background-color: #fff;
    li {
      box-sizing: border-box;
      overflow: hidden;
      padding: 20px 0;
      border-bottom: 1PX #eee solid;
      &:last-child {
        border-bottom: 0;
      }
      // &.confe-a {
      //   border-left: 6px solid #ff9797;
      // }
      // &.confe-b {
      //   border-left: 6px solid #40d384;
      // }
      .main-info {
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 6px;
        .title {
          display: flex;
          h5 {
            font-size: 15px;
            color: #333;
            line-height: 32px;
            margin: 0;
            flex: 1;
            word-break: break-all;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .clock {
            width: 91px;
            box-sizing: border-box;
            a {
              font-size: 24px;
              color: #69a1d6;
              padding: 0 10px;
            }
            i {
              height: 30px;
              font-size: 22px;
              color: #aaa;
              text-align: center;
              padding: 0 10px;
              &.active {
                color: #ffc556;
              }
            }
          }
        }

        p {
          font-size: 14px;
          color: #999;
          margin: 0;
          line-height: 1.8;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
  .confer-non {
    background: url(../../assets/imgs/confe-bga03.jpg) center no-repeat;
    background-size: 65%;
  }
}
</style>

