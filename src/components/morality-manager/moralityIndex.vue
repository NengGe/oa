<template>
  <div class="morality-index">
    <indexHead v-bind="$attrs" v-on="$listeners"></indexHead>
    <appealItem @click.native="toAppeal" v-if="roleArr.indexOf(1) > -1" :itemData="indexData.appeal_event"></appealItem>
    <statisticItem role="1"></statisticItem>
    <div class="record">
      <div class="record-left">
        录入记录
      </div>
      <div class="center">
      </div>
      <div class="record-right">
        <a @click="toSchoolDetails" class="record-a" v-gray:border="behaviorDetailsOrganization">学校行为详情</a>
        <router-link :to="{path: 'schoolEntryMore'}" class="record-a">更多</router-link>
      </div>
    </div>
    <nomoreBehaviorItem :recordList="recordList" @toAppDetails="toAppDetails"></nomoreBehaviorItem>
  </div>
</template>
<script>
import indexHead from '@/components/morality-manager/pages/moralityHead'
import appealItem from '@/components/morality-manager/pages/appealItem'
import statisticItem from '@/components/morality-manager/pages/statisticItem'
import nomoreBehaviorItem from '@/components/morality-manager/components/nomoreBehaviorItem'
import dateTo from '@/components/morality-manager/assets/js/dateTo.js'
import local from '@/components/morality-manager/assets/js/localStore.js'
export default {
  name: 'moralityIndex',
  props: {
    indexData: Object
  },
  components: {
    indexHead,
    appealItem,
    statisticItem,
    nomoreBehaviorItem
  },
  data () {
    return {
      recordList: [],
      pageSize: 0,
      roleArr: []
    }
  },
  methods: {
    toAppeal () {
      this.$router.push({path: 'schoolAppealIndex'})
    },
    getData (url, isLoad) {
      if (!isLoad) { // 上啦加载 下拉刷新时候不显示loading
        this.$preloaderFull.show({ mask: true })
      }
      return this.$axios.get(url).then(({ data }) => {
        // console.log(data)
        this.$preloaderFull.close()
        if (data.status === 200) {
          return data.result
        } else {
          return Promise.reject(new Error(data.message))
        }
      }).catch((erro) => {
        this.$preloaderFull.close()
        console.log(erro)
      })
    },
    toAppDetails (item) {
      // console.log(item)
      this.$router.push({path: 'schoolBehaviorDetails/1', query: {event_id: item.event_id}}) // 1代表来自录入记录
    },
    toSchoolDetails () { // 学校行为详情页
      if (this.behaviorDetailsOrganization) {
        this.$router.push({path: 'schoolBehaviorIndex'})
      }
    },
    getRecordList () {
      this.getData('/palm/v2/eventrecord?condition=record&size=25').then(data => {
      // console.log(data)
        let arr = this.recordList = data.records
        // console.log(arr)
        arr.forEach((ele, index) => {
        // console.log(ele)
          arr[index].event_date = dateTo(ele.event_date)
        })
        this.recordList = arr
      })
      this.roleArr = this.indexData.auth_list
    }
  },
  watch: {
  },
  created () {
    // console.log(this.behaviorDetailsOrganization)
    this.getRecordList()
  },
  activated () {
    this.getRecordList()
  },
  computed: {
    behaviorDetailsOrganization () {
      return JSON.parse(local.get('schoolRoleOrganization')).behaviorDetailsOrganization
    }
  }
}
</script>

<style scoped>
.morality-index {
  background-color: #f7f7f9;
  width: 100%;
}
.morality-index /deep/ .iconfont-morality {
  font-family: "iconfont-morality";
  font-size: 32px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
}
.record {
  margin-top: 11.5px;
  background-color: #ffffff;
  height: 54px;
  line-height: 54px;
  display: flex;
  justify-content: space-between;
  padding: 0px 16px;
  border-bottom: 1px solid #f9f2f2;
}
.record-left {
  font-size: 15px;
  color: #333333;
  font-weight: bold;
}
.record-a {
  display: inline-block;
  line-height: 13px;
  padding: 6px 9px;
  font-size: 12px;
  color: #69a0fa;
  border-radius: 5px;
  border: solid 1px #69a0fa;
}
.record-a:last-of-type {
  margin-left: 11px;
}
</style>
