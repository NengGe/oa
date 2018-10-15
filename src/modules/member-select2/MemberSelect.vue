
<template>
<transition
  name="slide-bottom"
  enter-active-class="transition-active"
  leave-active-class="transition-active">
  <div v-show="isShow" class="member-select page-bg">
    <div class="head">
      <div class="m-search-box">
        <VSearch ref="VSearch" @search="onSearch" placeholder="搜索姓名">
          <a v-if="isMultiple" href="javascript:;" @click="allSelectAction" slot="r-btn" class="s-r-btn">
            {{isAllSelect?'反选':'全选'}}
          </a>
        </VSearch>
      </div>
      <!-- 导航 -->
      <ul class="nav-box cf">
        <li class="navItem" v-for="(item, i) in navList" :key="'navList'+i" @click="()=>navItemAction(item, i)">
          <span class="text">{{item.text}}</span>
          <span class="icon iconfont">&#xe616;</span>
        </li>
      </ul>
    </div>
    <div class="content-box">
        <div class="member-dept-box">
          <!-- 成员列表 -->
          <ul class="member-list list-box" v-show="!isSearching">
            <li class="member row" v-for="(item, i) in memberList" :key="item.id" @click="()=>memberAction(item, i)">
              <div class="img-box"></div>
              <span class="nameText">{{item.user_name}}</span>
              <div class="select-box">
                <div class="selectBtn" :class="{active: item.isSelected}">
                  <span class="icon iconfont">&#xe63e;</span>
                </div>
              </div>
            </li>
          </ul>
          <!-- 子部门列表 -->
          <ul class="dept-list list-box"  v-show="!isSearching">
            <li class="child-dept row" v-for="(item, i) in childDeptList" :key="item.id" @click="()=>childDeptAction(item,i)">
              <div class="img-box"></div>
              <span class="nameText">{{item.dept.dept_name}}</span>
              <div class="select-box" v-if="isMultiple" @click.stop="()=>deptSelectedAction(item)">
                <div class="selectBtn" :class="{active: item.isSelected}">
                  <span class="icon iconfont">&#xe63e;</span>
                </div>
              </div>
            </li>
          </ul>
          <!-- 搜索列表 -->
          <ul class="member-list list-box" v-show='isSearching'>
            <li class="member row" v-for="(item, i) in searchList" :key="item.id" @click="()=>searchMemberAction(item, i)">
              <div class="img-box"></div>
              <span class="nameText">{{item.user_name}}</span>
              <div class="select-box">
                <div class="selectBtn" :class="{active: item.isSelected}">
                  <span class="icon iconfont">&#xe63e;</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom-btn-box">
        <div class="l-btn" @click="close">取消</div>
        <div class="r-btn" @click="confirmAction">确定</div>
      </div>
  </div>
</transition>
</template>

<script>
import VSearch from '@/modules/search/VSearch'
export default {
  data () {
    return {
      // 搜索列表
      searchList: [],
      isSearching: false,
      lastClickMember: null,
      // 已选中--成员
      SelectedMember: {},
      // 已选中--部门
      SelectedDept: {},
      currDetpID: 0,
      navList: [
        {text: '组织', dept_id: '0'}
      ],
      memberList: [],
      childDeptList: [],
      orgMemberData: {
        '0': {
          isloaded: false,
          isSelected: false,
          dept: {dept_id: '0', dept_name: '组织'},
          memberList: [],
          childDeptList: []
        }
      },
      // 部门指针
      deptPoint: {}, // key --> {'部门对象'}
      // 成员指针
      memberPoint: {}, // key --> [{成员对象1},{成员对象2}, ...]
      isShow: 0,
      list: null,
      type: 'single',
      searchKeyword: ''
      // isAllSelect: false
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
    currDetpID: function () {
      this.memberList = this.deptPoint[this.currDetpID].memberList
      this.childDeptList = this.deptPoint[this.currDetpID].childDeptList
      // 判断是否全选 -> 改变全选状态
      this.judgeIsAllSelect()
    }
  },
  created () {
    this.deptPoint['0'] = this.orgMemberData['0']
    this.getData('0').then(() => {
      this.memberList = this.orgMemberData[this.currDetpID].memberList
      this.childDeptList = this.orgMemberData[this.currDetpID].childDeptList
    })
  },
  components: {
    VSearch
  },
  methods: {
    // 搜索成员
    searchMemberAction (item, i) {
      item.isSelected = !item.isSelected
      if (!this.isMultiple) { // 单选
        if (this.lastClickMember && this.lastClickMember !== item) {
          this.selectOneMember(this.lastClickMember, false)
        }
      }
      if (item.isSelected) {
        this.selectOneMember(item, true)
      } else {
        this.selectOneMember(item, false)
      }
      this.lastClickMember = item
    },
    // 成员
    memberAction (member, i) {
      // console.log('点击成员')
      member.isSelected = !member.isSelected
      this.memberList = Object.assign([], this.memberList)
      // console.log(member.isSelected)
      this.selectOneMember(member, member.isSelected) // 选中<-->取消选中
      if (!this.isMultiple) { // 单选
        if (this.lastClickMember && this.lastClickMember !== member) {
          this.selectOneMember(this.lastClickMember, false) // 取消选中
        }
      } else { // 多选
        if (this.deptPoint[this.currDetpID].isSelected && !member.isSelected) {
          this.changParentsStatus((this.deptPoint[this.currDetpID]), false)
        } else if (member.isSelected) {
          this.judgeIsAllSelect()
        }
      }
      this.lastClickMember = member
    },
    // 子部门
    childDeptAction (deptData) {
      if (deptData.isloaded) { // 已加载
        if (deptData.isSelected) {
          this.deptAllSelect(deptData, true)
        } else {
          this.deptInitSelect(deptData)
        }
        this.currDetpID = deptData.dept.dept_id
      } else { // 未加载
        this.getData(deptData.dept.dept_id).then(() => {
          if (deptData.isSelected) {
            this.deptAllSelect(deptData, true)
          } else {
            this.deptInitSelect(deptData)
          }
          this.currDetpID = deptData.dept.dept_id
        })
      }
      // 添加导航路径
      let navObj = {
        text: deptData.dept.dept_name,
        dept_id: deptData.dept.dept_id
      }
      this.navList.push(navObj)
    },
    // 子部门选框
    deptSelectedAction (deptData) {
      deptData.isSelected = !deptData.isSelected
      this.selectOneDept(deptData, deptData.isSelected)
      if (deptData.isSelected) {
        this.judgeIsAllSelect()
      } else {
        this.changParentsStatus((this.deptPoint[this.currDetpID]), false)
        if (deptData.isloaded) {
          this.deptAllSelect(deptData, false)
        }
      }
    },
    // 导航
    navItemAction (item, i) {
      this.currDetpID = item.dept_id
      this.navList = this.navList.slice(0, i + 1)
    },
    // 选择某个成员
    selectOneMember (member, status) {
      if (status) {
        member.isSelected = true
        this.SelectedMember[member.user_id] = member
      } else {
        member.isSelected = false
        delete this.SelectedMember[member.user_id]
      }
      // console.log('this.SelectedMember', this.SelectedMember)
    },
    // 选择某个部门
    selectOneDept (deptData, status) {
      if (status) {
        this.SelectedDept[deptData.dept.dept_id] = this.deptPoint[deptData.dept.dept_id]
        deptData.isSelected = true
      } else {
        deptData.isSelected = false
        delete this.SelectedDept[deptData.dept.dept_id]
      }
    },
    // 全选
    allSelectAction () {
      let deptData = this.deptPoint[this.currDetpID]
      deptData.isSelected = !deptData.isSelected
      this.selectOneDept(deptData, deptData.isSelected)
      this.deptAllSelect(deptData, deptData.isSelected)
    },
    // 搜索
    onSearch (k) {
      if (k === '') {
        this.isSearching = false
        return
      }
      this.isAllSelectSearchList = false
      this.isSearching = true
      this.searchKeyword = k
      console.log('关键字：', k)
      this.getSearchData(k)
    },
    getMemberDataSubmit (member) {
      return {
        user_id: member.user_id,
        user_name: member.name,
        dept_id: member.dept_id
      }
    },
    getDeptDataSubmit (dept) {
      return {
        dept_id: dept.id,
        dept_name: dept.name,
        parent_id: dept.parent_id,
        path: dept.path
      }
    },
    // 改变父部门到根部门状态
    changParentsStatus (deptData, booleanValue) {
      let deptInfo = deptData.dept
      let nodeArr = deptInfo.dept_id !== '0' ? deptInfo.path.split('/') : []
      nodeArr.push('0')
      if (booleanValue) {
        nodeArr.forEach(deptId => {
          this.selectOneDept(this.deptPoint[deptId], true)
        })
      } else {
        nodeArr.forEach(deptId => {
          this.selectOneDept(this.deptPoint[deptId], false)
        })
      }
    },
    // 判断是否全选 && 改变全选状态
    judgeIsAllSelect () {
      // console.log('this.memberList', this.memberList)
      let isAllMList = this.memberList.every(member => {
        return member.isSelected
      })
      let isAllDList = this.childDeptList.every(deptData => {
        return deptData.isSelected
      })
      if (!isAllMList || !isAllDList) return false
      this.selectOneDept(this.deptPoint[this.currDetpID], true)
      return true
    },
    // 获取搜索结果
    getSearchData (k) {
      this.searchList = []
      this.$preloaderFull.show()
      return this.$axios
        .get(`/schoolorg/v1/searchMembers?keyword=${k}`)
        .then(({ data }) => {
          if (data.status === 200) {
            console.log('IF-搜索data', data)
            let searchList = data.result.data
            searchList.forEach((item, i) => {
              item.isSelected = false
              // 过滤不同部门相同成员
              let flag = this.searchList.every(member => {
                return member.user_id !== item.user_id
              })
              if (!flag) return
              this.searchList.push(item)
              // 添加成员指针
              let userId = item.user_id
              this.memberPoint[userId] = this.memberPoint[userId] ? this.memberPoint[userId] : []
              this.memberPoint[userId].push(item)
            })
          } else {
            this.$simpleMsg(data.message)
          }
        })
        .catch(e => {
          this.$simpleMsg(e)
        })
        .then(() => {
          this.$preloaderFull.close()
        })
    },
    // 获取数据
    getData (id) {
      this.$preloaderFull.show()
      return this.$axios
        .get(`/schoolorg/v1/getDeptAndMemberLists/${id}`)
        .then(({ data }) => {
          if (data.status === 200) {
            // console.log('IF-data', data)
            let childDeptList = data.result.data.children_dept_list
            let memberList = data.result.data.member_list
            // let dept = data.result.data.dept
            // 成员 添加isSelected属性
            memberList.forEach((item, i) => {
              memberList[i] = this.getMemberDataSubmit(item)
              memberList[i].isSelected = false
              // 添加成员指针
              let userId = memberList[i].user_id
              this.memberPoint[userId] = this.memberPoint[userId] ? this.memberPoint[userId] : []
              this.memberPoint[userId].push(memberList[i])
            })
            // 子部们列表--排序 + 添加isSelected属性
            let childDeptListSort = new Array(childDeptList.length)
            childDeptList.forEach(item => {
              let index = item.display_order - 1
              childDeptListSort[index] = {
                isloaded: false, // 记录加载状态
                isSelected: false,
                dept: this.getDeptDataSubmit(item),
                memberList: [],
                childDeptList: []
              }
              // 添加部门指针
              this.deptPoint[item.id] = childDeptListSort[index]
            })
            // 添加--组织成员数据
            this.deptPoint[id].isloaded = true // 已加载
            // this.deptPoint[id].dept = dept
            this.deptPoint[id].memberList = memberList
            this.deptPoint[id].childDeptList = childDeptListSort
          }
        })
        .catch(e => {
          this.$simpleMsg(e)
        })
        .then(() => {
          this.$preloaderFull.close()
        })
    },
    getCurrDeptAllMember (id, dept) {
      return this.$axios
        .get(`/schoolorg/v1/getDeptDescendantsMemberList/${id}`)
        .then(({ data }) => {
          if (data.status === 200) {
            console.log('IF-data 当前部门所有成员', data)
            let memberList = data.result.data
            memberList.forEach((item, i) => {
              memberList[i] = this.getMemberDataSubmit(item)
              memberList[i].fromDeptId = id // 记录该成员来自哪个部门
              memberList[i].isSelected = true
              if (!this.SelectedMember.hasOwnProperty(memberList[i].user_id)) {
                this.SelectedMember[memberList[i].user_id] = memberList[i]
              }
            })
            dept.allMemberList = memberList
          } else {

          }
        })
        .catch(e => {
          console.log(e)
        })
        .then(() => {
          // this.$preloaderFull.close()
        })
    },
    // 确定
    confirmAction () {
      if (Object.keys(this.SelectedDept).length === 0 && Object.keys(this.SelectedMember).length === 0) return // 没选数据
      // 选中的数据
      let selectedData = {
        memberList: [], // 成员列表(部门没被选中)
        deptList: [], // 部门列表
        memberListSubmit: [] // 需要提交的成员列表
      }
      for (let k in this.SelectedMember) {
        if (!this.SelectedDept.hasOwnProperty(this.SelectedMember[k].dept_id)) { // 该成员部门没被选中
          selectedData.memberList.push(Object.assign({}, this.SelectedMember[k])) // 添加成员(选中的数据)
        }
      }
      if (!this.isMultiple || Object.keys(this.SelectedDept).length === 0) { // 单选 or 没选部门
        selectedData.memberListSubmit = selectedData.memberList // 需要提交的成员列表 === 成员列表(部门没被选中)
        if (this.onConfirm(selectedData) !== false) {
          this.close()
        }
        return
      }
      // 过滤需要请求的部门
      let num = 0 // 请求个数
      let finishedNum = 0 // 请求完成个数
      for (let k in this.SelectedDept) {
        let currDetp = this.SelectedDept[k]
        let parentDeptId = currDetp.dept.dept_id !== '0' ? currDetp.dept.parent_id : -1
        if (!this.SelectedDept.hasOwnProperty(parentDeptId)) {
          selectedData.deptList.push(Object.assign({}, this.SelectedDept[k].dept)) // 添加部门（选中的数据）
          num++
          this.getCurrDeptAllMember(k, selectedData.deptList[num - 1]).then(() => {
            finishedNum++
            if (finishedNum === num) { // 完成所有请求
              // console.log('finishedNum', finishedNum, 'num', num)
              for (let k in this.SelectedMember) {
                selectedData.memberListSubmit.push(Object.assign({}, this.SelectedMember[k])) // 添加成员(选中的数据)
              }
              if (this.onConfirm(selectedData) !== false) {
                this.close()
              }
            }
          })
        }
      }
    },
    show ({type = 'single', selectedData, staticData, onConfirm}) {
      this.isShow = 1
      this.type = type
      this.onConfirm = onConfirm
      if (staticData) {
        this.initStaticData(staticData)
      } else {
        this.initSelectedData(selectedData)
      }
    },
    close () {
      this.isShow = 0
      this.isSearching = false
      this.$refs.VSearch.search = ''
      this.navItemAction(this.navList[0], 0)
      this.clearAllSelected()
    },
    // 初始化静态数据
    initStaticData (staticData) {
      staticData.map(item => {
        item.isSelected = false
      })
      this.memberList = staticData
      this.childDeptList = []
    },
    // 初始化选中数据
    initSelectedData (selectedData) {
      this.memberList = this.deptPoint[this.currDetpID].memberList
      this.childDeptList = this.deptPoint[this.currDetpID].childDeptList
      if (!this.isMultiple) return // 单选
      // 多选--初始化选中状态
      selectedData.memberList = selectedData.memberList ? selectedData.memberList : []
      selectedData.deptList = selectedData.deptList ? selectedData.deptList : []
      selectedData.memberList.forEach(member => { // 初始化成员
        let memberArr = this.memberPoint[member.user_id] || []
        this.selectOneMember(member, true) // 默认数据（暂时--待解决）
        memberArr.forEach(member => {
          this.selectOneMember(member, true)
        })
      })
      selectedData.deptList.forEach(dept => { // 初始化部门
        let deptData = this.deptPoint[dept.dept_id]
        this.selectOneDept(deptData, true)
      })
      this.navList = []
      this.childDeptAction(this.deptPoint['0'])
      // console.log('this.orgMemberData', this.orgMemberData)
    },
    // 取消 数据 所有选中
    clearAllSelected () {
      for (let k in this.SelectedMember) {
        this.selectOneMember(this.SelectedMember[k], false)
      }
      for (let k in this.SelectedDept) {
        this.selectOneDept(this.SelectedDept[k], false)
      }
    },
    // 当前视图批量操作
    deptAllSelect (deptData, booleanValue) {
      deptData.memberList.forEach(member => {
        this.selectOneMember(member, booleanValue)
      })
      deptData.childDeptList.forEach(deptData => {
        this.selectOneDept(deptData, booleanValue)
      })
    },
    // 部门
    deptInitSelect (deptData) {
      deptData.memberList.forEach(member => {
        let booleanValue = this.SelectedMember.hasOwnProperty(member.user_id)
        this.selectOneMember(member, booleanValue)
      })
      deptData.childDeptList.forEach(deptData => {
        let booleanValue = this.SelectedDept.hasOwnProperty(deptData.dept.dept_id)
        this.selectOneDept(deptData, booleanValue)
      })
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
  overflow: auto;
  .head{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: inherit;
    .m-search-box{
      margin: 10px 10px 0;
      .s-r-btn {
        background-color: #12b7f5;
        color:#fff;
      }
    }
    .nav-box{
      margin: 10px 10px;
      .navItem{
        float: left;
        width: 20%;
        margin-right: 5%;
        border: 1PX solid #58aeff;
        box-sizing: border-box;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border-radius: 4px;
        color: #58aeff;
        font-size: 12px;
        display: flex;
        &.active{
          color: #fff;
          background-color: #58aeff;
        }
        &:last-child{
          margin-right: 0;
        }
        .text{
          padding: 0 2px;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .icon{
          font-size: 12px;
          padding: 0 2px;
        }
      }
    }
  }
  .member-dept-box{
    color: #666;
    .member-list .img-box{
      background-image:url('@/assets/imgs/ava3.png');
    }
    .dept-list .img-box{
      background: url('@/assets/imgs/ava4.png') no-repeat center;
      background-color: #4eb9e5;
      // background-size: 100% auto;
    }
    .list-box{
      margin: 10px 10px;
      padding: 0 10px;
      border-radius: 10px;
      background-color: #fff;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      .row{
        height: 52px;
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1PX solid #e4e4e4;
        &:last-child{
          border: 0;
        }
        .img-box{
          margin: 0 20px 0 3px;
          width: 36px;
          height: 36px;
          // background-color: #ccc;
          border-radius: 50%;
          background-size: 100% auto;
        }
        .nameText{
          flex: 1;
          line-height: 52px;
          font-size: 15px;
          font-weight: bold;
        }
        .select-box{
          padding: 10px 0 10px 10px;
          .selectBtn{
            &.active{
              background-color: #58aeff;
              border: 0;
            }
            text-align: center;
            line-height: 20px;
            width: 22px;
            height: 22px;
            border: 1PX #c2c2c2 solid;
            border-radius: 50%;
            color: #fff;
            .icon{
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  .bottom-btn-box{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 54px;
    display: flex;
    font-size: 15px;
    text-align: center;
    line-height: 54px;
    box-shadow: 0 -3px 8px rgba(211, 225, 235, 0.3);
    .l-btn{
      color: #666;
      flex: 1;
      background-color: #fff;
    }
    .r-btn{
      color: #fff;
      flex: 1;
      background-color: #58aeff;
    }
  }
}

</style>

