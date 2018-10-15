<template>
  <div class="system-entry">
    <div class="system-box">
      <div class="top">
        <VButton1 
          v-for="(item, index) in kind" 
          :class="[ind === index ? 'active' : '']"
          @click="changeInd(index)"
          :key="index">
          <span class="acord">{{item.text}}</span>
        </VButton1>
      </div>
      <div class="system-content">
        <ul class="item-ul">
          <li class="item" 
            v-for="(item, index) in showList"
            :key="'item'+index"
            @click="getNextAction(item, index)"
            :class="{'on':chocieIndexObj === index}"
          >
            <div class="center">
              {{item.item_name || item.rule_name}}
            </div>
            <div class="right">
              <i class="iconfont icon" v-if="item.leaf === 'false'">&#xe605;</i>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom-btn" @click="sure">
        确定
      </div>
    </div>
  </div>
</template>
<script>
import VButton1 from '@/components/classManager/components/VBtutton1'
// import local from '@/components/classManager/assets/js/localStore.js'
export default {
  name: 'systemEntry',
  components: {
    VButton1
  },
  props: {
    periodId: {
      type: String
    },
    classId: {
      type: String
    }
  },
  data () {
    return {
      ind: 0,
      kind: [],
      topActionList: [], // 一级行为
      moreActionList: [], // 更多行为
      showList: [],
      chocieIndexObj: -1,
      sureObj: {}, // 点击确定后提交的对象
      cacheSystemList: {} // 为了缓存数据减少请求
    }
  },
  methods: {
    getData (url) {
      this.$preloaderFull.show({ mask: true })
      return this.$axios.get(url).then(({ data }) => {
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
    changeInd (index) {
      this.ind = index
      this.kind = this.kind.slice(0, index + 1)
      this.showList = this.kind[index].actionList
      this.chocieIndexObj = -1
    },
    getRootSystemInfo () { // 得到根级制度信息
      this.getData('/palm/v2/rules/classrules?root=true&rule_id=0&class_id=' + this.classId).then(data => {
        // console.log(data)
        this.showList = this.topActionList = data.data.rules
        this.kind = []
        this.addKind(this.topActionList)
        this.cacheSystemList.root = this.showList
        // console.log(data)
      })
    },
    getChildrenSystem (rootVar = true, ruleId = 0, classId = 0, parentId) { // 得到子级制度
      return this.getData('/palm/v2/rules/classrules?root=' + rootVar +
      '&rule_id=' + ruleId + '&classId=' + classId + (parentId && '&parent_id=' + parentId))
    },
    addKind (arr, text) { // kind数组里面添加对象,顶部导航栏切换时候显示对应索引的数据
      let obj = {}
      obj.text = text || '一级制度'
      obj.actionList = arr
      this.kind.push(obj)
    },
    getKeys (obj = {}) { // 得到键名
      let keys = Object.keys(obj)
      return keys
    },
    getNextAction (item, index) {
      if (item.item_id === '0') { // 说明是根制度，点击出现二级制度
        let keys = this.getKeys(this.cacheSystemList)
        if (keys.indexOf(item.rule_id) > -1) { // 有缓存先用缓存的数据
          this.showList = this.cacheSystemList[item.rule_id]
          // console.log(this.showList)
          this.addKind(this.showList, item.rule_name)
          return
        }
        this.getChildrenSystem(true, item.rule_id, this.classId || 0, '').then(data => {
          // console.log(data)
          this.showList = data.data.rules
          this.addKind(this.showList, item.rule_name)
          this.cacheSystemList[item.rule_id] = this.showList
          // console.log(this.cacheSystemList)
          // console.log(this.showList)
        })
      } else { // 点击出现二级制度以下的制度
        // console.log(item.leaf)
        if (item.leaf === 'false') { // 说明有子级制度
          // console.log(item.rule_id)
          let keys = this.getKeys(this.cacheSystemList)
          if (keys.indexOf(item.item_id) > -1) { // 有缓存先用缓存的数据
            this.showList = this.cacheSystemList[item.item_id]
            this.addKind(this.showList, item.item_name)
            return
          }
          this.getChildrenSystem(false, 0, this.classId || 0, item.item_id).then(data => {
            // console.log(data)
            this.showList = data.data.rules
            this.addKind(this.showList, item.item_name)
            this.cacheSystemList[item.item_id] = this.showList
            // console.log(this.cacheSystemList)
          })
        } else { // 无子级制度
          this.chocieIndexObj = index
          this.sureObj = item
        }
      }
    },
    sure () { // 点击确定按钮
      // console.log(this.sureObj)
      this.$emit('sure', this.sureObj)
    },
    addSystemObj (item) {
    }
  },
  created () {
    this.getRootSystemInfo()
    // console.log(this.periodId)
    // console.log(this.classId)
  },
  watch: {
    classId () {
      // console.log(this.classId)
      this.getRootSystemInfo()
    },
    cacheSystemList () {
      // console.log(this.cacheSystemList)
    }
  }
}
</script>
<style scoped>
.system-entry {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  transform: translateY(100%);
  z-index: 99;
  background: #ffffff;
  transition: all .3s;
}
.system-entry /deep/ .iconfont {
  font-family: "iconfont-morality";
  font-size: 32px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.system-entry i.icon {
  font-size: 15px;
  opacity: 0.75;
  /* color: #999999; */
}
.system-box {
  padding: 0px 14px;
}
.top {
  padding:10px 0px;
  display: flex;
}
.top .btn {
  margin-left: 8px;
}
.top .btn:first-of-type {
  margin-left: 0px;
}
.top .btn.active {
  color: #ffffff;
  background-color: #88b8f8;
}
.top .btn.active /deep/ i.iconfont {
   color: #ffffff;
}
.item {
  padding: 0px 18px;
  height: 52px;
  border-radius: 7.5px;
  border: solid 1px #dddddd;
  display: flex;
  color: #999999;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  &:active {
    border: 1px solid #88b8f8;
    color: #88b8f8;
  }
}
.item.on {
    border: 1px solid #88b8f8;
    color: #88b8f8;
}
.center {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.bottom-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 54px;
  background: #88b8f8;
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  line-height: 54px;
  &:active {
    background: #9fc1ef;
  }
}
</style>