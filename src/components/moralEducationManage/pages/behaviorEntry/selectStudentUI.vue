<template>
  <div class="selectStudent">
    <div class="row">
      <div class="l">对象</div>
      <div class="r">
        <div class="btn" @click="$emit('byDorm')">
          <span class="text">按宿舍</span>
          <i class="iconfont">&#xe616;</i>
        </div>
        <div class="btn" @click="$emit('byClass')">
          <span class="text">按班级</span>
          <i class="iconfont">&#xe616;</i>
        </div>
      </div>
    </div>
    <div class="personName">
      <span class="name">{{text}}</span>
      <!-- <span class="name">{{dormStr}}</span>
      <span class="name" v-for="(item, i) in studentList" :key="i">{{item.user_name}}</span> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    classStr: {
      type: String,
      default: ''
    },
    dormStr: {
      type: String,
      default: ''
    },
    studentList: {
      type: Array
    }
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.selectStudent {
  background: #fff;
}
.row {
  background: #fff;
  font-size: 15px;
  height: 54px;
  line-height: 52px;
  padding: 0 10px 0 15px;
  display: flex;
  justify-content: space-between;
}
.l {
  color: #666;
  font-weight: bold;
}
.r {
  text-align: right;
  display: flex;
  align-items: center;
}
.r .btn {
  width: 69px;
  height: 26px;
  line-height: 26px;
  border-radius: 4px;
  border: solid 1px #88b8f8;
  color: #88b8f8;
  font-size: 15px;
  margin-left: 17px;
  padding-left: 5px;
}
.personName {
  text-align: right;
  font-size: 14px;
  padding-right: 10px;
  line-height: 24px;
}
.personName .name {
  margin-left: 5px;
}
</style>
