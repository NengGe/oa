<template>
  <transition name="slide-bottom" enter-active-class="transition-active" leave-active-class="transition-active">
    <div class="select-rule page-fixed page-bg" v-show="isShow">
      <headrule attr='name' :list='navList' @action="navAction"></headrule>
      <listRule attr='name' :list='list' @action="listAction"></listRule>
      <bottomBtn @cancel="close" @confirm="onConfirm"></bottomBtn>
    </div>
  </transition>
</template>

<script>
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
      currPid: '-1',
      selItem: null,
      isShow: false,
      navList: [
        { name: '一级制度', pId: '0' }
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
      ruleList: []
    }
  },
  computed: {
    list () {
      let { ruleData, currPid } = this
      let list = ruleData[currPid] ? ruleData[currPid] : []
      return list
    }
  },
  created () {
    this.getData()
  },
  methods: {
    navAction (item, i) {
      this.currPid = item.pId
      this.navList.splice(i + 1)
    },
    listAction (item, i) {
      if (this.ruleData[item.id]) { // 进入下一级
        this.currPid = item.id
        this.navList.push(item)
      } else { // 最后一级 --> 执行选择
        let { selItem } = this
        if (selItem && selItem !== item) {
          selItem.isSelect = false
        }
        item.isSelect = !item.isSelect
        this.selItem = item.isSelect ? item : null
        console.log(item.isSelect)
      }
    },
    show ({ confirm }) {
      this.isShow = true
      this.confirm = confirm
    },
    close () {
      this.isShow = false
    },
    onConfirm () {
      let d = this.selItem ? [this.selItem] : []
      this.isShow = this.confirm(d) === false
      console.log(111)
    },
    getData () {
      this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/rules`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          console.log('制度', data)
          this.currPid = '0'
          let d = data.result
          let firstLevelRule = d.schoolAllRules
          let otherRule = d.schoolRules
          this.ruleData[0] = firstLevelRule.map(item => { // 一级制度
            return {
              id: item.rule_id,
              name: item.rule_name,
              pId: '0',
              score: item.score,
              isSelect: false
            }
          })
          otherRule.forEach(item => {
            item.parentItem_id = item.parentItem_id === '0' ? item.rule_id : item.parentItem_id
            this.ruleData[item.parentItem_id] = this.ruleData.hasOwnProperty(item.parentItem_id) ? this.ruleData[item.parentItem_id] : []
            this.ruleData[item.parentItem_id].push({
              id: item.item_id,
              name: item.item_name,
              pId: item.parentItem_id,
              score: item.score,
              isSelect: false
              // isLast: this.find(otherRule, 'parentItem_id', item.item_id)
            })
          })
          this.ruleData = Object.assign({}, this.ruleData)
          console.log('this.ruleData', this.ruleData)
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


