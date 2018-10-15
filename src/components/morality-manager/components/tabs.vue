
<template>
  <div class="tabs-box">
    <div class="tabs-item">
      <ul class="tabs-ul">
        <li v-for="(item, index) in tabsList" :key="index" class="item"  @click="changeInd(index)" :class="[ind===index?'active':'']">
          <p class="p-item">{{item}}</p>
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
    tabsList: {
      type: Array,
      default () {
        return ['按学生', '按小组']
      }
    }
  },
  data () {
    return {
      ind: 0
    }
  },
  methods: {
    changeInd (index) {
      this.ind = index
      this.$emit('getTabsIndex', index)
    }
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
.p-item { 
  text-align: center;
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

