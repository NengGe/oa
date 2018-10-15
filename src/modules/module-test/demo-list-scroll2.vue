<template>
  <div class="applyChildPage caigou">
    <div class="head">
      <p>begin：{{begin}}</p>
    </div>
    <div class="wrap" ref="wrap">
      <listScroll @refreshAction="onRefresh" @loadMoreAction="onLoadmore">
        <ul class="list" ref="list">
          <li class="item" v-for="(item, i) in dataList" :key="i">
            <p></p>
            <p>id：{{i}}</p>
          </li>
        </ul>
    </listScroll>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import listScroll from '@/modules/module-test/list-scroll2'
export default {
  data () {
    return {
      dataList: [{}, {}],
      size: 10
    }
  },
  computed: {
    begin: function () {
      return this.dataList.length
    }
  },
  components: {
    listScroll
  },
  created () {

  },
  mounted () {
    // this.$refs.wrap.addEventListener('scroll', this.scrollAction)
  },
  methods: {
    // 刷新
    onRefresh (cb) {
      // console.log('刷新')
      this.getData(0, this.size).then((list) => {
        // console.log(list)
        this.dataList = list
        cb()
      })
    },
    // 加载更多
    onLoadmore (cb) {
      // console.log('加载更多')
      this.getData(this.begin, this.size).then((list) => {
        // console.log('list', list, list.length)
        this.dataList = this.dataList.concat(list)
        cb(list.length)
      })
    },
    getData (begin, size) {
      return this.$axios.get(`/mobicampus/approve/v1/getApplicationList?list_type=submitted&begin=${begin}&size=${size}`).then(({data}) => {
        if (data.status === 200) {
          console.log('if-data', data)
          let dataList = data.result.data.application_list
          let list = dataList.map(item => {
            let obj = {
              applicationName: item.application.name,
              applicationId: item.application.id
            }
            return obj
          })
          // if (this.begin >= 5) {
          //   return []
          // }
          return list
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .caigou{
    background-color: #efefef;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .head{
      width: 100%;
      height: 70px;
      background-color: #3c70a2;
    }
    .wrap{
      flex: 1;
      position: fixed;
      width: 100%;
      top: 70px;
      bottom: 54px;
      background-color: #fff;
      overflow: hidden;
      .list{
        overflow: hidden;
        .item{
          background-color: #fff;
          padding: 15px;
          border-radius: 10px;
          margin: 10px;
        }
      }
    }
    .bottom{
      width: 100%;
      height: 54px;
      background-color: #fff;
    }
  }
</style>
