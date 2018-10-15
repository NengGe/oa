<template>
  <div class="name-block">
    <div class="search-outer">
      <nameSearch></nameSearch>
    </div>
    <div class="name-head">
      <div class="head-inner">
        <div class="block">
          <span>学号</span>
        </div>
        <div class="block">
          <span>姓名</span>
        </div>
        <div class="block">
          <span>操作</span>
        </div>
      </div>
    </div>
    <div class="name-inner" ref="wrapper">
      <ul class="inner-ul content">
        <li class="item" 
          v-for="(item, index) in students"
          :key="index"
          @click="choice(index, item)"
        >
          <div class="block">
            <span>{{item.sno}}</span>
          </div>
          <div class="block">
            <span>{{item.user_name}}</span>
          </div>
          <div class="block">
            <span class="choice"  :class="{'active': objActive[index]}">选择</span>
          </div>
        </li>
        <!-- <li class="item" 
        >
          <div class="block">
            <span></span>
          </div>
          <div class="block">
            <span>hheeheh</span>
          </div>
          <div class="block">
            <span class="choice"  :class="{'active': objActive[index]}">选择</span>
          </div>
        </li> -->
      </ul>
    </div>
    <choose @click="$emit('click', choiceList)" :choiceList="choiceList" @close="close"></choose>
  </div>
</template>
<script>
import choose from '@/components/classManager/components/choose'
import nameSearch from '@/components/classManager/pages/nameSearch'
import BScroll from 'better-scroll'
export default {
  name: 'nameBlock',
  props: {
    students: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    choose,
    nameSearch
  },
  data () {
    return {
      choiceList: {},
      objActive: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      // console.log(this.$refs.wrapper)
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollX: false,
          scrollY: true,
          click: true,
          momentum: true,
          swipeTime: 3000
        })
      }
    })
  },
  methods: {
    close () { // 清空选取对象
      this.choiceList = this.objActive = {}
    },
    choice (index, item) {
      // this.objActive[index] = !this.objActive[index]
      this.$set(this.objActive, index, !this.objActive[index])
      if (this.objActive[index]) {
        this.$set(this.choiceList, index, item)
        // this.choiceList[index] = item
      } else {
        this.$delete(this.choiceList, index, item)
      }
      // console.log(this.choiceList)
    }
  },
  watch: {
    students () {
      if (this.scroll) {
        this.scroll.refresh()
      }
      // console.log(this.students)
    }
  }
}
</script>
<style scoped>
.name-inner {
  overflow-y: hidden;
  /* border-bottom: 1px solid #eae6e6; */
  height: 445px;
}
.search-outer {
   padding: 10px 14px 0px 14px;
}
.name-block {
  overflow-y: auto;
  margin-bottom: 100px;
  /* border-bottom: 1px solid #eae6e6; */
}
.item {
  display: flex;
  align-items: center;
  color: #999999;
  font-size: 14px;
  padding: 20px 0px;
}
.item .block {
  width: 33.33%;
  text-align: center;
}
.item span {
  display: inline-block;
}
.name-head {
  padding: 0px 14px 0px 14px;
}
.head-inner {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #333333;
  font-weight: bold;
  font-size: 15px;
  /* border-bottom: 1px solid #eae6e6; */
  padding: 7px 0px 10px 0px;
}
.item:nth-of-type(1) {
  /* color: #333333;
  font-weight: bold;
  font-size: 15px;
  padding: 0px 0px 17px 0px;
  border-bottom: 1px solid #eae6e6; */
}
.choice {
  padding: 6px 18px;
  border-radius: 12.5px;
  border: solid 1px #dddddd;
  /* text-align: center; */
}
.active {
  color: #88b8f8;
  border: 1px solid #88b8f8;

}
</style>