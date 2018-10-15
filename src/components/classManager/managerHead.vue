<template>
  <div class="index-head">
    <div class="big-circle">
      <div class="inner-circle" @click="toEntry">
        <div class="inner-box">
          <i class="iconfont kaoqin">&#xe767;</i>
          <p class="entry-p">点击录入</p>
        </div>
      </div>
    </div>
    <!-- 侧边栏 -->
    <!-- <div class="sidebar">
      <div class="topbar">
        <div class="person-icon">
          <router-link to="">
            <i class="iconfont person">&#xe666;</i>
          </router-link>
        </div>
      </div>
      <div class="bottombar">
        <div class="scan-icon">
          <router-link to="">
            <i class="iconfont scan">&#xe646;</i>
          </router-link>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>

export default {
  name: 'indexHead',
  data () {
    return {
    }
  },
  methods: {
    toEntry () {
      this.$router.push({path: '/classManagerIndex/entryIndex'})
    }
  }
}
</script>

<style scoped>
.index-head {
  position: relative;
  height: 208.5px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.big-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 70px;
  background-color: #e7f0ff;
  /* opacity: 0.08; */
  box-shadow: 0px 0.5px 13px 0px rgba(2, 10, 19, 0.08);
}
.inner-circle {
  display: flex; /*flex还能这样配合absolute的*/
  justify-content: center;
  align-items: center;
  /* position: absolute; */
  width: 114px;
  height: 114px;
  border-radius: 57px;
  background-color: #69a0fa;
}
.index-head .kaoqin {
  display: inline-block;
  width: 30px;
  height: 32px;
  color: #ffffff;
}
.inner-box {
  text-align: center;
}
.entry-p {
  width: 50px;
  height: 11.5px;
  font-family: PingFang-SC-Heavy;
  font-size: 12px;
  color: #ffffff;
  margin-top: 10.5px;
}
.sidebar {
  position: absolute;
  width: 24px;
  height: 104px;
  background-color: #9cc2ff;
  box-shadow: 0px 1.5px 3.5px 0px rgba(2, 10, 19, 0.15);
  border-radius: 10px 0px 0px 10px;
  opacity: 0.8;
  right: 0px;
  top: 9.5px;
  padding: 0px 8px;
}
.topbar {
  height: 51px;
  border-bottom: 0.5px solid #ffffff;
}
.bottombar {
  height: 52px;
  & .scan-icon {
    width: 21.5px;
    height: 22px;
    text-align: center;
    /* display: table-cell;
    vertical-align: middle; */
    line-height: 22px;
  }
}
.topbar,
.bottombar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottombar i.iconfont {
  display: inline-block;
  font-size: 18px;
}
.person-icon {
  width: 24px;
  height: 24px;
  /* background-color: #ffffff; */
  /* border-radius: 12px; */
  text-align: center;
  overflow: hidden;
  & i.person {
    display: inline-block;
    font-size: 18px;
    /* background-color: #ffffff; */
    color: #ffffff;
    margin-top: 4px;
    /* border-radius: 8px; */
  }
}
.person-icon a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>