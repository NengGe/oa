<template>
  <span href="javascript:;" class="app-btn" v-if="state!=='0'">
    {{states[state]}}
  </span>
</template>
<script>
export default {
  name: 'appBtn',
  props: {
    state: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      states: {
        '0': '未申诉',
        '1': '申诉中',
        '2': '已申诉',
        '4': '驳回'
      }
    }
  }
}
</script>
<style scoped>
  .app-btn {
    display: inline-block;
    border: solid 1px #88b8f8;
    width: 60px;
    height: 20px;
    line-height: 20px;
    /* padding: 4px 0px; */
    font-size: 13px;
    text-align: center;
    border-radius: 10px;
    color: #88b8f8;
  }
</style>