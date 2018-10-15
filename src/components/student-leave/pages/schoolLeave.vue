<template>
  <div class="school-leave">
    <oa-search position class="oa-search" :keyword.sync='keyword' placeholder="姓名/学号"></oa-search>
    <listLoad v-show="!searching" :isNeedStatus='true' :data="listData" @action="onAction" :getData="getData"></listLoad>
    <List v-show="searching" :data="searchList" @action="onAction"></List>
    <router-view @del='onDel'></router-view>
  </div>
</template>

<script>
import List from '@/components/student-leave/com/list'
import listLoad from '@/components/student-leave/com/list-load'
export default {
  components: {
    listLoad,
    List
  },
  data () {
    return {
      item: null,
      searching: false,
      listData: [],
      searchList: [],
      keyword: '',
      leaveTypeList: [
        { content: '事假', type: '1' },
        { content: '病假', type: '2' },
        { content: '其他', type: '3' },
        { content: '迟到', type: '4' },
        { content: '早退', type: '5' },
        { content: '旷课', type: '6' }
      ]
    }
  },
  watch: {
    $route (to, from) {
      if (from.name.indexOf('detail' !== -1)) {
        console.log('this.$route', this.$route)
      }
    },
    keyword (k) {
      this.searching = k.length > 0
      this.getData('', k).then(d => {
        this.searchList = d
      })
    }
  },
  methods: {
    onDel () {
      this.$set(this.item, 'hide', true)
    },
    onAction (item, i) {
      this.item = item
      this.$router.push({ name: 'detailSchoolLeave', params: { id: item.ask_id } })
    },
    getData (page, k = '') {
      let reg = /^\d+$ /
      let type = reg.test(k) ? 'student_id' : 'student_name'
      let view = this.$route.query.isSchool ? 'school' : 'class'
      // this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/userask?condition=all&view=${view}&page=${page}&size=10&${type}=${k}`).then(({ data }) => {
        // this.$preloaderFull.close()
        if (data.status === 200) {
          let d = data.result.ask_info.map((item, i) => {
            let index = parseInt(item.ask_type) - 1
            item.typeName = this.leaveTypeList[index].content
            return item
          })
          // console.log(d)
          return d
        }
      })
    }
  }
}
</script>

<style scoped>
.school-leave {
  padding-top: 46px;
  padding-bottom: 66px;
}
.oa-search {
  background: #fff;
}
</style>
