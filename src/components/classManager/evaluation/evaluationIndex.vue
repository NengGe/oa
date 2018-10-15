<template>
  <div class="evaluation-index">
    <app></app>
    <bottomNav @goRouter="goRouter"></bottomNav>
    <bg></bg>
  </div>
</template>
<script>
import bottomNav from '@/components/classManager/components/bottomNav'
import bg from '@/components/classManager/components/bg'
import app from '@/app'
export default {
  name: 'evaluationIndex',
  components: {
    bottomNav,
    app,
    bg
  },
  methods: {
    goRouter (index) {
      if (index === 0) {
        this.$router.replace({path: 'acordStudent', query: {dimension_type: 1}})
      } else if (index === 1) {
        this.$router.replace({path: 'acordGroup', query: {dimension_type: 2}})
      }
    }
  }
}
</script>
<style scoped>
.evaluation-index /deep/ .iconfont {
  font-family: "iconfont-morality";
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
