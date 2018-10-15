<template>
  <div class="system-item">
    <div class="block-wrapper">
      <div class="block"
      v-for="(item, index) in sysList"
      :key="'sysList'+index"
      >
        <div class="head">
          <span class="entry">{{item.rule_name}}</span>
          <span class="amount"></span>
        </div>
        <div class="content-box">
          <div class="content"  :class="flag[index] ? 'active': ''">
            <ul class="inner-ul">
              <li class="item" v-for="(ele, ind) in item.rule_items" :key="'ruleItems'+ind">
                <span class="left">{{ele.rule_item_name}}</span>
                <span class="right">{{ele.rule_item_count}}次</span>
              </li>
            </ul>
          </div>
          <div class="pullup">
            <i class="iconfont-morality" @click="showContent(index)" :class="[flag[index] ? '' : 'deg180']">
              &#xe61c;
            </i>
          </div>
        </div>
      </div>
    </div>
    <div class="no-data" v-show="!sysList.length">
      没有更多数据......
    </div>
  </div>
</template>
<script>
export default {
  name: 'systemItem',
  props: {
    sysList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      subList: [],
      flag: {}
    }
  },
  computed: {
    conHeight () {
      return {
        height: this.cHeight + 'px'
      }
    }
  },
  methods: {
    showContent (index) {
      // alert(index)
      this.subList = this.sysList[index].rule_items
      // console.log(this.subList)
      this.$set(this.flag, index, !this.flag[index])
      // this.cHeight = this.flag[index] ? this.subList.length * 40 + 2 : 0
      // this.flag = !this.flag
    }
  },
  watch: {
    sysList () {
      // this.sysList.forEach(ele => {
      //   let obj = {}
      //   obj.rule_items = ele.rule_items
      //   this.subList.push(obj.rule_items)
      // })
    }
  }
}
</script>
<style scoped>
.system-item {
  height: 570px;
  overflow: auto;
}
.system-item i.iconfont-morality {
  color: #dedede;
  font-size: 24px;
  transition: transform 0.3s;
}
.block {
  background: #ffffff;
  margin-top: 10px;
}
.head {
  padding: 0px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  border-bottom: 1px solid #cccccc;
}
.content {
  overflow: auto;
  transition: height 0.3s;
  height: 0px;
}
.active {
  height: 140px;
}
.content-box {
}
.pullup {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.entry {
  color: #555555;
  font-size: 15px;
  font-weight: bold;
}
.amount {
  color: #ff6600;
}
.item {
  /* height: 40px;
  line-height: 40px; */
  color: #aaaaaa;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding: 8px 0px;
}
.inner-ul {
  padding: 0px 14px;
  border-bottom: 1px solid #cccccc;
}
.deg180 {
  transform: rotateZ(180deg)
}
.no-data {
  text-align: center;
  padding: 10px 0px;
}
</style>