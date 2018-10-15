<template>
  <div class="item-box" @click="$emit('click')">
    <div class="inner">
        <div class="left">
          {{htmlContent}}
        </div>
      <slot>
        <div class="right">
          <span class="right-s">五年级1班，</span>
          <span class="right-s">张南成</span>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'itemBox',
  props: {
    htmlContent: {
      type: String,
      default: '对象'
    }
  },
  created () {
    // console.log(this.htmlContent)
  }
}
</script>
<style scoped>
.item-box {
  margin-top: 10px;
  padding: 0px 16px;
  background: #ffffff;
}
.inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
}
.left {
  color: #333333;
  font-size: 15px;
  font-weight: bold;
  min-width: 40px;
  /* padding-right: 10px; */
  /* flex:2 1; */
}
.right {
  color: #999999;
  font-size: 15px;  
  padding-left: 10px;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; 
}
.right-s {
  display: inline-block;
  /* flex: 2 1; */
  /* margin-left: 5px; */
}
</style>