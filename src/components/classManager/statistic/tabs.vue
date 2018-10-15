
<template>
  <div class="tabs-box">
    <div class="tabs-item">
      <ul class="tabs-ul">
        <li v-for="(item, index) in tabsList" :key="index" class="item"  @click="changeInd(index, item.condition)" :class="[ind===index?'active':'']">
          <p class="p-item">{{item.name}}</p>
          <div class="border-outer">
            <span class="border" :class="[ind===index?'on':'']"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabsBox',
  props: {
  },
  data () {
    return {
      ind: 0,
      tabsList: []
    }
  },
  methods: {
    changeInd (index, condition) {
      this.ind = index
      // console.log(condition)
      this.$emit('condition', condition)
    },
    gettabsList () {
      let tabs = [
        {
          name: '按学生',
          condition: 'student'
        }
      ]
      this.tabsList = this.$managerBus.isHaveGroup === 'false' ? tabs : tabs.concat({name: '按小组', condition: 'group'})
      // console.log(this.tabsList)
    }
  },
  created () {
    this.gettabsList()
    // this.$emit('condition', 'student') // 默认按照学生
  }
}
</script>

<style scoped>
.tabs-item {
  padding: 13px 0px;
}
.tabs-box {
  background: #ffffff;
  position: relative;
  z-index: 11;
}
.tabs-ul {
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
}
.active {
  color: #60a1f6;
}
.on {
  background-color: #60a1f6;
}
.item {
  font-size: 15px;
  /* display: flex;
  justify-content: center; */
}
.border-outer {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}
span.border {
  display: block;
  width: 30px;
  height: 3px;
  /* background: #60a1f6; */
  border-radius: 1.5px;
}
</style>

