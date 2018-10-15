<template>
  <div class="statistics-month">
    <div class="tjbg"></div>
    <div class="head-box">
      <div class="routerBtn-box">
        <router-link :to="{name:'attendance'}" replace>
          <div class="iconfont-statistics icon">&#xe613;</div>
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
          <li v-for="(item,i) in typeArr" :key="'typeArr0'+i"  :class="item.className">
            <span class="num">{{item.num}}</span>
            <span class="text">{{item.text}}</span>
          </li>
        </ul>
        <!-- <ul class="row row2">
          <li v-for="(item,i) in typeArr[1]" :key="'typeArr1'+i"  :class="item.className">
            <span class="num">{{item.num}}</span>
            <span class="text">{{item.text}}</span>
          </li>
        </ul> -->
      </div>
    </div>
    <!-- 明细 -->
    <div class="detail-box">
      <div class="detail-head">
        <div class="left">姓名</div>
        <div class="right cf">
          <span class="type">迟到</span>
          <span class="slash">/</span>
          <span class="type">早退</span>
          <span class="slash">/</span>
          <span class="type">缺勤</span>
        </div>
      </div>
      <div class="row" v-for="(item, i) in DataArr" :key="'month'+i">
        <div class="img-box"></div>
        <span class="personName">{{item.user_name}}</span>
        <span class="chidaoNum">{{item.late_count}}</span>
        <span class="zaotuiNum">{{item.leave_early_count }}</span>
        <span class="queqinNum">{{item.not_attended_count }}</span>
      </div>
    </div>
    <SlideSelectDate @curPageConfirm='onSelectDateConfirm' :show.sync="SlideSelectDateShow" :value.sync="dateSel"></SlideSelectDate>
  </div>
</template>

<script>
  import circular from './Attendance/circular'
  import SlideSelectDate from '@/modules/slide-select/date/SlideSelectYeadAndMonth.vue'
  function numfill (number) {
    if (number < 10) {
      return '0' + number
    }
    return number
  }
  function getNowDate () {
    let d = new Date()
    return `${d.getFullYear()}-${numfill(d.getMonth() + 1)}`
  }

  export default {
    data () {
      return {
        countAttend: 0,
        countAll: 0,
        SlideSelectDateShow: 0,
        dateSel: getNowDate(),
        DataArr: [],
        typeArr: [
          {text: '迟到', num: 0, className: 'color-orange'},
          {text: '早退', num: 0, className: 'color-orange'},
          {text: '缺勤', num: 0, className: 'color-red'}
        ]
      }
    },
    computed: {
      // dateObj: function () {
      //   let str = this.dateSel + '/01'
      //   str = str.replace(/-/g, '/')
      //   return new Date(str)
      // }
    },
    watch: {
      'dateSel': function () {
        this.initData()
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
        dateStr = dateStr + '/01'
        let d = new Date(dateStr.replace(/-/g, '/'))
        let t = new Date()
        if (d.getTime() > t.getTime()) {
          this.dateSel = this.getNowDate()
          this.SlideSelectDateShow = true
          this.$simpleMsg('请选择有效日期')
        }
      },
      // 日期 月份加减1
      addSubAction (num) {
        let str = this.dateSel + '/01'
        str = str.replace(/-/g, '/')
        let d = new Date(str)
        let t = new Date()
        let isMonth = d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth()
        if (num === 1 && isMonth) {
          this.$simpleMsg('已是最新月份')
          return
        }
        d.setMonth(d.getMonth() + num)
        this.dateSel = `${d.getFullYear()}-${numfill(d.getMonth() + 1)}`
      },
      getNowDate () {
        let d = new Date()
        return `${d.getFullYear()}-${numfill(d.getMonth() + 1)}`
      },
      // 请求页面数据
      getData (dateStr) {
        // console.log('开始请求数据', this.dateSel)
        return this.$axios.get(`/mobicampus/attend/v1/getMonthlyStatsMobi?month=${dateStr}`).then(({data}) => {
          if (data.status === 200) {
            console.log(data.result.data)
            let {counts, item_list: itemList} = data.result.data
            this.countAttend = counts.showup_all_count || 0
            this.countAll = counts.all_attendees || 0
            this.typeArr[0].num = counts.late_count || 0
            this.typeArr[1].num = counts.leave_early_count || 0
            this.typeArr[2].num = counts.not_attended_count || 0
            // 明细
            this.DataArr = itemList || []
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

  .tjbg{
    z-index: -1;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .statistics-month{
    padding-bottom: 10px;
    .head-box{
      width: 100%;
      height: 48px;
      background-color: #fff;
      position: relative;
      transform: translate(0,0);
      text-align: center;
      .routerBtn-box{
        position: absolute;
        right: 0px;
        top: 0;
        line-height: 48px;
        .icon{
          padding: 0 10px 0 20px;
          font-size: 23px;
          color: #f8ab59;
        }
      }
      .select-time-btn{
        line-height: 47px;
        font-size: 15px;
        color: #58aeff;
        .dateText{
          padding: 0 12px;
          display: inline-block;
        }
        .iconfont-statistics{
          display: inline-block;
          padding: 0 12px;
        }
        .icon-left{
          transform: rotate(90deg)
        }
        .icon-right{
          transform: rotate(-90deg)
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
      .chuqinType-box{
        display: flex;
        align-items: center;
        flex: 1;
        .row{
          width: 100%;
          height: 50px;
          display: flex;
          li{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            span{
              line-height: 20px;
              &.num{
                font-weight: bold;
                font-size: 17px;
              }
            }
          }
        }
      }
    }

    .detail-box{
      box-shadow: 0 3px 5px #e8edf3;
      margin-top: 15px;
      color: #666;
      background-color: #fff;
      .detail-head{
        border-bottom: 1PX solid #ededed;
        padding: 0 10px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        .left{
          font-size: 17px;
        }
        .right{
          font-size: 13px;
          span{
            float: left;
          }
          span.type{
            width: 32px;
            text-align: center;
          }
          span.slash{
            width: 16px;
            text-align: center;
          }
        }
      }
      .row{
        &:last-child{
          border-bottom: none;
        }
        border-bottom: 1PX solid #ededed;
        display: flex;
        margin: 0 10px;
        box-sizing: border-box;
        padding: 12px 0px;
        line-height: 25px;
        .img-box{
          margin: 0 11px 0 8px;
          width: 25px;
            height: 25px;
          background-image:url('@/assets/imgs/ava3.png');
        background-size: 100%;
          // img{
          //   display: block;
          //   width: 25px;
          //   height: 25px;
          //   border-radius: 50%;
          // }
        }
        .personName{
          flex: 1;
          font-size: 14px;
        }
        .chidaoNum{
          width: 32px;
          text-align: center;
          color: #f8ab59;
        }
        .zaotuiNum{
          width: 64px;
          text-align: center;
          color: #f8ab59;
        }
        .queqinNum{
          width: 32px;
          text-align: center;
          color: #ed5564;
        }
      }
    }
  }
  .color-orange{
    color: #f8ab59;
  }
  .color-red{
    color: #ed5564;
  }
  .color-blue{
    color: #58aeff;
  }


</style>
