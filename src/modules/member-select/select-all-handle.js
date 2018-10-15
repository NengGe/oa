export default {
  data () {
    return {
      // 目前没有被选择项。id 对应提交数据
      noSelectedItems: {},
      // 已选择的项。id 对应提交数据
      selectedItems: {}
    }
  },
  computed: {
    // 是否全选
    isAllSelect () {
      let {noSelectedItems} = this
      let i = 0
      this.each(noSelectedItems, () => {
        i++
        return false
      })
      if (i) {
        return false
      }
      return true
    }
  },
  methods: {
    each (obj, fn) {
      for (let k in obj) {
        if (obj.hasOwnProperty(k) && fn(obj[k], k) === false) break
      }
    },
    // 多选重置
    selectAllSet () {
      let selectedItems = this.selectedItems = {}
      let noSelectedItems = this.noSelectedItems = {}
      let {$set, allItems, selectedIdsDict, groupData: dept, getMemberDataSubmit} = this
      dept.member_list.forEach(d => {
        let id = d.user_id
        let submitData = allItems[id]
        if (submitData === undefined) {
          submitData = allItems[id] = getMemberDataSubmit(dept, d)
        }
        if (selectedIdsDict[id]) {
          $set(selectedItems, id, submitData)
        } else {
          $set(noSelectedItems, id, submitData)
        }
      })
    },
    // 多选选择指定
    selectAllSelect (dept, member) {
      let id = member.user_id
      let {selectedItems, noSelectedItems} = this
      let isSelected = selectedItems[id]
      if (isSelected) {
        this.$delete(selectedItems, id)
        this.$set(noSelectedItems, id, 1)
      } else {
        this.$delete(noSelectedItems, id)
        this.$set(selectedItems, id, this.getMemberDataSubmit(dept, member))
      }
    },
    // 全选
    selectAll () {
      let {$set, groupData: dept, getMemberDataSubmit, selectedItems} = this
      this.groupData.member_list.forEach((member, i) => {
        $set(selectedItems, member.user_id, getMemberDataSubmit(dept, member))
      })
      this.noSelectedItems = {}
    },
    // 反选
    selectAllRemove () {
      let {$set, noSelectedItems} = this
      this.groupData.member_list.forEach((member, i) => {
        $set(noSelectedItems, member.user_id, 1)
      })
      this.selectedItems = {}
    },
    getMemberDataSubmit (dept, member) {
      return {
        user_id: member.user_id,
        user_name: member.name,
        dept_id: member.dept_id,
        dept_name: dept.name,
        type: 0
      }
    }
  }
}
