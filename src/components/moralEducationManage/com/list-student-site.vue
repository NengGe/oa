<template>
  <div class="list-student-site">
    <div class="dais-box">
      <div class="dais"></div>
      <span class="text">讲台</span>
    </div>
    <ul class="list cf">
      <li class="item" v-for="(item, i) in 40" :key="i"></li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    getSelectList () {
      return []
    }
  }
}
</script>


<style scoped>
.list-student-site {
  flex: 1;
}
.dais-box {
  margin: auto;
  width: 80px;
  height: 30px;
  position: relative;
  text-align: center;
  margin-top: 15px;
}
.dais {
  position: absolute;
  height: 0;
  width: 50px;
  border-top: 30px solid #88b8f8;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  z-index: -1;
}
.dais-box .text {
  line-height: 30px;
  color: #fff;
}
.list {
  padding: 10px;
}
.item {
  border: solid 1px #3d3d3d;
  float: left;
  width: 10.5%;
  height: 20px;
  background: #cbcbcb;
  margin: 12px 1%;
  box-sizing: border-box;
  border-radius: 3px;
}
</style>

