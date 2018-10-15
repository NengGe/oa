<template>
  <div class="whole">
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
      classInformManage: false,
      schoolInformManage: false,
      listData: []
    }
  },

  created () {
    this.initAuthority()
  },
  methods: {
    onDel () {
      this.$set(this.item, 'hide', true)
    },
    initAuthority () {
      let vm = this.$parent.$parent
      this.classInformManage = vm.classInformManage
      this.schoolInformManage = vm.schoolInformManage
    },
    action (item, i) {
      this.item = item
      let isAdmin = this.schoolInformManage || (this.classInformManage && (item.target_id !== '0'))
      console.log('isAdmin', isAdmin)
      this.$router.push({ name: 'detail-whole', params: { id: item.id, isAdmin } })
    },
    get (page) {
      return this.$axios.get(`/palm/v2/proclamation?condition=all&page=${page}&size=10`).then(({ data }) => {
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
.whole {
  padding-bottom: 66px;
}
</style>
