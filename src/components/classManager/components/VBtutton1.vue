<template>
  <a href="javascript:;" class="btn" @click="$emit('click')">
    <slot>
      <span class="acord">按宿舍</span>
    </slot>
    <toIcon :size="13" wordColor="blue0" class="toIcon"></toIcon>
  </a>
</template>
<script>
import toIcon from '@/components/classManager/components/toIcon'
export default {
  name: 'VButton1',
  components: {
    toIcon
  }
}
</script>
<style scoped>
.btn {
  display: flex;
  color: #88b8f8;
  padding: 5px 8px;
  border: 1px solid #88b8f8;
  border-radius: 4px;
  font-size: 0px;
  width: 60px;
  justify-content: center;
  align-items: center;
  /* font-weight: bold; */
}
.acord {
  display: inline-block;
  font-size: 13px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>

