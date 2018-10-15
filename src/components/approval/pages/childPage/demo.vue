<template>
  <ul>
    <li v-for="(item, i) in list" :key="i"  @click="$emit('action' ,item, i)" :class="{active: item.isSelect}">{{item.content}}</li>
  </ul>
</template>

<script>
export default {
  props: ['list']
}
</script>

<style scoped>
.v-enter,
.v-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.2s;
}

/* .v-enter {
  transform: scale(0);
}
.v-enter-active {
  transition: all 0.2s;
  transform: scale(0.8);
}
.v-enter-to {
  transform: scale(1);
}
.v-leave {
  transform: scale(0.9);
}
.v-leave-to {
  background: #0f0;
}
.v-leave-active {
  transition: all 3s;
  transform: scale(0.5);
  background: #f00;
} */

.box {
  border-radius: 10px;
  background: #ccc;
  position: fixed;
  width: 300px;
  height: 200px;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -100px;
  border: 1px #ccc solid;
}
li.active{
  background: #ccc;
}
</style>
