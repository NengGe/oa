<template>
  <div class="list-rule">
    <ul class="list">
      <li class="item" v-for="(item, i) in list" :key="i" :class="{active: selectData.hasOwnProperty(item.item_id)}" @click="$emit('action' ,item, i)">
        <div class="content">{{item[attr]}}</div>
        <i class="icon iconfont" v-show="!item.isLast">&#xe616;</i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    attr: {
      type: String,
      default: 'content'
    },
    selectData: {
      type: Object
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.item {
  display: flex;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin: 12px;
  height: 60;
  line-height: 58px;
  padding: 0 5px;
}
.item.active {
  border-color: #88b8f8;
  color: #88b8f8;
}
.content {
  flex: 1;
  text-align: center;
}
</style>


