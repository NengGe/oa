<template>
  <div class="select-time">
    <btnCom @cancel="1" @confirm="onConfirm"></btnCom>
    <div class="lists">
      <List ref="list" :data='item' v-for="(item, i) in listData" :key="i" @selectData='(d) => onSelectData(d, i)'></List>
    </div>
  </div>
</template>

<script>
import btnCom from './com/btnCom'
import List from './com/list'
export default {
  props: {
    data: {
      type: Array,
      default: function () {
        return ['year', 'month', 'day', 'hour', 'minute']
      }
    }
  },
  components: {
    btnCom,
    List
  },
  data () {
    return {
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
    this.initDate()
    this.init()
  },
  methods: {
    onConfirm () {
      let d = this.$refs.list.map((item, i) => {
        let index = item.getCurrIndex()
        return {
          value: this.listData[i].data[index],
          i: index
        }
      })
      console.log(d)
    },
    onSelectData (d, i) {
      if (i === this.yearIndex) {
        this.currYear = d.value
        this.listData[this.dayIndex].data = this.getDay()
      } else if (i === this.monthIndex) {
        this.currMonth = d.value
        this.listData[this.dayIndex].data = this.getDay()
      }
      // console.log('**************')
      // console.log(d, i)
    },
    initDate () {
      let d = new Date()
      this.currYear = d.getFullYear()
      this.currMonth = d.getMonth() + 1
      this.currDay = d.getDate()
      this.currHour = d.getHours()
      this.currMinute = d.getMinutes()
      // console.log('fen', this.currMinute)
    },
    init () {
      this.listData = this.data.map((item, i) => {
        return this.getItmeData(item, i)
      })
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
}
.lists {
  display: flex;
}
</style>
