<template>
  <div class="switch-btn">
    <div class="btn" @click="btnAction(item, i)" v-for="(item, i) in data" :key="i" :style="{background:item.bg}" :class="[`active${i+1}`,{active:flag}]">
      <span class="text">{{item.content}}</span>
    </div>
    <div class="btn switch iconfont" @click="flag=!flag" :class="{active:flag}">&#xe61a;</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flag: false,
      data: [
        { content: '新建外出', bg: '#fbd270', routeName: 'newbuild_out_admin' },
        { content: '新建会议', bg: '#d595d1', routeName: 'ConferenceCreate' },
        { content: '新建任务', bg: '#62c6ff', routeName: 'newtask' }
      ]
    }
  },
  methods: {
    btnAction (item, i) {
      this.$router.push({ name: item.routeName, query: { isWork: true } })
    }
  }
}
</script>

<style scoped>
.switch-btn {
  width: 51px;
  height: 51px;
  position: fixed;
  right: 15px;
  bottom: 44px;
}
.btn {
  opacity: 0;
  width: 51px;
  height: 51px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.3s;
  box-shadow: 1px 1px 20px 0px rgba(2, 34, 64, 0.1);
}
.text {
  width: 29px;
}
.switch {
  opacity: 0.8;
  background: #fff;
  font-size: 31px;
  color: #aaa;
  /* border: 2PX solid #FFF; */
}
.switch.active {
  transform: rotate(-135deg);
}

.active.active1 {
  opacity: 1;
  top: -209px;
}
.active.active2 {
  opacity: 1;
  top: -142px;
}
.active.active3 {
  opacity: 1;
  top: -76px;
}
</style>


