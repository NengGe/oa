<template>
  <div class="select-box" :class="{active: isShowSelectBox}">
    <!-- 年 -->
    <div class="select-year">
      <span class="sub icon" @click="yearSubAdd(-1)">‹</span>
      <span class="year">{{currYear}}</span>
      <span class="add icon" @click="yearSubAdd(1)">›</span>
    </div>
    <!-- 月 -->
    <div class="select-month">
      <ul class="monthList cf">
        <li class="month" :class="{active: parseInt(currMonth)===i+1}" @click="monthActive(i)" v-for="(month, i) in monthList" :key="'monthList'+i">{{month}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowSelectBox: false
    }
  },
  methods: {
    yearSubAdd (p) {
      this.currYear += p
    }
  }
}
</script>


<style lang='scss' scoped>
.select-box {
  transition: height 0.3s;
  height: 0px;
  overflow: hidden;
  &.active {
    height: 164px;
  }
  .select-year {
    color: #12b7f5;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
    .icon {
      padding: 0 28px;
      font-size: 30px;
      vertical-align: sub;
    }
  }
  .select-month {
    .monthList {
      .month {
        color: #12b7f5;
        width: 21%;
        margin-left: 2%;
        margin-right: 2%;
        height: 32px;
        margin-top: 4px;
        margin-bottom: 4px;
        float: left;
        line-height: 32px;
        text-align: center;
        font-size: 16px;
        border-radius: 6px;
        &.active {
          background-color: #b4e3fd;
          color: #fff;
        }
      }
    }
  }
}
</style>
