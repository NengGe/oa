<template>
  <ul class="list">
    <li class="item" v-for="(item, i) in data" :key="i">
      <div class="img-box">
        <img class="img" src="@/assets/imgs/ava3.png">
      </div>
      <div class="name">{{item.user_name}}</div>
      <div class="btn-r clickActive" v-if="needBtn" @click="$emit('urgeAction',item, i )">催办</div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: Array,
    needBtn: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  margin-top: 12px;
  background: #fff;
}
.item {
  display: flex;
  height: 41px;
  padding: 18px 18px;
}
.img {
  width: 41px;
  height: 41px;
}
.name {
  padding-left: 16px;
  flex: 1;
  line-height: 41px;
}
.btn-r {
  align-self: center;
  width: 60px;
  height: 20px;
  line-height: 20px;
  border-radius: 10px;
  color: #88b8f8;
  font-size: 13px;
  border: 1PX solid #88b8f8;
  box-sizing: border-box;
  text-align: center;
}
</style>
