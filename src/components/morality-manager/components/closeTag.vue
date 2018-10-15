<template> 
  <div class="close-box" @click="$emit('close')">
    <i class="iconfont-morality closeTag" :style="fontSize">&#xe723;</i>
  </div>
</template>
<script>
// import sureBtn from '@/components/teacher-mobile/moralityManage/components/sureBtn'
export default {
  name: 'closeTag',
  props: {
    size: {
      type: Number,
      default: 32
    }
  },
  data () {
    return {

    }
  },
  computed: {
    fontSize () {
      return {
        fontSize: this.size + 'px'
      }
    }
  }
}
</script>
<style scoped>
  .close-box {
    display: inline-block;
    border-radius: 50%;
    background: red;
    width: 16px;
    height: 16px;
    text-align: center;
    line-height: 16px;
  }
  .close-box i.iconfont-morality {
    /* background: red; */
    /* font-weight: bold; */
    font-weight: 600;
    color: #ffffff;
  }

</style>