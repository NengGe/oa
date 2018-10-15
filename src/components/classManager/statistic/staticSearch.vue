<template>
<div class="static-search">
  <VMask v-show="isShow" @click="isShow=!isShow"></VMask>
  <div class="name-search">
    <div class="search-box">
      <i class="iconfont search">&#xe60b;</i>
      <input type="text" class="search-text"  placeholder="搜索姓名/学号">
      <span class="space"></span>
      <div class="choice-time" @click="isShow=!isShow" :class="{'bgon': isShow}">
        <p class="time-text">选择时间</p>
        <i class="iconfont">&#xe601;</i>
      </div>
    </div>
    <div class="time-content" :class="[isShow?'h':'']">
      <ul class="time-ul">
        <li
         class="time-item" v-for="(item, index) in timeList" 
         :key="index" 
         :class="[index===ind?'active':'']"
         @click="changeInd(index, item.num)"
        >
          <span class="time-s">{{item.text}}</span>
          <i class="iconfont yes">&#xe650;</i>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
import VMask from '@/modules/mask/VMask'
import '@/components/classManager/assets/css/comm.css'
export default {
  name: 'staticSearch',
  components: {
    VMask
  },
  data () {
    return {
      isShow: false,
      ind: -1,
      timeList: [
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
    }
  },
  methods: {
    changeInd (index, num) {
      this.isShow = !this.isShow
      if (this.ind !== index) {
        this.ind = index
        this.$emit('time', num)
      }
    }
  }
}
</script>
<style scoped>
.static-search {
}
.name-search {
  padding: 0px 16px 11px 16px ;
  /* margin-top: 11px; */
  position: relative;
  z-index: 10;
  background-color: #ffffff;
  /* padding-bottom: 10px; */
}
.search-box {
 	background-color: #eeeff3;
  height: 30px;
  border-radius: 15px;
  padding-left: 12.5px;
  position: relative;
}
.name-search i.search {
  display: inline-block;
  font-size: 18px;
  vertical-align: middle;
}
.search-text {
  vertical-align: middle;
  margin-left: 8px;
  width: 80%;
  background-color: #eeeff3;
  border: none;
  outline: none;
}
.choice-time {
  position: absolute;
  top: 0;
  right: 0;
  height: 30px;
  width: 90px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: #aaaaaa;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.choice-time i.iconfont {
  font-size: 22px;
}
.bgon {
  background-color: #88b8f8; 
}
.time-content {
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  /* width: 100%; */
  /* box-sizing: content-box; */
  z-index: 10;
  padding: 0px 20px;
  background: #ffffff;
  /* border-top: 1px solid #888888; */
  height: 0px;
  overflow: auto;
  transition: height .3s;
}
.time-content i.iconfont {
  font-size: 16px;
  /* color: blue; */
  color: #ffffff;
}
.time-item {
  padding: 19px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.h {
  height: 240px;
}
.active .time-s, .active i.iconfont {
  color: #88b8f8;
}

</style>