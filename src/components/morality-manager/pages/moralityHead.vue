<template>
  <div class="index-head">
    <div class="big-circle">
      <div class="inner-circle" @click="toEntry">
        <div class="inner-box">
          <i class="iconfont-morality kaoqin">&#xe767;</i>
          <p class="entry-p">点击录入</p>
        </div>
      </div>
    </div>
    <!-- 侧边栏 -->
    <div class="sidebar">
      <div class="addbar" v-if="role==='repeatRole'">
        <div class="changePage" @click="$emit('changePage')">
          <i class="iconfont-morality">&#xe60d;</i>
        </div>
      </div>
      <div class="topbar">
        <div class="person-icon">
          <router-link :to="{path: 'behaviroEntryIndex/1'}">
            <i class="iconfont-morality person">&#xe666;</i>
          </router-link>
        </div>
      </div>
      <div class="bottombar">
        <div class="scan-icon">
          <router-link :to="{path: 'behaviroEntryIndex/2'}">
            <i class="iconfont-morality scan">&#xe646;</i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'indexHead',
  props: {
    role: String
  },
  data () {
    return {
    }
  },
  methods: {
    toEntry () {
      this.$router.push({ path: 'behaviroEntryIndex/3' })
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
  width: 140px;
  height: 140px;
  border-radius: 70px;
  background-color: #e7f0ff;
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
.index-head i.kaoqin {
  display: inline-block;
  font-size: 32px;
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
  /* height: 104px; */
  background-color: #9cc2ff;
  box-shadow: 0px 1.5px 3.5px 0px rgba(2, 10, 19, 0.15);
  border-radius: 10px 0px 0px 10px;
  opacity: 0.8;
  right: 0px;
  top: 9.5px;
  padding: 0px 8px;
}
.topbar,
.addbar {
  border-bottom: 0.5px solid #ffffff;
}
.bottombar {
  &.scan-icon {
    width: 21.5px;
    height: 22px;
    text-align: center;
    line-height: 22px;
  }
}
.topbar,
.bottombar,
.addbar {
  padding: 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sidebar i.iconfont-morality {
  display: inline-block;
  font-size: 18px;
}
.person-icon {
  & i.person {
    font-size: 18px;
    color: #ffffff;
    margin-top: 4px;
  }
}
.person-icon a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
