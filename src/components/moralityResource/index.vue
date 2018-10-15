<template>
  <div class="resource-wrapper">
    <app></app>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import app from '@/app'
export default {
  name: 'resourceWrapper',
  components: {
    app
  },
  watch: {
    // '$route': function (to, from) {
    //   console.log(to)
    //   console.log(from)
    //   console.log(this.$router)
    // }
  }
}
</script>