<template>
  <div class="name-search">
    <div class="search-box">
      <i class="iconfont search" @click="$emit('search', inputInfo)">&#xe60b;</i>
      <input
       type="text" 
       class="search-text"  
       :placeholder="holderValue" 
       v-model.trim="inputInfo"
      @keyup="$emit('search', inputInfo)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      >
      <!-- <span class="space"></span> -->
    </div>
  </div>
</template>
<script>
import '@/components/classManager/assets/css/comm.css'
export default {
  name: 'nameSearch',
  props: {
    holderValue: {
      type: String,
      default: '搜索姓名/学号'
    }
  },
  data () {
    return {
      inputInfo: ''
    }
  },
  computed: {
  }
}
</script>
<style scoped>
.name-search {
  padding-bottom: 10px;
}
.search-box {
  height: 30px;
 	background-color: #eeeff3;
  border-radius: 15px;
  padding-left: 12.5px;
  line-height: 30px;
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
  height: 30px;
  line-height: 30px;
  background-color: #eeeff3;
  border: none;
  outline: none;
}
.name-search .search, .search-text {
  float: left;
}
.search-box:after {
  display: block;
  content: '';
  clear: both;
}

</style>