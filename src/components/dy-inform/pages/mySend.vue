<template>
  <div class="my-send">
    <listLoad :data='listData' @action='action' :getData='get'></listLoad>
    <router-view @del='onDel'></router-view>
  </div>
</template>

<script>
import listLoad from '../com/list-load'
export default {
  components: {
    listLoad
  },
  data () {
    return {
      item: null,
      listData: []
    }
  },
  created () {
    this.get()
  },
  methods: {
    onDel () {
      this.$set(this.item, 'hide', true)
    },
    action (item) {
      this.item = item
      this.$router.push({ name: 'detail-mySend', params: { id: item.id, isAdmin: true } })
    },
    get (page) {
      return this.$axios.get(`/palm/v2/proclamation?condition=append&page=${page}&size=10`).then(({ data }) => {
        if (data.status === 200) {
          let d = data.result.proclamations.map(item => {
            item.time = this.$getTimeStr(item.created_on, 'yy-mm-dd hh:mm')
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
.my-send {
  padding-bottom: 66px;
}
</style>
