<template>
  <div class="select-class" :class="{position:$attrs.hasOwnProperty('position')}">
    <VMask v-show="isShow" @click="isShow=!isShow"></VMask>
    <div class="head" @click='isShow=!isShow'>
      <span class="text">{{dataStr||'请选择'}}</span>
      <i class="iconfont">&#xe6ac;</i>
      <div class="content" :class="{active:isShow}" @click.stop>
        <listSelect :list='list' :currIndex='currGradeIndex' @selectData="onselectData"></listSelect>
        <!-- <listSelect attr='class_name' :list='classList' :currIndex='currClassIndex' @selectData="onClassData"></listSelect> -->
      </div>
    </div>
  </div>
</template>

<script>
import listSelect from '@/modules/list/list-select'
import VMask from '@/modules/mask/VMask'
export default {
  name: 'select-class',
  components: {
    listSelect,
    VMask
  },
  data () {
    return {
      currGradeIndex: 3,
      isShow: false,
      listDate: [],
      dataStr: ''
    }
  },
  computed: {
    list () {
      return this.listDate.map((oneWeek, i) => {
        let start = this.$getTimeStr(oneWeek[0], 'yy-mm-dd', false)
        let end = this.$getTimeStr(oneWeek[6], 'yy-mm-dd', false)
        let str = `${start} 到 ${end}`
        if (i === 3) {
          // str += ' (本周)'
        }
        return str
      })
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.listDate = this.getDate()
    },
    getDate () {
      let n = 24 * 60 * 60 * 1000
      let d = new Date()
      let list = []
      for (let i = 0; i < 5; i++) {
        let date = new Date(d.getTime() + n * 7 * (i - 3))
        list.push(this.getOneWeekDate(date))
      }
      return list
    },
    getOneWeekDate (d) {
      let n = 24 * 60 * 60 * 1000
      let w = d.getDay()
      w = w || 7
      let list = []
      for (let i = 0; i < 7; i++) {
        let date = new Date(d.getTime() + n * (i - w + 1))
        list.push(date)
      }
      // console.log(list)
      return list
    },
    onselectData (obj) {
      // console.log(i)
      this.dataStr = obj.value
      let oneWeek = this.listDate[obj.i]
      let start = this.$getTimeStr(oneWeek[0], 'yy-mm-dd', false)
      let end = this.$getTimeStr(oneWeek[6], 'yy-mm-dd', false)
      this.$emit('change', start, end)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-class {
  background: #fff;
}
.head {
  position: relative;
  z-index: 9;
  background: #fff;
  line-height: 38px;
  height: 38px;
  text-align: center;
  color: #88b8f8;
  font-size: 15px;
}
.content {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  overflow: hidden;
  transition: all 0.2s;
  padding: 0 16px;
  background: #fff;
  display: flex;
  height: 0;
  &.active {
    padding: 30px 16px;
    height: 250px;
  }
}
.position {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1;
}
</style>
