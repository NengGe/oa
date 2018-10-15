<template>
  <div class="index-wrapper">
     <!--学校主任 门卫等首页 部门人员 -->
    <div class="toIndex1" v-if="roleArr.indexOf(3)>-1&&roleArr.indexOf(2)===-1"> 
      <moralityIndex :indexData="indexData"></moralityIndex>
    </div>
    <!-- 班主任认任课老师等首页-->
    <div class="toIndex2" v-else-if="roleArr.indexOf(2)>-1&&roleArr.indexOf(3)===-1">
      <moralityIndex2 :indexData="indexData"></moralityIndex2> 
    </div>
    <!--双重角色 既是部门人员又是任课老师或者班主任角色-->
    <div class="toIndex3" v-else-if="roleArr.indexOf(2)>-1&&roleArr.indexOf(3)>-1">
      <transition name="slide-left" enter-active-class="transition-active" leave-active-class="transition-active">
        <moralityIndex :indexData="indexData" v-show="roleChange" role="repeatRole" @changePage="changePage"></moralityIndex>
        <!-- <moralityIndex2 :indexData="indexData" v-show="!roleChange"  role="repeatRole" @changePage="changePage"></moralityIndex2> -->
      </transition>
      <transition name="slide-left" enter-active-class="transition-active" leave-active-class="transition-active">
        <moralityIndex2 :indexData="indexData" v-show="!roleChange"  role="repeatRole" @changePage="changePage"></moralityIndex2>
      </transition>
    </div>
  </div>
</template>
<script>
import moralityIndex from '@/components/morality-manager/moralityIndex'
import moralityIndex2 from '@/components/morality-manager/moralityIndex2'
import local from '@/components/morality-manager/assets/js/localStore.js'
import session from '@/components/morality-manager/assets/js/session.js'
export default {
  name: 'indexWrapper', // 该组件被缓存其子组件也被缓存 子组件中有用到activeted钩子函数
  components: {
    moralityIndex,
    moralityIndex2
  },
  data () {
    return {
      indexData: {},
      pageSize: 0,
      roleArr: [], // 角色权限数组
      roleChange: true
    }
  },
  methods: {
    getData (url, isLoad) { // 得到初始数据
      if (!isLoad) { // 上啦加载 下拉刷新时候不显示loading
        this.$preloaderFull.show({mask: true})
      }
      return this.$axios.get(url).then(({data}) => {
        // console.log(data)
        this.$preloaderFull.close()
        if (data.status === 200) {
          return data.result
        } else {
          return Promise.reject(new Error(data.message))
        }
      }).catch((erro) => {
        this.$toast('首页加载失败！')
        this.$preloaderFull.close()
        // this.$router.back()
        // console.log(erro)
      })
    },
    getIndexData (url) {
      return this.getData(url)
    },
    changePage () { // 双重角色切换
      // console.log('heheh')
      this.roleChange = !this.roleChange
      this.$moralityBus.role = this.roleChange ? 1 : 2 // 切换role
      // console.log(this.$moralityBus.role)
    },
    getRoleOrganization () { // 角色操作权限处理和缓存
      // this.$toast('第一次请求额')
      this.getData('/palm/v2/module').then(data => {
        let moduleIds = data.all_module.length && data.all_module[0].module_ids // 有些接口可能没有modules_id
        moduleIds = moduleIds || []
        let obj = {}
        obj.statisticsOrganization = moduleIds.indexOf('202') > -1 // 学校行为统计权限
        obj.appealDealOrganization = moduleIds.indexOf('205') > -1 // 学校申诉处理权限
        obj.behaviorEvalOrganization = moduleIds.indexOf('206') > -1 // 学校评比权限
        obj.behaviorEditOrganization = moduleIds.indexOf('208') > -1 // 学校行为修改权限
        obj.behaviorDeleteOrganization = moduleIds.indexOf('209') > -1 // 学校行为删除权限
        obj.behaviorAppealOrganization = moduleIds.indexOf('210') > -1 // 学校行为申诉权限
        obj.behaviorDetailsOrganization = moduleIds.indexOf('214') > -1 // 学校行为详情权限
        // console.log(data)
        local.set('schoolRoleOrganization', obj)
        // console.log(obj)
      })
    },
    clearData () {
      session.del('dormitoryData')
      session.del('schoolClassData')
      local.del('schoolRoleOrganization')
    },
    cacheIndexData () {
      this.getIndexData('/palm/v2/roleorg').then((data) => {
        this.indexData = data
        // console.log(data)
        this.roleArr = data.auth_list
        this.$moralityBus.role = this.roleArr.indexOf(3) > -1 ? 1 : (this.roleArr.indexOf(2) > -1 ? 2 : 0) // 初始化role
      })
    }
  },
  activated () {
    // this.cacheIndexData()
  },
  created () {
    // console.log(this.indexData)
    // console.log(this.roleChange)
    this.clearData()
    this.getRoleOrganization()
    this.cacheIndexData()
  }
}
</script>
<style scoped>
.transition-active{
  transition: 0.3s cubic-bezier(.55,0,.1,1);
  transition-property:opacity,transform;
  position: fixed;
}
  .slide-left-enter, .slide-right-leave-to {
    opacity: 0;
    transform: translate3d(30px, 0, 0);
  }
  .slide-left-leave-to, .slide-right-enter {
    opacity: 0;
    transform: translate3d(-30px, 0, 0);
  }
</style>

