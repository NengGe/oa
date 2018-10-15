<template>
  <div class="approval">
    <oa-tabHead position :list="tabList" @action="(i)=>tabAction(i)" :currIndex="isTabActive">
      <oa-search class="oa-search" :keyword.sync='keyword' placeholder="姓名/学号"></oa-search>
    </oa-tabHead>

    <listLoad v-show="!searching" list='aaa' key="list1" v-if="isTabActive === 0" :data="approving" @action="onAction" :getData="getData"></listLoad>
    <listLoad v-show="!searching" :isNeedStatus='true' list='bbb' key="list2" v-if="isTabActive === 1" :data="approved" @action="onAction" :getData="getData"></listLoad>
    <List :isNeedStatus='isTabActive === 1' v-show="searching" :data="searchList" @action="onAction"></List>
    <router-view @del='onDel'></router-view>
  </div>
</template>

<script>
import listLoad from '@/components/student-leave/com/list-load'
import List from '@/components/student-leave/com/list'
export default {
  components: {
    listLoad,
    List
  },
  data () {
    return {
      item: null,
      tabList: ['待审批', '已审批'],
      searching: false,
      searchList: [],
      isTabActive: 0,
      approving: [],
      approved: [],
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
    keyword (k) {
      this.searching = k.length > 0
      this.getData('', k).then(d => {
        this.searchList = d
      })
    }
  },
  created () {
    // this.getData()
  },
  methods: {
    onDel () {
      this.$set(this.item, 'hide', true)
    },
    resetSearch () {
      this.searching = false
      this.keyword = ''
    },
    tabAction (params) {
      this.resetSearch()
      this.isTabActive = params
      this.iSallSelectActive = false
      // this.$refs.LoaderRefresh.$refs.vLoaderBottom.reStart()
    },
    onAction (item, i) {
      this.item = item
      let approve = this.isTabActive === 0
      this.$router.push({ name: 'detailApproval', params: { id: item.ask_id, approve } })
    },
    getData (page, k = '') {
      let reg = /^\d+$ /
      let type = reg.test(k) ? 'student_id' : 'student_name'
      let view = this.$route.query.isSchool ? 'school' : 'class'
      let condition = this.isTabActive === 0 ? 'notyet' : 'havebeen'
      // this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/userask?condition=${condition}&view=${view}&page=${page}&size=10&${type}=${k}`).then(({ data }) => {
        // this.$preloaderFull.close()
        if (data.status === 200) {
          let d = data.result.ask_info.map(item => {
            let index = parseInt(item.ask_type) - 1
            item.typeName = this.leaveTypeList[index].content
            return item
          })
          return d
        }
      })
    }
  }
}
</script>

<style scoped>
.aaa {
}
.approval {
  padding-top: 90px;
  padding-bottom: 66px;
}
.oa-search {
  background: #fff;
  overflow: hidden;
}
</style>
