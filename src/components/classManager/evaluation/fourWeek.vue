<template>
  <div class="fourWeek">
    <div class="week-block">
      <div class="line">
        <ul class="line-ul">
          <li class="line-item" 
            v-for="(item, index) in weekData"
            :key="index"
          >{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
function addZero (val) {
  return val < 10 ? '0' + val : val
}
export default {
  name: 'fourWeek',
  props: {
    weekList: {
      type: [Array, String],
      default () {
        return [10, 12, 13, 14]
      }
    }
  },
  computed: {
    weekData () {
      let re = /^[\u4e00-\u9fa5](\d)-(\d)[\u4e00-\u9fa5]$/
      let start = parseInt(this.weekList.match(re)[1])
      let end = parseInt(this.weekList.match(re)[2])
      return [addZero(start), addZero(start + 1), addZero(start + 2), addZero(end)]
    }
  },
  created () {
    // console.log(this.weekData)
  }
}
</script>
<style scoped>
.week-block {
  width: 40px;
  height: 40px;
  border-radius: 5px;
	border: solid 1px #cccccc;
  /* display: flex; */
}
.line-ul {
  display: flex;
  flex-wrap: wrap;
  height: 40px;
}
.line-item:nth-child(2n - 1) {
  border-right: 1px solid #cccccc;
  flex: 1 1;
}
.line-item {
  box-sizing: content-box;
  font-size: 12px;
  color: #999999;
  width: 49.5%;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.line-item:nth-child(1) {
  border-bottom: 1px solid #cccccc;
}
.line-item:nth-child(2) {
  border-bottom: 1px solid #cccccc;
}
</style>
