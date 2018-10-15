
<template>
  <transition name="slide-bottom" enter-active-class="transition-active" leave-active-class="transition-active">
    <div v-show="isShow" class="member-select page-bg">
      <div class="head">
        <Search :type="type" @selectAll='onSelectAll' :isSelectAll="isSelectAll" :keyword.sync="keyword"></Search>
        <nav-head :navList="navList" @action='onNavAction'></nav-head>
      </div>
      <div class="content-box" v-show="!isSearching">
        <List :data='memberList' @memberAction='onMemberAction'></List>
        <List dept :isShowSelectBtn="type==='multiple'" :data='deptList' @deptAction='onDeptAction' @deptSelAction='onDeptSelAction'></List>
      </div>
      <div class="search-box" v-show="isSearching">
        <List :data='searchList' @memberAction='onMemberAction'></List>
      </div>
      <bottomBtn @cancel="onCancel" @confirm="onConfirm"></bottomBtn>
    </div>
  </transition>
</template>

<script>
/* eslint-disable no-multiple-empty-lines */
import VSearch from '@/modules/search/VSearch'
import Search from '@/modules/member-select2/com/Search'
import navHead from '@/modules/member-select2/com/navHead'
import List from '@/modules/member-select2/com/List'
import bottomBtn from '@/modules/member-select2/com/bottomBtn'
export default {
  components: {
    VSearch,
    Search,
    navHead,
    List,
    bottomBtn
  },
  data () {
    return {
      isSearching: false,
      keyword: '',
      isSelectAll: false,
      // 部门指针
      deptPoint: {},
      // 已选中--成员
      SelectedMember: {},
      // 已选中--部门
      SelectedDept: {},
      navList: [
        { dept_name: '组织', dept_id: '0' }
      ],
      memberList: [],
      deptList: [],


      // 搜索列表
      searchList: [],
      lastClickMember: null,

      currDetpID: 0,


      childDeptList: [],
      orgMemberData: {
        '0': {
          isloaded: false,
          isSelected: false,
          dept: { dept_id: '0', dept_name: '组织' },
          memberList: [],
          childDeptList: []
        }
      },
      // 成员指针
      memberPoint: {}, // key --> [{成员对象1},{成员对象2}, ...]
      isShow: 0,
      list: null,
      type: 'single'
    }
  },
  computed: {
    isMultiple () {
      return this.type === 'multiple'
    },
    isAllSelect () {
      return this.deptPoint[this.currDetpID].isSelected
    }
  },
  watch: {
    currDetpID: function (id) {
      this.memberList = this.deptPoint[id].memberList
      this.deptList = this.deptPoint[id].deptList
      this.setSelStatus(id)
    },
    keyword (k) {
      this.isSearching = !!k
      !!k && this.getSearchData(k)
    }
  },
  created () {
    this.getData('0').then(d => {
      this.memberList = d.memberList
      this.deptList = d.deptList
    })
  },
  methods: {
    show ({ type = 'single', selectedData, staticData, onConfirm }) {
      this.isShow = 1
      this.type = type
      // this.initSelectedData(selectedData)
      this.confirmCb = onConfirm
      if (staticData) {
        this.initStaticData(staticData)
      } else {
        console.log('selectedData2', selectedData)
        selectedData && this.initSelectedData(selectedData)
      }
    },
    close () {
      this.isShow = 0
      this.resetData()
    },
    resetData () { // 复位数据
      this.isSearching = false
      this.keyword = ''
      this.clearAllSelected()
    },
    // 取消
    onCancel () {
      this.close()
    },
    // 确定
    onConfirm () {
      let { SelectedMember, SelectedDept } = this
      this.getAllSelData().then(allMemberList => {
        let selectedData = {
          memberList: this.objToArr(SelectedMember),
          deptList: this.objToArr(SelectedDept),
          allMemberList
        }
        this.confirmCb(selectedData) !== false && this.close()
        console.log('selectedData', selectedData)
      })
    },
    filterDept () {
      let deptIdList = []
      for (let k in this.SelectedDept) {
        // console.log('k', k)
        // console.log(this.deptPoint)
        let pId = this.SelectedDept[k].parent_id
        if (k === '0' || !this.seekParentsSelStatus(pId)) {
          deptIdList.push(k)
        }
      }
      // console.log('filterDept', deptIdList)
      return deptIdList
    },
    getAllSelData () {
      let deptIdList = this.filterDept()
      let promiseArr = deptIdList.map(item => {
        return this.getCurrDeptAllMember(item)
      })
      return Promise.all(promiseArr).then(d => {
        let memberList = []
        d.forEach(item => {
          memberList = memberList.concat(item)
        })
        memberList = memberList.concat(this.objToArr(this.SelectedMember))
        return this.arrRemoveRepeat(memberList, 'user_id')
      })
    },
    seekParentsSelStatus (currId) {
      let nodeId
      if (this.SelectedDept.hasOwnProperty(currId)) { // 当前部门选中
        nodeId = currId
      } else { // 当前部门没选中
        let pId = this.deptPoint[currId].parent_id
        this.deptPoint.hasOwnProperty(pId) && (nodeId = this.seekParentsSelStatus(pId))
      }
      return nodeId
    },
    setSelStatus (id) { // 设置当前显示部门选中状态
      let nodeId = this.seekParentsSelStatus(id)
      if (nodeId) {
        this.allSelect(true, false, false)
      } else {
        this.memberList.forEach(item => {
          item.isSelected = this.SelectedMember.hasOwnProperty(item.user_id)
        })
        this.deptList.forEach(item => {
          item.isSelected = this.SelectedDept.hasOwnProperty(item.dept_id)
        })
      }
    },
    // 全选
    onSelectAll () {
      this.isSelectAll = !this.isSelectAll
      this.allSelect(this.isSelectAll, true)
    },
    // 成员
    onMemberAction (item, i) {
      !this.isMultiple && this.clearLastSel() // 单选时
      this.selectOneMember(item, !item.isSelected, true)
    },
    clearLastSel () { // 单选模式时, 清除上次选择
      let member = this.SelectedMember[Object.keys(this.SelectedMember)[0]]
      member && this.selectOneMember(member, false, true)
    },
    // 部门
    onDeptAction (item, i) {
      this.navList.push(item)
      if (this.deptPoint.hasOwnProperty(item.dept_id)) { // 已加载当前部门
        this.currDetpID = item.dept_id
        return
      }
      this.getData(item.dept_id).then(() => {
        this.currDetpID = item.dept_id
      })
    },
    // 部门选框
    onDeptSelAction (item, i) {
      this.selectOneDept(item, !item.isSelected, true)
    },
    // 导航
    onNavAction (item, i) {
      this.currDetpID = item.dept_id
      this.navList.splice(i + 1)
    },
    // 选择某个成员
    selectOneMember (member, status, fromUser = true) {
      if (status) {
        member.isSelected = true
        fromUser && (this.SelectedMember[member.user_id] = member)
      } else {
        member.isSelected = false
        fromUser && delete this.SelectedMember[member.user_id]
      }
    },
    // 选择某个部门
    selectOneDept (dept, status, fromUser = true) {
      if (status) {
        dept.isSelected = true
        fromUser && (this.SelectedDept[dept.dept_id] = dept)
      } else {
        dept.isSelected = false
        fromUser && delete this.SelectedDept[dept.dept_id]
      }
    },
    // 执行全选
    allSelect (flag, fromUser = true) {
      this.memberList.forEach(item => {
        this.selectOneMember(item, flag, fromUser)
      })
      this.deptList.forEach(item => {
        this.selectOneDept(item, flag, fromUser)
      })
    },
    memberData (member) { // 成员--数据格式
      return {
        user_id: member.user_id,
        user_name: member.name,
        dept_id: member.dept_id,
        isSelected: false
      }
    },
    deptData (dept) { // 部门--数据格式
      return {
        dept_name: dept.name,
        dept_id: dept.id,
        parent_id: dept.parent_id,
        isSelected: false,
        isloaded: false
      }
    },
    // 获取搜索结果
    getSearchData (k) {
      this.searchList = []
      this.$preloaderFull.show()
      return this.$axios.get(`/schoolorg/v1/searchMembers?keyword=${k}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          console.log('IF-搜索data', data)
          let searchList = data.result.data
          this.searchList = this.arrRemoveRepeat(searchList, 'user_id').map(item => {
            item.isSelected = false
            return item
          })
        }
      })
    },
    // 获取数据
    getData (id) {
      this.$preloaderFull.show()
      return this.$axios.get(`/schoolorg/v1/getDeptAndMemberLists/${id}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          let d = data.result.data
          let deptList = d.children_dept_list
          let memberList = d.member_list

          memberList = memberList.map(item => {
            return this.memberData(item)
          })
          deptList = this.arrSort(deptList, 'display_order').map(item => {
            return this.deptData(item)
          })
          if (!d.dept) { // id为'0'时,d.dept === null
            d.dept = {
              name: '组织',
              id: '0'
            }
          }
          this.deptPoint[id] = {
            dept_name: d.dept.name,
            dept_id: id,
            parent_id: d.dept.parent_id,
            deptList,
            memberList
          }
          return {
            deptList,
            memberList
          }
        }
      })
    },
    getCurrDeptAllMember (id) {
      return this.$axios
        .get(`/schoolorg/v1/getDeptDescendantsMemberList/${id}`)
        .then(({ data }) => {
          let memberList = data.result.data
          return memberList.map(item => {
            return this.memberData(item)
          })
        })
    },
    // 初始化静态数据
    initStaticData (staticData) {
      this.memberList = staticData.map(item => {
        item.isSelected = false
        return item
      })
      this.deptList = []
    },
    // 初始化选中数据
    initSelectedData (selectedData) {
      let { memberList = [], deptList = [] } = selectedData
      memberList.forEach(item => {
        this.selectOneMember(item, true, true)
      })
      deptList.forEach(item => {
        this.selectOneDept(item, true, true)
      })
      console.log('初始化选中数据')
      console.log(this.SelectedMember, this.SelectedDept)
    },
    // 取消 数据 所有选中
    clearAllSelected () {
      for (let k in this.SelectedMember) {
        this.selectOneMember(this.SelectedMember[k], false, true)
      }
      for (let k in this.SelectedDept) {
        this.selectOneDept(this.SelectedDept[k], false, true)
      }
    },
    objToArr (obj) { // 对象 转 数组
      let arr = []
      for (let k in obj) {
        obj.hasOwnProperty(k) && arr.push(obj[k])
      }
      return arr
    },
    arrSort (arr, attr) { // 数组排序
      let a = []
      arr.forEach((item, i) => {
        let index = a.findIndex((m, j) => {
          return m[attr] > item[attr]
        })
        index === -1 ? a.push(item) : a.splice(index, 0, item)
      })
      return a
    },
    arrRemoveRepeat (arr, attr) { // 数组去重
      let a = []
      arr.forEach((item, i) => {
        let flag = a.every(o => {
          return o[attr] !== item[attr]
        })
        flag && a.push(item)
      })
      return a
    }
  }
}
</script>

<style lang="scss" scoped>
.member-select {
  z-index: 1;
  padding: 87px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // height: 100%;
  // background-color: #fff;
  overflow: auto;
  .head {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    // background-color: #fff;
    background-color: inherit;
  }
  .bottom-btn-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 54px;
    display: flex;
    font-size: 15px;
    text-align: center;
    line-height: 54px;
    box-shadow: 0 -3px 8px #d3e1eb;
    .l-btn {
      color: #666;
      flex: 1;
      background-color: #fff;
    }
    .r-btn {
      color: #fff;
      flex: 1;
      background-color: #58aeff;
    }
  }
}
</style>

