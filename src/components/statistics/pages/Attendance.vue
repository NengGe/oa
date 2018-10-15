<template>
  <div class="statistics-day">
    <div class="tjbg"></div>
    <div class="head-box">
      <div class="routerBtn-box">
        <router-link :to="{name:'attendanceMonth'}" replace>
          <div class="iconfont-statistics icon">&#xe612;</div>
        </router-link>
      </div>
      <div class="select-time-btn">
        <span class="iconfont-statistics icon-left" @click="()=>addSubAction(-1)">&#xe648;</span>
        <span class="dateText" @click="()=>{SlideSelectDateShow=1}">{{dateSel}}</span>
        <span class="iconfont-statistics icon-right" @click="()=>addSubAction(1)">&#xe648;</span>
      </div>
    </div>
    <!-- 总览 -->
    <div class="chuqin">
      <div class="canvas-box">
        <canvas ref="eEircular"></canvas>
      </div>
      <div class="chuqinType-box">
        <ul class="row row1">
          <li v-for="(item,i) in typeArr[0]" :key="'typeArr0'+i" :class="item.className" @click="()=>chuqinTypeAction(item.text)">
            <span class="num">{{item.num}}</span>
            <span class="text">{{item.text}}</span>
          </li>
        </ul>
        <ul class="row row2">
          <li v-for="(item,i) in typeArr[1]" :key="'typeArr1'+i" :class="item.className" @click="()=>chuqinTypeAction(item.text)">
            <span class="num">{{item.num}}</span>
            <span class="text">{{item.text}}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 明细 -->
    <div class="detail-box">
      <div class="item-box" v-for="(item,index) in DataArr" :key="'detail'+index">
        <div class="item-head" @click="()=>showAllAction(item)">
          <span class="titleText">{{item.title}}</span>
          <span class="iconfont-statistics icon" :class="{active:item.isSpread}">&#xe648;</span>
        </div>
        <div class="row" v-for="(personInfo,i) in item.personArr" :key="'personArr'+i" v-show="item.isSpread || i+1<=0">
          <div class="img-box"></div>
          <div class="personNameText">{{personInfo.user_name}}</div>
          <div class="descText" :class="item.className">{{personInfo.desc}}</div>
          <!-- <div class="timeText">{{personInfo.time}}</div> -->
        </div>
      </div>
    </div>
    <SlideSelectDate @curPageConfirm='onSelectDateConfirm' :show.sync="SlideSelectDateShow" :value.sync="dateSel"></SlideSelectDate>
  </div>
</template>

<script>
import circular from './Attendance/circular'
import SlideSelectDate from '@/modules/slide-select/date/SlideSelectDate.vue'
export default {
  data () {
    return {
      countAttend: '',
      countAll: 0,
      SlideSelectDateShow: 0,
      dateSel: this.getNowDate(),
      DataArr: [
        {
          title: '缺卡',
          isSpread: false,
          className: '',
          personArr: [
            // {
            //   user_id: '',
            //   user_name: '张三',
            //   desc: '迟到5分钟',
            //   time: '09:00'
            // }
          ]
        },
        {
          title: '迟到',
          isSpread: false,
          className: 'color-orange',
          personArr: []
        },
        {
          title: '早退',
          isSpread: false,
          className: 'color-red',
          personArr: []
        },
        {
          title: '异常',
          isSpread: false,
          className: 'color-red',
          personArr: []
        },
        {
          title: '请假',
          isSpread: false,
          className: 'color-blue',
          personArr: []
        },
        {
          title: '外出',
          isSpread: false,
          className: 'color-blue',
          personArr: []
        }
      ],
      typeArr: [
        [
          { text: '迟到', num: '', className: 'color-orange' },
          { text: '早退', num: '', className: 'color-orange' },
          { text: '缺卡', num: '', className: 'color-red' }
        ],
        [
          { text: '异常', num: '', className: '' },
          { text: '请假', num: '', className: '' },
          { text: '外出', num: '', className: '' }
        ]
      ]
    }
  },
  watch: {
    'dateSel': function () {
      this.initData()
      this.DataArr.map(item => {
        item.isSpread = false
      })
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    circular({
      canvas: this.$refs.eEircular,
      num: this.countAttend,
      total: this.countAll
    })
  },
  methods: {
    numfill (number) {
      if (number < 10) {
        return '0' + number
      }
      return number
    },
    // 初始化页面
    initData () {
      this.getData(this.dateSel).then(() => {
        // console.log('初始化画布', this.countAttend, this.countAll)
        // 初始化画布
        circular({
          canvas: this.$refs.eEircular,
          num: this.countAttend,
          total: this.countAll
        })
      })
    },
    onSelectDateConfirm (dateStr) {
      let d = new Date(dateStr.replace(/-/g, '/'))
      let t = new Date()
      if (d.getTime() > t.getTime()) {
        this.dateSel = this.getNowDate()
        this.SlideSelectDateShow = true
        this.$simpleMsg('请选择有效日期')
      }
    },
    chuqinTypeAction (title) {
      console.log(title)
      this.DataArr.forEach((item) => {
        if (item.title.indexOf(title) !== -1) {
          item.isSpread = !item.isSpread
        } else {
          item.isSpread = false
        }
      })
    },
    // 日期 号加减1
    addSubAction (num) {
      let str = this.dateSel.replace(/-/g, '/')
      let d = new Date(str)
      let isToday = d.setHours(0, 0, 0, 0) === (new Date()).setHours(0, 0, 0, 0)
      if (num === 1 && isToday) {
        this.$simpleMsg('已是最新日期')
        return
      }
      d.setDate(d.getDate() + num)
      this.dateSel = `${d.getFullYear()}-${this.numfill(d.getMonth() + 1)}-${this.numfill(d.getDate())}`
    },
    // 列表展开
    showAllAction (item) {
      item.isSpread = !item.isSpread
    },
    // 初始化日期
    getNowDate () {
      let d = new Date()
      return `${d.getFullYear()}-${this.numfill(d.getMonth() + 1)}-${this.numfill(d.getDate())}`
    },
    // 请求页面数据
    getData (dateStr) {
      return this.$axios.get(`/mobicampus/attend/v1/getDailyStatsMobi?date=${dateStr}`).then(({ data }) => {
        // console.log('日统计', data)
        if (data.status === 200) {
          console.log('IF日统计', data)
          let resData = data.result.data || {}
          let statsCounts = resData.stats_counts || {}
          let statsCategoryList = resData.stats_category_list || []
          //  总览
          this.countAttend = statsCounts.attended_count || 0
          this.countAll = statsCounts.all_attendees || 0
          this.typeArr[0][0].num = statsCounts.late_count || 0
          this.typeArr[0][1].num = statsCounts.leave_early_count || 0
          this.typeArr[0][2].num = statsCounts.not_clocked_count || 0
          this.typeArr[1][0].num = statsCounts.abnormal_count || 0
          this.typeArr[1][1].num = statsCounts.leave_count || 0
          this.typeArr[1][2].num = statsCounts.biztrip_count || 0
          //  明细
          statsCategoryList.forEach((item, i) => {
            this.DataArr[i].title = item.title
            this.DataArr[i].personArr = item.item
          })
        } else {
          // this.msgSimple(data.message)
        }
      }).catch((err) => { console.log(err) })
    }
  },
  components: {
    SlideSelectDate
  }
}
</script>

<style scoped lang="scss">
// $fontSize:100;
// @function r($px) {
//   @return $px/2/$fontSize+rem;
// }

// @mixin setPm($name, $val...) {
//   // ...是固定写法,若干个的意思
//   $max: length($val); //3
//   $str: "";
//   // 从1开始到 length3结束
//   @for $i from 1 through $max {
//     // 第一次循环
//     $value: nth($val, $i)/2/$fontSize;
//     $str:#{$str+$value}rem;
//     @if $i < $max {
//       $str:#{$str+" "};
//     }
//   }
//   #{$name}:$str;
// }

.tjbg {
  z-index: -1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}
.statistics-day {
  padding-bottom: 10px;
  .head-box {
    width: 100%;
    height: 48px;
    background-color: #fff;
    position: relative;
    transform: translate(0, 0);
    text-align: center;
    .routerBtn-box {
      position: absolute;
      right: 0px;
      top: 0;
      line-height: 48px;
      .icon {
        line-height: 48px;
        padding: 0 8px 0 18px;
        font-size: 23px;
        color: #f8ab59;
      }
    }
    .select-time-btn {
      line-height: 47px;
      font-size: 15px;
      color: #58aeff;
      .dateText {
        padding: 0 12px;
        display: inline-block;
      }
      .iconfont-statistics {
        display: inline-block;
        padding: 0 12px;
      }
      .icon-left {
        transform: rotate(90deg);
      }
      .icon-right {
        transform: rotate(-90deg);
      }
    }
  }

  .chuqin {
    box-shadow: 0 3px 5px #e8edf3;
    padding: 30px 0;
    background-color: #fff;
    width: 100%;
    display: flex;
    .canvas-box {
      width: 100px;
      height: 100px;
      // float: left;
      margin: 0 50px 0 30px;
      canvas {
        width: 100%;
      }
    }
    .chuqinType-box {
      flex: 1;
      .row {
        height: 50px;
        display: flex;
        li {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          span {
            line-height: 20px;
            &.num {
              font-weight: bold;
              font-size: 17px;
            }
          }
        }
      }
    }
  }
  .detail-box {
    color: #666;
    .item-box {
      box-sizing: border-box;
      background-color: #fff;
      width: 100%;
      margin-top: 15px;
      box-shadow: 0 3px 5px #e8edf3;
      .item-head {
        padding: 0 10px;
        border-bottom: 1PX solid #ededed;
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        .titleText {
          padding-left: 6px;
          font-size: 17px;
          font-weight: bold;
        }
        .icon {
          color: #999;
          display: block;
          transition: transform 0.3s;
          &.active {
            transform: rotate(180deg);
          }
        }
      }
      .row {
        display: flex;
        box-sizing: border-box;
        margin: 0 10px;
        border-bottom: 1PX solid #ededed;
        padding: 12px 0px;
        line-height: 25px;
        &:last-child {
          border-bottom: 0;
        }
        .img-box {
          float: left;
          background-color: #ccc;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          margin: 0 11px 0 8px;
          background-image: url("@/assets/imgs/ava3.png");
          background-size: 100%;
        }
        .personNameText {
          padding-right: 30px;
          //  float: left;
          line-height: 25px;
          font-size: 14px;
        }
        .descText {
          flex: 1;
          text-align: right;
          padding: 0 9px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .timeText {
          //  float: right;
          line-height: 25px;
        }
      }
      .row.active {
        display: none;
      }
    }
  }
}
.color-orange {
  color: #f8ab59;
}
.color-red {
  color: #ed5564;
}
.color-blue {
  color: #58aeff;
}

.icon-sanjiao:before {
  content: "\e728";
}

.icon-canvas-box:before {
  content: "\e604";
}

.icon-calendar:before {
  content: "\e608";
}

.icon-caigou:before {
  content: "\e502";
}

.icon-baoxiu:before {
  content: "\e63e";
}

.icon-tiaoketongzhi:before {
  content: "\e51b";
}

.icon-tiaohuansu:before {
  content: "\e616";
}

.icon-guiji:before {
  content: "\e602";
}
</style>
