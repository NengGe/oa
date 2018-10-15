<template>
  <div class="my-app">
    <div class="app-box">
      <div class="name">
        <span class="title">常用应用
          <span class="tips" v-show="isEdite">（拖动应用调整顺序）</span>
        </span>
        <span class="btn" @click="$emit('edite')">{{isEdite?'完成':'编辑'}}</span>
      </div>
      <dragExchange attr='name' del :data="data" @action="(item, i)=>$emit('action', item, i)" :needHeadIcon="isEdite" @del="onDel"></dragExchange>
    </div>
  </div>
</template>
<script>
// import dragExchange from '@/modules/drag-exchange/drag-exchange'
import dragExchange from './drag-exchange'
// import allApp from './Whole/allApp'
export default {
  components: {
    dragExchange
  },
  props: {
    isEdite: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array
    }
  },
  data () {
    return {
      appName: '办公室',
      btnData: []
    }
  },
  methods: {
    action () {

    },
    onDel (item, i) {
      this.data.splice(i, 1)
    }
  }
}
</script>

<style lang='scss' scoped>
.my-app {
  background-color: #fff;
  // height: 282px;
}
.name {
  padding: 12px 20px;
  font-size: 15px;
  color: #666;
  font-weight: bold;
  display: flex;
  .title {
    flex: 1;
  }
  .tips {
    font-size: 14px;
    color: #ccc;
  }
}
.iconfont.rightTop {
  border: 1PX solid #fff;
  color: #fff;
  background: #ff3a4d;
  right: -5px;
  top: -5px;
  line-height: 23px;
}
</style>
