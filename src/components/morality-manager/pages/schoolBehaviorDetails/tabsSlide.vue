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
            <i class="iconfont-morality" v-html="ind === index ? '&#xe602;' : '&#xe601;'"></i>
          </slot>
        </div>
      </div>
      <div class="tabs-content" :class="isShow?'h':''">
        <chooseClass @transClassId="transClassId" v-show="ind===0"></chooseClass>
        <displayItem v-show="ind!==0">
          <li class="display-item"
          v-for="(item, index) in contentList"
          :key="'content'+index"
          @click="trans(index, item.num || item.rule_id || item.classId)"
          :class="[indexObj[ind]===index?'active':'']"
          >
              <span class="time-s">{{item.text || item.rule_name}}</span>
              <i class="iconfont-morality yes">&#xe650;</i>
          </li>
        </displayItem>
      </div>
    </div>
  </div>
</template>
<script>
import VMask from '@/modules/mask/VMask'
import displayItem from '@/components/morality-manager/components/displayItem'
import chooseClass from '@/components/morality-manager/components/chooseClass'
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
    displayItem,
    chooseClass
  },
  props: {
    msg: {
      type: Array,
      default () { // 数组默认值用工厂函数
        return ['年级班级', '时间', '申诉状态', '制度']
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
    init () { // 初始化
      this.ind = -1
      this.isShow = false
    },
    transClassId (obj) {
      // console.log(obj)
      this.$emit('transClassId', obj)
    },
    changeInd (index, num) {
      this.init()
      // console.log(this.ind2)
      this.ind = index
      this.isShow = true
      if (index === 0) {
        // this.contentList = gradeList
        this.$emit('first')
      } else if (index === 1) {
        this.contentList = timeList
      } else if (index === 2) {
        this.contentList = appealSate
      } else if (index === 3) {
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
      if (this.indexObj[this.ind] !== index) { // 防止重复点击重复请求
        this.indexObj[this.ind] = index
        // console.log(this.indexObj)
        if (this.ind === 0) { // 根据班级
        } else if (this.ind === 1) { // 根据时间
          this.transNum({
            timeNum: num
          })
        } else if (this.ind === 2) { // 根据申诉状态
          // console.log(num)
          this.transNum({
            stateNum: num
          })
        } else if (this.ind === 3) { // 根据制度id
          this.transNum({
            ruleId: num
          })
        }
      }
    },
    getAllSystems () {
      this.getData('/palm/v2/rules/schoolrules?root=true&rule_id=0', true).then(data => {
        // console.log(data)
        this.systemList = data.data
        // console.log(data.data)
        // console.log(this.systemList)
      })
    }
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
      // console.log(obj)
      return obj
    }
  },
  created () {
    this.getAllSystems()
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
  .tabs-outer .iconfont-morality {
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
  .active i.iconfont-morality {
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
  .tabs-content .iconfont-morality {
    color: #ffffff;
    font-size: 15px;
  }
  .h {
    height: 240px;
  }


</style>