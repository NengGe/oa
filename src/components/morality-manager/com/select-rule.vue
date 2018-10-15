<template>
  <transition name="slide-bottom" enter-active-class="transition-active" leave-active-class="transition-active">
    <div class="select-rule page-fixed page-bg" v-show="isShow">
      <headrule attr='content' :list='navList' @action="navAction"></headrule>
      <listRule :attr='attr' :selectData='selectData' :list='list' @action="listAction"></listRule>
      <bottomBtn @cancel="close" @confirm="onConfirm"></bottomBtn>
    </div>
  </transition>
</template>

<script>
/* eslint-disable camelcase */
import headrule from './select-rule/head-rule'
import listRule from './select-rule/list-rule'
import bottomBtn from './select-rule/bottomBtn'
export default {
  components: {
    headrule,
    listRule,
    bottomBtn
  },
  data () {
    return {
      type: '',

      rule_type: '', // 宿舍('5') or 班级('1')
      period_id: '', // 学段

      selectData: {},
      selItemId: '-1',

      isRoot: true,
      ruleId: '0',
      parentId: '',
      currPid: '-1',
      selItem: null,
      isShow: false,
      navList: [
        { content: '制度', ruleId: '0', parentId: '0' }
        // { content: '二级制度' },
        // { content: '三级制度' },
        // { content: '四级制度' }
      ],
      // list: [
      //   { content: '吃饭', isSelect: false },
      //   { content: '睡觉', isSelect: false },
      //   { content: '玩手机', isSelect: false },
      //   { content: '看小说', isSelect: false }
      // ],
      ruleData: {},
      ruleList: [],
      ruleTypeList: []
    }
  },
  computed: {
    isMultiple () {
      return this.type === 'multiple'
    },
    attr () {
      return this.ruleId === '0' ? 'rule_name' : 'item_name'
    },
    list () {
      console.log('计算属性 list')
      let list
      let { ruleData, ruleId, parentId, rule_type, period_id } = this
      if (ruleId === '0') {
        list = ruleData[0] || []
      } else {
        parentId = parentId || '0'
        list = ruleData[ruleId] ? ruleData[ruleId][parentId] : []
      }
      // return list
      return list.filter(item => { // 过滤 宿舍/班级 or 学段
        return (!rule_type || item.rule_type === rule_type) && (!period_id || item.period_id === period_id)
      })
    }
  },
  created () {
    this.getData(true, '0')
  },
  methods: {
    selOne (item, flag) {
      item.isSelected = flag
      if (flag) {
        this.$set(this.selectData, item.item_id, item)
      } else {
        this.$delete(this.selectData, item.item_id, item)
      }
    },
    navAction (item, i) {
      this.ruleId = item.ruleId
      this.parentId = item.parentId
      this.navList.splice(i + 1)
    },
    listAction (item, i) {
      let { isMultiple } = this
      if (item.isLast) { // 最后一级 --> 执行选择
        if (isMultiple) { // 多选
          let flag = this.selectData.hasOwnProperty(item.item_id)
          this.selOne(item, !flag)
        } else { // 单选
          let { selItem } = this
          selItem && this.selOne(selItem, false)
          this.selOne(item, true)
          // let { selItem } = this
          // if (selItem && selItem !== item) {
          //   selItem.isSelect = false
          // }
          // item.isSelect = !item.isSelect
          // this.selItem = item.isSelect ? item : null
          // this.selItemId = this.selItem ? this.selItem.item_id : '-1'
          this.selItem = item
        }
      } else { // 进入下一级
        let { ruleData, ruleId } = this
        if (ruleId === '0') { // 点击分类
          console.log('点击分类')
          this.addNav(item.rule_name, item.rule_id, item.parentItem_id || '0')
          this.ruleId = item.rule_id
          if (ruleData[item.rule_id]) {
          } else {
            this.getData(true, item.rule_id)
          }
        } else { // 点击制度
          console.log('点击制度')
          this.addNav(item.item_name, item.rule_id, item.parentItem_id || '0')
          if (ruleData[item.rule_id][item.item_id]) {
            this.parentId = item.item_id
          } else {
            console.log('else')
            this.getData(false, '0', item.item_id)
          }
        }
      }
    },
    addNav (content, ruleId, parentId) {
      this.navList.push({
        content, ruleId, parentId
      })
    },
    show ({ type = 'multiple', confirm, rule_type, period_id, institutionList }) {
      this.type = type // [single,multiple]
      this.isShow = true
      this.confirm = confirm
      this.rule_type = rule_type
      this.period_id = period_id
      institutionList && this.initSelData(institutionList)
      this.navAction(this.navList[0], 0)
    },
    initSelData (d) {
      d.forEach(item => {
        this.selOne(item, true)
      })
    },
    close () {
      this.isShow = false
    },
    onConfirm () {
      let { selectData } = this
      let selectList = []
      for (let k in selectData) {
        selectList.push(selectData[k])
      }
      this.isShow = this.confirm(selectList) === false
    },
    getData (isRoot, ruleId, parentId) {
      this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/rules/schoolrules?root=${isRoot}&rule_id=${ruleId}&parent_id=${parentId}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          let d = data.result.data
          let rules = d.map(item => {
            item.isSelect = false
            item.isLast = item.leaf === 'true'
            return item
          })
          if (isRoot && ruleId === '0') { // 获取分类
            this.ruleData[0] = rules
          } else { // 获取制度
            parentId = parentId || '0'
            this.parentId = parentId
            this.ruleData[this.ruleId] = this.ruleData[this.ruleId] || {}
            this.ruleData[this.ruleId][parentId] = rules
          }
          this.ruleData = Object.assign({}, this.ruleData)
          console.log(this.ruleData)
          return rules
        } else {
          this.$simpleMsg(data.message)
        }
      })
    },
    find (arr, k, v) {
      let n = 0
      let flag = arr.find(item => {
        console.log(++n)
        return item[k] === v
      })
      return !flag
    }
  }
}
</script>

<style scoped>
.select-rule {
  background: #fff;
  padding-bottom: 66px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>


