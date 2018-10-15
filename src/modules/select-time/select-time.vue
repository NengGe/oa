<template>
  <div>
    <VMask v-show="isshow" @click="isshow=false"></VMask>
    <transition name="up">
      <div class="select-time" v-show="isshow">
        <btnCom @cancel="isshow=false" @confirm="onConfirm"></btnCom>
        <div class="lists">
          <List ref="list" :data='item' v-for="(item, i) in listData" :key="i" @selectData='(d) => onSelectData(d, i)'></List>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import VMask from '@/modules/mask/VMask'
import btnCom from './com/btnCom'
import List from './com/list'
import TemplateString from './js/template-string.js'
export default {
  components: {
    btnCom,
    List,
    VMask
  },
  props: {
    data: {
      type: Array,
      default: function () {
        return ['year', 'month', 'day', 'hour', 'minute']
      }
    }
  },
  data () {
    return {
      isshow: false,

      yearIndex: 0,
      monthIndex: 1,
      dayIndex: 2,
      listData: [],

      currYear: '',
      currMonth: '',
      currDay: '',
      currHour: '',
      currMinute: ''
    }
  },
  computed: {
    currMonthdayNum () {
      let d = new Date(this.currYear, this.currMonth, 0)
      return d.getDate()
    }
  },
  created () {
    this.templateString = new TemplateString()
  },
  methods: {
    show ({ confirm, initSiteByValue, initSiteByIndex, initSiteByStr, data, temStr }) {
      this.temStr = temStr // 输出字符格式  ps: 模板字符串
      this.isshow = true
      this.confirm = confirm
      data = data || ['year', 'month', 'day', 'hour', 'minute']
      this.init(data)
      initSiteByValue && this.initSiteByValue(initSiteByValue)
      initSiteByIndex && this.initSiteByIndex(initSiteByIndex)
      initSiteByStr && this.initSiteByStr(initSiteByStr)
    },
    onConfirm () {
      let { templateString, temStr } = this
      let d = this.$refs.list.map((item, i) => {
        let index = item.getCurrIndex()
        return {
          value: this.listData[i].data[index],
          i: index
        }
      })
      temStr && (d.text = templateString.arrToStr(temStr, d.map(item => item.value)))
      this.isshow = this.confirm(d) === false
    },
    initSiteByValue (d) {
      let indexArr = d.map((value, i) => {
        let index = this.listData[i].data.findIndex(item => {
          return Number(value) === Number(item) || String(value) === String(item)
        })
        return index === -1 ? 0 : index
      })
      this.initSiteByIndex(indexArr)
    },
    initSiteByIndex (d) {
      d.forEach((item, i) => {
        this.listData[i].i = item
      })
    },
    initSiteByStr (d) {
      let arr = this.getArrFromTem(d)
      this.initSiteByValue(arr)
    },
    getArrFromTem (str) {
      let { temStr, templateString } = this
      return templateString.strToArr(temStr, str)
    },
    onSelectData (d, i) {
      if (i === this.yearIndex) {
        this.currYear = d.value
        this.listData[this.dayIndex].data = this.getDay()
        this.listData[this.dayIndex].i = 0
      } else if (i === this.monthIndex) {
        this.currMonth = d.value
        this.listData[this.dayIndex].data = this.getDay()
        this.listData[this.dayIndex].i = 0
      }
      this.listData[i].i = d.i
    },
    initDate () {
      let d = new Date()
      this.currYear = d.getFullYear()
      this.currMonth = d.getMonth() + 1
      this.currDay = d.getDate()
      this.currHour = d.getHours()
      this.currMinute = d.getMinutes()
    },
    init (data) {
      this.initDate()
      this.listData = data.map((item, i) => {
        return this.getItmeData(item, i)
      })
      console.log('init', this.listData)
    },
    getItmeData (item, i) {
      let { currMonth, currDay, currHour, currMinute } = this
      let flag = typeof item === 'string'
      let k = flag ? item : Object.keys[0]
      let d = {}
      if (k === 'year') { // 年
        this.yearIndex = i // 年--数据下标
        d = {
          title: item.title ? item.title : '年',
          data: flag ? this.getYear() : item.data,
          i: flag ? 10 : item.i
        }
      } else if (k === 'month') { // 月
        this.monthIndex = i // 月--数据下标
        d = {
          title: item.title ? item.title : '月',
          data: flag ? this.getMonth() : item.data,
          i: flag ? currMonth - 1 : item.i
        }
      } else if (k === 'day') { // 日
        this.dayIndex = i // 日--数据下标
        d = {
          title: item.title ? item.title : '日',
          data: flag ? this.getDay() : item.data,
          i: flag ? currDay - 1 : item.i
        }
      } else if (k === 'hour') { // 时
        d = {
          title: item.title ? item.title : '时',
          data: flag ? this.getHour() : item.data,
          i: flag ? currHour : item.i
        }
      } else if (k === 'minute') { // 分
        d = {
          title: item.title ? item.title : '分',
          data: flag ? this.getMinute() : item.data,
          i: flag ? currMinute : item.i
        }
      } else {
        d = {
          title: item.title ? item.title : '',
          data: flag ? [] : item.data,
          i: flag ? 0 : item.i
        }
      }
      return d
    },
    fillNum (n) {
      return n <= 9 ? '0' + n : n
    },
    getRangeNum (start, end) {
      let a = Math.min(start, end)
      let b = Math.max(start, end)
      let arr = []
      for (let i = a; i <= b; i++) {
        arr.push(this.fillNum(i))
      }
      return arr
    },
    getYear (start, end) {
      if (start === undefined) { // 没初始化 取默认值
        start = new Date().getFullYear() - 10
        end = start + 20
      }
      return this.getRangeNum(start, end)
    },
    getMonth () {
      return this.getRangeNum(1, 12)
    },
    getDay (num) {
      if (num === undefined) {
        num = this.currMonthdayNum
      }
      return this.getRangeNum(1, num)
    },
    getHour () {
      return this.getRangeNum(0, 23)
    },
    getMinute () {
      return this.getRangeNum(0, 59)
    },
    getListData () {
      this.listData = []
      let n = 20
      for (let i = 0; i < n; i++) {
        this.listData.push(i)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.select-time {
  background: #eee;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
}
.lists {
  display: flex;
}
.up-enter-active,
.up-leave-active {
  transition: 0.2s;
  transition-property: transform;
}
.up-enter,
.up-leave-to {
  transform: translate3d(0, 99%, 0);
}
</style>
