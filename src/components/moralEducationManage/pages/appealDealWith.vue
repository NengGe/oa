<template>
  <div class="appealDealWith">
    <oa-tabHead2 position :list="tabList" @action="tabAction" :currIndex="currIndex"></oa-tabHead2>
    <listLoad key="1" aaa='111' v-show="currIndex===0" :data='list1' :getData='getDataA' @action='action'></listLoad>
    <listLoad key="2" aaa='222' v-show="currIndex===1" :data='list2' :getData='getDataB' @action='action'></listLoad>
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import listLoad from './appealDealWith/list-load'
export default {
  components: {
    listLoad
  },
  data () {
    return {
      currIndex: 0,
      tabList: ['申诉中', '已处理'],
      list1: [],
      list2: []
    }
  },
  methods: {
    action (item, i) {
      this.$router.push({ name: 'appealDetail', params: { id: item.id, state: this.currIndex } })
    },
    tabAction (item, i) {
      window.scrollTo(0, 0)
      this.currIndex = i
    },
    getDataA (page) {
      return this.getData(page, 0)
    },
    getDataB (page) {
      return this.getData(page, 1)
    },
    getData (page, state) {
      return this.$axios.get(`/palm/v2/appeal?state=${state}&page=1&size=10`).then(({ data }) => {
        if (data.status === 200) {
          console.log('申诉列表', data)
          let d = data.result.appeal_events
          return d.map(item => {
            let { grade_name, class_name, user_name, appeal_id, rule_item_name, event_id } = item
            return {
              id: appeal_id,
              event_id: event_id,
              name: `${grade_name}${class_name} ${user_name}`,
              ruleName: rule_item_name

            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.appealDealWith {
  padding-top: 56px;
}
</style>


