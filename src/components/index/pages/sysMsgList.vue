<template>
  <div class="sysMessage">
    <!-- <listHead title="系统消息" :needRightBtn="false"></listHead> -->
    <LoaderRefresh ref="vLoaderRefresh" @bottomLoad="onBottomLoad" @refreshLoad="onRefreshLoad" colorTop="black" colorBottom="black">
      <List :data='listData' @action="onListAction"></List>
    </LoaderRefresh>
    <oa-bg-nodata class="no-data-tips" v-show="isShowNoData">暂无任何通知消息哦~</oa-bg-nodata>
  </div>
</template>

<script>
import List from '@/components/index/pages/com/List'
import listHead from '@/components/index/pages/com/listHead'
import LoaderRefresh from '@/modules/loader-refresh/LoaderRefresh2.vue'
import getRouter from '@/components/index/js/getRouter.js'
export default {
  components: {
    List,
    listHead,
    LoaderRefresh
  },
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      listData: [],
      isShowNoData: false
    }
  },
  computed: {
    begin () {
      return this.listData.length
    }
  },
  created () {
    // this.getNotifList(this.begin)
  },
  methods: {
    onListAction (item, i) {
      let r = getRouter(item)
      if (r) {
        this.$router.push(r)
      }
    },
    // 加载
    onBottomLoad ({ isRefresh, complete, vLoaderBottom }) {
      this.getNotifList(this.begin).then(d => {
        d = d || []
        this.listData.push(...d)
        complete(d.length === 0)
      })
    },
    // 刷新
    onRefreshLoad ({ isRefresh, complete, vLoaderBottom }) {
      this.getNotifList(0).then(d => {
        d = d || []
        this.listData = d
        complete(d.length < 10)
      })
    },
    getNotifList (begin = 0) {
      this.$preloaderFull.show()
      return this.$axios.get(`/mobicampus/common/v1/getNotifList?start=${begin}&size=${10}`).then(({ data }) => {
        console.log(data)
        this.$preloaderFull.close()
        if (data.status === 200) {
          // console.log(data)
          let d = data.result.data
          this.isShowNoData = begin === 0 && d.length === 0 // 列表数据 为空
          let listData = d.map((item, i) => {
            let time = this.$getTimeStr(item.create_time)
            item.right = time
            item.contentArr = [
              ['发信人', item.from]
            ]
            return item
          })
          return listData
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.sysMessage {
  min-height: 500px;
  background-color: #fff;
}
.no-data-tips {
  height: 208px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #ccc;
}
</style>



