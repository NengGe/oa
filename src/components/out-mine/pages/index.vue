<template>
  <div class="index">
    <oa-tabHead2 position :list="tabList" @action="(item,i)=>tabAction(item,i)" :currIndex="currIndex"></oa-tabHead2>
    <listLoad v-show="currIndex===0" :data='listData1' :getData='getDataA' @action='action' :needStatus='true'></listLoad>
    <listLoad v-show="currIndex===1" :data='listData2' :getData='getDataB' @action='action'></listLoad>
    <bottomBtn @action='newBuild'></bottomBtn>
    <router-view @finish='onfinish'></router-view>
  </div>
</template>

<script>
import listLoad from '../com/list-load'
import bottomBtn from './index/bottom-btn'
export default {
  components: {
    listLoad,
    bottomBtn
  },
  data () {
    return {
      tabList: ['进行中', '已结束'],
      currIndex: 0,
      listData1: [],
      listData2: [],
      item: null
    }
  },
  created () {
    this.getData(0)
  },
  methods: {
    onfinish () {
      this.$set(this.item, 'summarized', true)
    },
    newBuild () {
      this.$router.push({ name: 'waichu' })
    },
    action (item, i) {
      this.item = item
      let state = this.currIndex + 1
      this.$router.push({ name: 'detail_outMine', params: { id: item.id, state } })
    },
    tabAction (item, i) {
      window.scrollTo(0, 0)
      this.currIndex = i
    },
    getDataA (begin) {
      return this.getData(begin, 1)
    },
    getDataB (begin) {
      return this.getData(begin, 2)
    },
    getData (begin, state) {
      return this.$axios.get(`/mobicampus/biztrip/v1/list?view_type=mine&state=${state}&start=${begin}&size=10`).then(({ data }) => {
        if (data.status === 200) {
          let d = data.result.data
          let list = d.map(item => {
            let biztrip = item.biztrip
            let people = item.biztrip_people.map(item => {
              return item.user_name
            })
            let startTime = this.$getTimeStr(biztrip.start_time, 'yy-mm-dd hh:mm', false)
            let endTime = this.$getTimeStr(biztrip.end_time, 'yy-mm-dd hh:mm', false)
            let person = people.join('、')
            return {
              id: biztrip.id,
              desc: biztrip.desc,
              time: `${startTime}~${endTime}`,
              person,
              destination: biztrip.destination,
              summarized: item.summarized === 'true'
            }
          })
          return list
        }
      })
    }
  }
}
</script>

<style scoped>
.index {
  padding-top: 56px;
  padding-bottom: 66px;
}
</style>

