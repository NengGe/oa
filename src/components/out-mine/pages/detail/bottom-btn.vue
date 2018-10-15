<template>
  <div class="bottom-btn top-one-px">
    <div v-if="!$attrs.hasOwnProperty('admin')" class="btn blue clickActive" @click="$emit('finish')">完成</div>
    <div v-if="$attrs.hasOwnProperty('admin')" class="btn  clickActive" @click="$emit('edit')">编辑</div>
    <div v-if="$attrs.hasOwnProperty('admin')" class="btn blue clickActive" @click="$emit('end')">关闭任务</div>
  </div>
</template>

<style lang="scss" scoped>
.bottom-btn {
  display: flex;
  text-align: center;
  height: 54px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
}
.btn {
  font-weight: bold;
  flex: 1;
  line-height: 54px;
  border-left: 1PX solid #ddd;
  color: #666;
}
.btn:first-child{
  border-left: 0;
}
.blue {
  color: #88b8f8;
}
</style>

