<template> 
  <div class="tabs-head">
    <VMask @click="init" v-show="isShow"></VMask>
    <div class="tabs-outer">
      <screenTabs @changeInd="changeInd" :msg="msg"></screenTabs>
      <!-- role=1  -->
      <div class="tabs-content" :class="isShow?'h':''" v-if="role===1">
        <chooseGrade @transGradeId="transGradeId" v-show="ind===0"></chooseGrade>
        <displayItem v-show="ind!==0">
          <li class="display-item"
          v-for="(item, index) in contentList"
          :key="'content'+index"
          @click="trans(index, item.num || item.rule_id)"
          :class="[indexObj[ind]===index?'active':'']"
          >
              <span class="time-s">{{item.text || item.rule_name}}</span>
              <i class="iconfont-morality yes">&#xe650;</i>
          </li>
        </displayItem>
      </div>
      <!-- role=2 -->
      <div class="tabs-content" :class="isShow?'h':''" v-else-if="role===2">
        <displayItem>
          <li class="display-item"
          v-for="(item, index) in contentList"
          :key="'content'+index"
          @click="trans(index, item.num || item.rule_id)"
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
import chooseGrade from '@/components/morality-manager/components/chooseGrade'
import screenTabs from '@/components/morality-manager/components/screenTabs'
// import session from '@/components/morality-manager/assets/js/session.js'
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
export default {
  name: 'tabsHead',
  components: {
    VMask,
    displayItem,
    chooseGrade,
    screenTabs
  },
  props: {
    msg: {
      type: Array
    }
  },
  data () {
    return {
      text: '',
      ind: -1,
      isShow: false,
      contentList: [],
      systemList: [],
      indexObj: {},
      role: 1
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
    transGradeId (obj) {
      this.$emit('transGradeId', obj)
    },
    changeInd (index, num) {
      this.init()
      // console.log(this.ind2)
      this.ind = index
      this.isShow = true
      if (this.role === 1) {
        if (index === 0) {
          // this.contentList = gradeList
        } else if (index === 1) {
          this.contentList = this.systemList
        } else if (index === 2) {
          this.contentList = timeList
        }
      }

      if (this.role === 2) {
        if (index === 0) {
          this.contentList = this.systemList
        } else if (index === 1) {
          this.contentList = timeList
        }
      }
      this.$emit('firstClick')
      // alert(index)
    },
    transNum (obj) {
      // console.log(obj)
      this.$emit('transNum', obj)
    },
    trans (index, num) {
      this.isShow = !this.isShow
      if (this.indexObj[this.ind] !== index) {
        this.indexObj[this.ind] = index
        if (this.role === 1) {
          if (this.ind === 0) { // 根据年级
          } else if (this.ind === 1) { // 根据制度
            this.transNum({
              ruleId: num
            })
          } else if (this.ind === 2) { // 根据时间
            // console.log(num)
            this.transNum({
              timeNum: num
            })
          }
        }

        if (this.role === 2) {
          if (this.ind === 0) {
            this.transNum({
              ruleId: num
            })
          } else if (this.ind === 1) {
            this.transNum({
              timeNum: num
            })
          }
        }
      }
    },
    getAllSystems () {
      // if (this.rulesData) {
      //   this.systemList = this.rulesData.schoolAllRules
      // } else {
      this.getData('/palm/v2/rules', true).then(data => {
        // console.log(data)
        this.systemList = data.schoolAllRules
        // console.log(this.systemList)
      })
      // }
    },
    getIndexObj () { // 保存每个tabs的索引
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
    this.indexObj = this.getIndexObj()
    this.role = this.$moralityBus.role
  },
  computed: {
    itemLen () {
      return Array.apply(null, new Array(this.msg.length)) // 创建固定长度空数组
    }
  }
}
</script>
<style scoped>
  .tabs-head {
    background: #ffffff;
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
    border-top: 1px solid #cccccc;
  }
  .active i.iconfont-morality {
    color: #60a1f6;
  }

</style>