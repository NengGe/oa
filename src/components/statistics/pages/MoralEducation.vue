<template>
  <div class="moral-education">
    <!-- 头部 -->
    <div class="head-box">
      <div class="select-time-btn">
        <span class="iconfont-statistics icon-left" @click="()=>addSubAction(-1)">&#xe648;</span>
        <span class="dateText" @click="()=>{SlideSelectDateShow=1}">{{dateSel}}</span>
        <span class="iconfont-statistics icon-right" @click="()=>addSubAction(1)">&#xe648;</span>
      </div>
    </div>
    <!-- 结果 -->
    <div class="title-box">
      <!-- 选择年级 && 班级 -->
      <div class="selectClass-box" @click="bottomOptionsShowA = true" :class="{active:gradeClass}">
        <div class="l">{{gradeClass||'请选择年级班级'}}</div>
        <div class="r iconfont-statistics">&#xe648;</div>
      </div>
      <div class="row row1" v-show="weekContent!==`未获得称号`">
        <div class="l">上周周评比：</div>
        <div :class="['r', isGetWeekHonor?'blue':'orange']">{{weekContent}}</div>
      </div>
      <div class="row row2" v-show="monthContent!==`未获得称号`">
        <div class="l">上月月评比：</div>
        <div :class="['r', isGetMonthHonor?'blue':'orange']">{{monthContent}}</div>
      </div>
    </div>
    <!-- 明细 -->
    <div class="detail-box">
      <div class="item-box" v-for="(item, i) in detailList" :key="'detailList'+i">
        <div class="item-head">
          <div class="dot"></div>
          <div class="time">{{item.time}}</div>
          <div class="name">{{item.name}}</div>
        </div>
        <div class="item-content">
          <div class="l">{{item.type}}</div>
          <div class="r" :class="[parseInt(item.grade)>0?'green':'red']">{{item.grade}}</div>
        </div>
      </div>
      <!-- 背景图片 -->
      <oa-bg-nodata v-show="showBg"></oa-bg-nodata>
    </div>
    <!-- 选择日期 -->
    <SlideSelectDate @curPageConfirm='onSelectDateConfirm' :show.sync="SlideSelectDateShow" :value.sync="dateSel"></SlideSelectDate>
    <!-- 选择班级 -->
    <BottomOptions :show.sync="bottomOptionsShowA">
      <ul>
        <li @click="classListAction(item)" v-for="(item, index) in classList" :key="index">{{`${item.gradeName}${item.className}`}}</li>
      </ul>
    </BottomOptions>
  </div>
</template>

<script>
import SlideSelectDate from '@/modules/slide-select/date/SlideSelectDate.vue'
import BottomOptions from '@/modules/bottom-options/BottomOptions'
export default {
  data () {
    return {
      showBg: false,
      isGetWeekHonor: false,
      isGetMonthHonor: false,
      bottomOptionsShowA: false,
      classId: '',
      classList: [], // 班级列表
      gradeClass: '',
      SlideSelectDateShow: 0,
      dateSel: this.getNowDate(),
      weekContent: '',
      monthContent: '',
      detailList: []
    }
  },
  watch: {
    dateSel: function () {
      this.weekContent = ''
      this.monthContent = ''
      if (this.gradeClass) {
        this.getPageAllData()
      }
    }
  },
  created () {
    this.getCurrUserInfo().then((userInfo) => {
      this.getTeacherClasses(userInfo.user_id).then(classList => {
        this.classList = classList
        if (this.classList[0]) this.classListAction(this.classList[0])
      })
    })
  },
  components: {
    SlideSelectDate,
    BottomOptions
  },
  methods: {
    getPageAllData () {
      this.showBg = false
      this.getBeautifulStars(this.classId, this.dateSel)
      this.getDreamHorse(this.classId, this.dateSel)
      this.getClassStudentPerformance(this.classId, this.dateSel)
    },
    classListAction (item) {
      // console.log(item)
      this.gradeClass = `${item.gradeName}${item.className}`
      this.classId = item.classId
      this.bottomOptionsShowA = false
      this.getPageAllData()
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
    numfill (number) {
      if (number < 10) {
        return '0' + number
      }
      return number
    },
    // 初始化日期
    getNowDate () {
      let d = new Date()
      return `${d.getFullYear()}-${this.numfill(d.getMonth() + 1)}-${this.numfill(d.getDate())}`
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
    getCurrUserInfo () {
      return this.$axios.get(`/schoolorg/v1/getCurrUserInfo`).then(({data}) => {
        // console.log('data', data)
        if (data.status === 200) {
          // console.log('if-data-userInfo', data)
          let userInfo = data.result.data
          // console.log('userInfo.campus_id', userInfo.campus_id)
          return userInfo
        } else {

        }
      })
    },
    getTeacherClasses (userId) {
      return this.$axios.get(`/classcard/v1/teacherClasses?teacher_user_id=${userId}`).then(({data}) => {
        if (data.status === 200) {
          // console.log('if-data-class', data)
          let classList = data.result.data
          classList = classList.map(item => {
            item = item.class
            return {
              classId: item.id,
              className: item.alias,
              gradeId: item.grade_id,
              gradeName: item.grade_name
            }
          })
          return classList
        } else {

        }
      })
    },
    // 获取周荣誉信息
    getBeautifulStars (classId, date) {
      // classId = '4643693813825139198'
      // date = '2018-03-10'
      return this.$axios.get(`/classcard/v1/getBeautifulStars/${classId}?query_date=${date}`).then(({data}) => {
        // console.log('data', data)
        if (data.status === 200) {
          console.log('if-周', data)
          if (data.result.data.length === 0) {
            this.weekContent = `未获得称号`
            return
          }
          let weekIndo = data.result.data[0]
          this.isGetWeekHonor = weekIndo.light === 'true'
          console.log('isGetWeekHonor', this.isGetWeekHonor)
          if (this.isGetWeekHonor) {
            this.weekContent = weekIndo.name + (weekIndo.hornor_name ? `(${weekIndo.hornor_name})` : '')
          } else {
            this.weekContent = `未获得${weekIndo.name}称号`
          }
        } else {
          this.$simpleMsg('获取周评比失败')
        }
      })
    },
    // 获取月荣誉信息
    getDreamHorse (classId, date) {
      // classId = '4643693813825139198'
      // date = '2018-03-10'
      return this.$axios.get(`/classcard/v1/getDreamHorse/${classId}?query_date=${date}`).then(({data}) => {
        // console.log('data', data)
        if (data.status === 200) {
          console.log('if-月', data)
          if (data.result.data.length === 0) {
            this.monthContent = `未获得称号`
            return
          }
          let monthIndo = data.result.data[0]
          this.isGetMonthHonor = monthIndo.light === 'true'
          if (this.isGetMonthHonor) {
            this.monthContent = monthIndo.name + (monthIndo.hornor_name ? `(${monthIndo.hornor_name})` : '')
          } else {
            this.monthContent = `未获得${monthIndo.name}称号`
          }
        } else {
          this.$simpleMsg('获取月评比失败')
        }
      })
    },
    // 获取--班级学生表现
    getClassStudentPerformance (classId, date) {
      // classId = '5481932890223201324'
      // date = '2016-12-16'
      return this.$axios.get(`/oa/v1/getClassStudentPerformance?class_id=${classId}&query_date=${date}`).then(({data}) => {
        // console.log('data', data)
        if (data.status === 200) {
          console.log('if-班级学生表现', data)
          let list = data.result.data
          list = list.map(item => {
            let timeArr = item.event_date.split('+')[0].split('T')
            let timeStr = timeArr[0] + '  ' + timeArr[1]
            return {
              time: timeStr,
              name: item.user_name,
              type: `${item.rule_name}/${item.rule_item_name}`,
              grade: parseInt(item.score) > 0 ? `+${item.score}` : item.score
            }
          })
          this.detailList = list
          this.showBg = list.length === 0
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.moral-education{
  .head-box{
    width: 100%;
    height: 48px;
    background-color: #fff;
    transform: translate(0,0);
    text-align: center;
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

  .title-box{
    // min-height: 118px;
    font-size: 15px;
    background-color: #fff;
    padding: 0 22px 15px;
    .selectClass-box{
      // height: 30px;
      line-height: 34px;
      color: #ccc;
      display: flex;
      font-size: 15px;
      border-bottom: 1PX solid #ddd;
      &.active{
        color: #666;
      }
      .l{
        flex:1
      }
      .r{

      }
    }
    .row{
      line-height: 34px;
      display: flex;
      .l{
        color: #666;
      }
      .r{
        padding-left: 10px;
        &.blue{
          color: #1d89e4;
        }
        &.orange{
          color: #fda869;
        }
      }
    }
  }
  .detail-box{
    position: relative;
    min-height: 400px;
    margin-top: 15px;
    padding: 16px 15px;
    background-color: #fff;
    .item-box{
      font-size: 15px;
      padding-left: 16px;
      padding-bottom: 28px;
      border-left: 1PX solid rgba(207, 207, 207, 0.45);
      .item-head{
        line-height: 42px;
        display: flex;
        position: relative;
        .dot{
          position: absolute;
          left: -20px;
          top: 50%;
          transform: translateY(-50%);
          width: 7px;
          height: 7px;
          background-color: #1d89e4;
          border-radius: 50%;
        }
        .time{
          color: #333;
          font-weight: bold;
          flex: 1;
        }
        .name{
          padding-right: 10px;
          color: #999;
          font-size: 13px;
          // width: 57px;
          // text-align: center;
        }
      }
      .item-content{
        line-height: 30px;
        display: flex;
        // height: 50px;
        border-radius: 5px;
        border: solid 1PX #999;
        .l{
          padding: 10px 10px;
          flex: 1;
          color: #bbb;
          // padding-left: 10px;
        }
        .r{
          width: 57px;
          // text-align: center;
          border-left: solid 1PX #999;
          display: flex;
          justify-content: center;
          align-items: center;
          &.red{
            color: red;
          }
          &.green{
            color: #21ae00
          }
        }
      }
    }
  }
}
</style>
