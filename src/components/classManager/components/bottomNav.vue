<template>
  <div class="bottom-nav">
    <div class="bottom-bar-inner">
      <slot>
        <div 
          class="bottom-item"
          v-for="(item, index) in bottomList"
          :key="'bottomBar'+index"
          @click="acord(index)"
          :class="[ind===index?'on':'']"
        >
        <div class="bottom-item-box">
          <div class="top">
            <i class="iconfont" v-html="item.icon"></i>
          </div>
          <div class="acord-text">{{item.text}}</div>
        </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bottomNav',
  props: {
    bottomList: {
      type: Array,
      default () {
        return [
          {
            text: '按学生',
            icon: '&#xe607;'
          },
          {
            text: '按小组',
            icon: '&#xe608;'
          }
        ]
      }
    }
  },
  data () {
    return {
      ind: 0
    }
  },
  methods: {
    acord (index) {
      this.ind = index
      this.$emit('goRouter', index)
    }
  }
}
</script>
<style scoped>
.bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
}
.bottom-nav i.iconfont {
  font-size: 25px;
}
.bottom-bar-inner {
  height: 54px;
  border-top: 1px solid #dddddd;  
  display: flex;
}
.bottom-item {
  flex: 1 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaaaaa;
}
div.bottom-item:first-of-type {
  border-right:1px solid#dddddd;
}
.on {
  color: #88b8f8;
}
.top, .acord-text {
  text-align: center;
}
.acord-text {
  font-size: 12px;
}
</style>
