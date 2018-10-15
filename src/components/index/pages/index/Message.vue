<template>
  <div class="message">
    <listHead title="系统消息" icon="&#xe63f;" @action="onAction"></listHead>
    <List :data='listData' :needFrom='false' @action="onListAction"></List>
    <div class="no-data-tips" v-show="!hasData">暂无任何通知消息哦~</div>
  </div>
</template>

<script>
import List from '@/components/index/pages/com/List'
import listHead from '@/components/index/pages/com/listHead'
import getRouter from '@/components/index/js/getRouter.js'
export default {
  components: {
    List,
    listHead
  },
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      listData: [
        // {
        //   title: '',
        //   right: '19:00',
        //   contentArr: [
        //     ['发信人', '张三']
        //   ]
        // }
      ]
    }
  },
  computed: {
    hasData () {
      return Boolean(this.listData.length)
    }
  },
  created () {
    // this.getNotifList()
  },
  methods: {
    onListAction (item, i) {
      let r = getRouter(item)
      console.log(r)
      if (r) {
        this.$router.push(r)
      }
    },
    getNotifList () {
      // this.$preloaderFull.show()
      return this.$axios.get(`/mobicampus/common/v1/getNotifList?start=0&size=5`).then(({ data }) => {
        // this.$preloaderFull.close()
        if (data.status === 200) {
          let d = data.result.data
          this.listData = d.map((item, i) => {
            let time = this.$getTimeStr(item.create_time)
            item.right = time
            item.contentArr = [
              ['发信人', item.from]
            ]
            return item
          })
        }
      })
    },
    onAction () {
      this.$router.push({name: 'sysMsgList'})
    }
  }
}
</script>

<style lang='scss' scoped>
.message {
  min-height: 142px;
  background-color: #fff;
  margin-top: 12px;
}
.no-data-tips {
  height: 90px;
  text-align: center;
  line-height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #ccc;
}
</style>



