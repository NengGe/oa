
<template>
<transition
  name="slide-bottom"
  enter-active-class="transition-active"
  leave-active-class="transition-active">
  <div v-show="isShow" class="member-select">
    <div class="m-search-box">
      <VSearch @search="onSearch" placeholder="搜索姓名">
        <a v-if="isMultiple" href="javascript:;" @click="allSelect" slot="r-btn" class="s-r-btn">
          {{isAllSelect?'反选':'全选'}}
        </a>
      </VSearch>
    </div>
    <div class="m-main">
      <MemberSelectGroup ref="memberList" v-for="item of list" :key="item.id" :groupData="item" :selectedIdsDict="selectedIdsDict" :type="type" @selectSingle="selectSingle" @changeMultiple="onChangeMultiple" :filterName="searchKeyword"/>
    </div>
    <div class="m-btn-box">
      <div class="m-btn-box-center">
        <!-- <BaseButtonFull @click="confirm">确定</BaseButtonFull> -->
        <BaseButton @click="()=>{isShow=0}" s="gray">取消</BaseButton>
        <BaseButton @click="confirm">确定</BaseButton>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import VSearch from '@/modules/search/VSearch'
import MemberSelectGroup from './MemberSelectGroup'
// import BaseButtonFull from './BaseButtonFull'
import BaseButton from './BaseButton'
export default {
  data () {
    return {
      isShow: 0,
      list: null,
      selectedIdsDict: {},
      type: 'single',
      searchKeyword: '',
      isAllSelect: false
    }
  },
  computed: {
    isMultiple () {
      return this.type === 'multiple'
    }
  },
  components: {
    VSearch,
    MemberSelectGroup,
    // BaseButtonFull,
    BaseButton
  },
  methods: {
    onSearch (k) {
      this.searchKeyword = k
    },
    loadData () {
      // 只加载一次
      if (this.list === null) {
        this.$preloaderFull.show()
        return this.$axios
          .get('/schoolorg/v1/getDeptsWithMemberList', { params: {} })
          .then(({ data }) => {
            if (data.status === 200) {
              this.list = data.result.data
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
      } else {
        return Promise.resolve(this.list)
      }
    },
    confirm () {
      let selectedData = []
      if (this.isMultiple) { // 多选
        this.$refs.memberList.forEach(vCom => {
          vCom.each(vCom.selectedItems, d => {
            selectedData.push(d)
          })
        })
      } else { // 单选
        let {selectedIdsDict} = this
        for (const key in selectedIdsDict) {
          if (selectedIdsDict.hasOwnProperty(key)) {
            selectedData.push(selectedIdsDict[key])
          }
        }
      }
      if (this.onConfirm(selectedData) !== false) {
        this.close()
      }
    },
    each (obj, fn) {
      for (let k in obj) {
        if (obj.hasOwnProperty(k) && fn(obj[k], k) === false) break
      }
    },
    // 选择数据 转 索引字典。
    // 此处将清空 selectedIdsDict
    toIdsDict (selectedData) {
      let selectedIdsDict = {}
      selectedData.forEach(d => {
        selectedIdsDict[d.user_id] = d
      })
      this.selectedIdsDict = selectedIdsDict
    },
    // 解决 selectedData 只有id情况。单选 selectedIdsDict 初始不完整问题
    // 借助已初始的 多选 allItems
    idsDictCorrect () {
      let {selectedIdsDict} = this
      for (let id in selectedIdsDict) {
        if (selectedIdsDict.hasOwnProperty(id)) {
          this.$refs.memberList.forEach(vCom => {
            let d = vCom.allItems[id]
            if (d) {
              selectedIdsDict[id] = d
            }
          })
        }
      }
    },
    show ({type = 'single', selectedData, onConfirm}) {
      this.isShow = 1
      this.type = type
      this.toIdsDict(selectedData)
      this.loadData().then(() => {
        if (this.isMultiple) { // 多选
          this.isAllSelectCompute() // 是否多选初始
        } else {
          this.idsDictCorrect() // 单选字典补全
        }
      })
      this.onConfirm = onConfirm
    },
    close () {
      this.isShow = 0
    },
    // 单选选择情况。改变全局
    selectSingle (id, d) {
      let selectedItem = {}
      let isSelected = this.selectedIdsDict[id]
      if (!isSelected) {
        selectedItem[id] = d
      }
      this.selectedIdsDict = selectedItem
    },
    // 全选
    allSelect () {
      let isAllSelect = this.isAllSelect
      this.$refs.memberList.forEach(vCom => {
        if (isAllSelect) {
          vCom.selectAllRemove()
        } else {
          vCom.selectAll()
        }
        this.isAllSelect = !isAllSelect
      })
    },
    // 是否全选
    isAllSelectCompute () {
      this.isAllSelect = this.$refs.memberList.every(vCom => {
        return vCom.isAllSelect
      })
    },
    // 多选情况：选择改变触发
    onChangeMultiple () {
      this.isAllSelectCompute()
    }
  }
}
</script>

<style lang="postcss" scoped>
.member-select {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f8fc;
  overflow: auto;
  .m-main {
    padding-top: 62px;
    padding-bottom: 100px;
  }
}

.m-search-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  .s-r-btn {
    background-color: #12b7f5;
    color:#fff;
  }
}

.search {
  margin: 0 10px;
  top: 20px;
}
.m-btn-box {
  position: fixed;
  width: 100%;
  bottom: 10px;
  .m-btn-box-center {
    margin: 0 10px;

  }
  .b-btn {
    float: left;
    width: 50%;
    /* margin-left: 2%; */
    border-radius: 0 10px 10px 0;
    &:first-child {
      /* margin-left: 0; */
      border-radius: 10px 0 0 10px;
    }
  }
}

</style>

