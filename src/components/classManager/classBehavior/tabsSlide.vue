<template> 
  <div class="tabs-head">
    <VMask @click="init" v-show="isShow"></VMask>
    <div class="tabs-outer">
      <div class="inner-tabs">
        <div class="item"
          v-for="(item, index) in msg"
          @click="changeInd(index)"
          :class="[ind === index ? 'active' : '']"
          :key="index">
          <slot> 
            <span class="text">{{item}}</span>
            <i class="iconfont" v-html="ind === index ? '&#xe602;' : '&#xe601;'"></i>
          </slot>
        </div>
      </div>
      <div class="tabs-content" :class="isShow?'h':''">
       <displayItem
        >
          <li class="display-item"
          v-for="(item, index) in contentList"
          :key="'content'+index"
          @click="trans(index, item.num || item.rule_id)"
          :class="[indexObj[ind]===index?'active':'']"
          >
              <span class="time-s">{{item.text || item.rule_name}}</span>
              <i class="iconfont yes">&#xe650;</i>
          </li>
       </displayItem>
      </div>
    </div>
  </div>
</template>
<script>
import VMask from '@/modules/mask/VMask'
import displayItem from '@/components/classManager/components/displayItem'
const timeList = [
  {
    text: '本周',
    num: 1
  },
  {
    text: '上周',
    num: 2
  },
  {
    text: '本月',
    num: 3
  },
  {
    text: '上月',
    num: 4
  },
  {
    text: '本学期',
    num: 5
  }
]
const appealSate = [
  {
    text: '未申诉',
    num: '0'
  },
  {
    text: '申诉中',
    num: '1'
  },
  {
    text: '已申诉',
    num: '2'
  },
  {
    text: '驳回',
    num: '4'
  }
]
export default {
  name: 'tabsHead',
  components: {
    VMask,
    displayItem
  },
  props: {
    msg: {
      type: Array,
      default () { // 数组默认值用工厂函数
        return ['选择班级', '选择时间']
      }
    }
  },
  data () {
    return {
      text: '',
      ind: -1,
      isShow: false,
      contentList: [],
      periodId: '',
      classId: '',
      systemList: []
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
    init () {
      this.isShow = false
      this.ind = -1
    },
    changeInd (index, num) {
      // if (this.isShow) { // 初始化
      //   this.init()
      //   return
      // }
      this.init()
      this.ind = index
      this.isShow = !this.isShow
      if (index === 0) {
        this.contentList = timeList
      } else if (index === 1) {
        this.contentList = appealSate
      } else if (index === 2) {
        this.contentList = this.systemList
      }
      // alert(index)
    },
    transNum (obj) {
      // console.log(obj)
      this.$emit('transNum', obj)
    },
    trans (index, num) {
      this.isShow = !this.isShow
      // console.log(this.indexObj)
      if (this.indexObj[this.ind] !== index) { // 防止重复点击重复请求
        this.indexObj[this.ind] = index
        if (this.ind === 0) { // 按时间
          this.transNum({
            timeNum: num
          })
        } else if (this.ind === 1) { // 按申诉状态
          // console.log(num)
          this.transNum({
            stateNum: num
          })
        } else if (this.ind === 2) { // 按制度
          this.transNum({
            ruleId: num
          })
        }
      }
    },
    getAllSystems () { // 得到班级的一级制度
      this.getData('/palm/v2/rules?period_id=' + this.periodId + '&class_id=' + this.classId, true).then(data => {
        // console.log(data)
        this.systemList = data.classAllRules
      })
    }
  },
  created () {
    // console.log(this.$managerBus.periodId)
    this.periodId = this.$managerBus.periodId
    this.classId = this.$managerBus.classId
    // console.log(this.itemLen)
    this.getAllSystems()
  },
  computed: {
    itemLen () {
      return Array.apply(null, new Array(this.msg.length)) // 创建固定长度空数组
    },
    indexObj () {
      let obj = {}
      this.itemLen.forEach((ele, index) => {
        obj[index] = -1
      })
      return obj
    }
  }
}
</script>
<style scoped>
  .tabs-head {
    background: #ffffff;
  }
  .inner-tabs {
    display: flex;
    justify-content: space-around;
    height: 48px;
  }
  .tabs-head .iconfont {
    /* display: inline-block; */
    color: #737373;
    font-size: 25px;
    margin-top: 6px;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .item span {
    color: #666666;
    font-size: 15px;
  }
  .active .text {
    color: #60a1f6;
  }
  .active i.iconfont {
    color: #60a1f6;
  }
  .tabs-outer {
    position: relative;
    z-index: 10;
    background: #ffffff;
  }
  .tabs-content {
    position: absolute;
    background: #ffffff;
    left: 0;
    right: 0;
    top: 100%;
    height: 0px;
    overflow: auto;
    padding: 0px 20px;
    transition: height .3s;
  }
  .h {
    height: 240px;
  }


</style>