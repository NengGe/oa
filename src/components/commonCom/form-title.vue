<template>
  <div class="title-box bottom-one-px">
    <input type="text" :readonly="$attrs.hasOwnProperty('readonly')" v-model="inputData" :placeholder='placeholder' @change="$emit('update:content', inputData)">
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入标题'
    }
  },
  data () {
    return {
      inputData: ''
    }
  },
  watch: {
    content: {
      handler: function () {
        this.inputData = this.content
      },
      immediate: true
    }
  },
  created () {
    // this.inputData = this.content
  }
}
</script>

<style lang='scss' scoped>
.title-box {
  background: #fff;
  font-weight: bolder;
  // white-space: nowrap;
  // text-overflow: ellipsis;
  // overflow: hidden;
  padding: 30px 25px 13px;
  input {
    color: #666;
    width: 100%;
    font-weight: bold;
    line-height: 30px;
    border: 0;
    outline: none;
    &::placeholder {
      font-weight: normal;
      color: #ccc;
    }
  }
}
</style>
