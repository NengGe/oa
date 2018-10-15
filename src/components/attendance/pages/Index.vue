<template>
  <div class="attendance">
    <button @click="btnAction">考勤历史</button>
  </div>
</template>

<script>
export default {
  methods: {
    btnAction () {
      this.$router.push({name: 'clockHistory'})
    }
  }
}
</script>

