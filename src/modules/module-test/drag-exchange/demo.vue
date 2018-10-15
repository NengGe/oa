<template>
  <div class="box">
    <dragExchange/>
  </div>
</template>

<script>
import dragExchange from './drag-exchange'
export default {
  components: {
    dragExchange
  }
}
</script>

<style scoped>
  .box{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #f7f7f9;
  }
</style>
