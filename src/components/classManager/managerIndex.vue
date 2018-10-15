<template>
  <div class="manager-index">
    <selectClass @classData="classData"></selectClass>
    <indexHead :schoolMangager="schoolMangager"></indexHead>
    <!-- <appealItem v-if="isMaster" @click.native="$toast('功能开发中......')"></appealItem> -->
    <statisticItem :gradeClassName="gradeClassName"></statisticItem>
    <div class="details">
      <div class="left">
        录入记录
      </div>
      <div class="right">
        <router-link class="school-datails" :to="{name: 'classBehavior', params:{class_id: classId}}">
          班级行为详情
        </router-link>
        <router-link class="more" :to="{name:'indexMore', params:{class_id: classId}}">
          更多
        </router-link>
      </div>
    </div>
    <nomoreBehaviorItem :recordList="recordList" @click="toDetails"></nomoreBehaviorItem>
  </div>
</template>
<script>
import indexHead from '@/components/classManager/managerHead'
import appealItem from '@/components/classManager/appealItem'
import statisticItem from '@/components/classManager/statisticItem'
import nomoreBehaviorItem from '@/components/classManager/components/nomoreBehaviorItem'
import selectClass from '@/components/classManager/selectClass'
import dateTo from '@/components/classManager/assets/js/dateTo.js'
import session from '@/components/classManager/assets/js/session.js'
import local from '@/components/classManager/assets/js/localStore.js'
export default {
  name: 'managerIndexClass',
  components: {
    indexHead,
    appealItem,
    statisticItem,
    nomoreBehaviorItem,
    selectClass
  },
  data () {
    return {
      isMaster: true,
      classId: '',
      recordList: [],
      gradeClassName: {},
      schoolMangager: false
    }
  },
  methods: {
    getData (url) {
      this.$preloaderFull.show({ mask: true })
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
    getRecordList (url) { // 得到班级自我管理数据
      this.getData('/palm/v2/classeventrecord?class_id=' + this.classId + '&condition=record&size=20').then((data) => {
        // this.recordList = data
        // console.log(data)
        this.recordList = data.records.slice(0, 20)
        this.recordList.map((ele) => {
          return ele.event_date && (ele.event_date = dateTo(ele.event_date))
        })
        // console.log(this.recordList)
      })
    },
    getClassManageOrganize () {
      this.getData('/palm/v2/module').then(data => {
        let moduleIds = data.all_module.length && data.all_module[0].module_ids
        moduleIds = moduleIds || []
        let obj = {}
        obj.classStatisticOrganization = moduleIds.indexOf('302') > -1 // 班级行为统计权限
        obj.classActionOrganization = moduleIds.indexOf('304') > -1 // 班级行为详情权限
        obj.classEvaluationOrganization = moduleIds.indexOf('306') > -1 // 班级行为评比权限
        session.set('classRole', obj)
      })
    },
    classData ({isMaster, classId, periodId}) { // 得到班级id
      if (isMaster && isMaster.toString() !== '') {
        this.isMaster = isMaster
      }
      if (classId) {
        this.classId = classId
        // console.log(this.classId)
      }
      // periodId && (this.periodId = periodId)
    },
    toDetails (item) {
      // console.log(item)
      this.$router.push({path: 'classDetailPage/1', query: {class_id: item.class_id, event_id: item.event_id}}) // params: 1为来自录入记录 2为来班级详情
    },
    clearLocalData () { // 清除一些本地数据
      session.del('classRole')
      let arr = ['class', 'eventInfo', 'grade', 'gradeClassInfo', 'gradeList']
      arr.forEach(ele => {
        local.del(ele)
      })
    }
  },
  created () {
    this.clearLocalData()
    this.getClassManageOrganize()
    // this.getRecordList('').then((data) => {
    //   // console.log(data)
    // })
    // console.log('hehe')
  },
  watch: {
    classId () {
      this.getRecordList()
    }
  },
  activated () {
    if (this.classId) {
      this.getRecordList()
    }
  },
  beforeRouteLeave (to, from, next) {
    // console.log(to.name)
    let {unCacheComponets} = this.$root
    if (to.name === 'classBehavior') { // 班级行为详情
      let index = unCacheComponets.indexOf('classBehavior')
      if (index > -1) {
        this.$root.unCacheComponets.splice(index, 1)
      }
    } else if (to.name === 'indexMore') { // 去往更多页面
      let index = unCacheComponets.indexOf('classMore')
      if (index > -1) {
        this.$root.unCacheComponets.splice(index, 1)
      }
    }
    next()
  }
}
</script>

<style scoped>
.manager-index {
  background-color: #f7f7f9;
}
.manager-index /deep/ .iconfont {
  font-family: "iconfont-morality";
  font-size: 32px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
}
.details {
  padding: 0px 16px;
  height: 54px;
  margin-top: 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #f9f2f2;
}
.left {
  color: #333333;
  font-size: 15px;
  font-weight: bold;
}
.right a {
  color: #88b8f8;
  font-size: 12px;
  padding: 6px 9px;
  border: solid 1px #88b8f8;
  border-radius: 5px;
}
.right .more {
  margin-left: 11px;
}
</style>
