<template>
  <!-- <transition name="slide-bottom" enter-active-class="transition-active" leave-active-class="transition-active"> -->
  <VTransition name="slide-bottom">
    <div class="select-campus">
      <oa-search ref="search" position :keyword.sync="keyword"></oa-search>
      <ul class="list">
        <li class="item clickActive" v-for="(item, i) in dataList" :key="'dataList'+i" @click="itemAction(item)" v-show="item.isShow">
          <span>{{item.school_name}}</span>
          <span>{{item.campus_name}}</span>
        </li>
      </ul>
    </div>
  </VTransition>
  <!-- </transition> -->
</template>

<script>
import VTransition from '@/modules/v-transition/'
export default {
  components: {
    VTransition
  },
  props: {
    // 'show': {
    //   type: Boolean
    //   // default: false
    // }
  },
  data () {
    return {
      keyword: '',
      dataList: []
    }
  },
  watch: {
    keyword (newV) {
      this.onSerch(newV)
    }
  },
  created () {
    this.getCampusesList().then(data => {
      this.dataList = data
    })
  },
  methods: {
    onSerch (k) {
      this.dataList.forEach(item => {
        item.isShow = this.$refs.search.keywordTest(k, item['school_name'])
      })
    },
    itemAction (item) {
      this.$emit('selectAction', item)
    },
    getCampusesList () {
      return this.$axios.get(`/comm/v1/campuses`)
        .then(({ data }) => {
          if (data.message === 'ok') {
            return data.result.map(item => {
              item.isShow = true // 用来 搜索显示隐藏
              return item
            })
          }
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.select-campus {
  padding-top: 40px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow-y: auto;
  z-index: 1;
  background-color: #eaf5fb;
}
.list {
}
.list .item {
  color: #999;
  line-height: 50px;
  border-bottom: 1PX #dedede solid;
  text-align: center;
}
</style>
