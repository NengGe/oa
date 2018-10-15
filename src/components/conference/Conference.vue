<template>
  <div>
    <div class="bg"></div>
    <App class="cmain" :bus="bus"></App>
  </div>
</template>

<script>
  import App from '@/app'
  export default {
    props: ['bus'],
    components: {
      App
    }
  }
</script>

<style scoped>

  .bg{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f0f8fc;
  }
  .cmain {
    position: relative;
  }


</style>
