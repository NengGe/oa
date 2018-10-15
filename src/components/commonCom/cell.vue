<template>
  <div class="item-box row cf bottom-one-px">
    <div class="item-left l">{{title}}</div>
    <div class="item-right r" :class="{active: content}">
      <!-- 普通文本 -->
      <div class="text ep" v-if="$attrs.hasOwnProperty('text')" @click="$emit('action')">{{content}}</div>
      <!-- 可点击文本 -->
      <div class="ep" v-else-if="$attrs.hasOwnProperty('button')" @click="$emit('action')">
        <span>{{content || '请选择'}}</span>
        <i class="iconfont">&#xe616;</i>
      </div>
      <!-- 输入框 -->
      <div v-else-if="$attrs.hasOwnProperty('input')">
        <input :type="type" v-model="inputData" :placeholder='placeholder' @input="$emit('update:content', inputData)">
      </div>
      <slot name='right'></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    content: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data () {
    return {
      inputData: ''
    }
  },
  watch: {
    content (newV) {
      if (this.$attrs.hasOwnProperty('input')) {
        this.inputData = newV
      }
    }
  },
  created () {
    if (this.$attrs.hasOwnProperty('input')) {
      this.inputData = this.content
    }
  }
}
</script>

<style lang='scss' scoped>
.row {
  background: #fff;
  font-size: 15px;
  height: 54px;
  line-height: 52px;
  padding: 0 10px 0 15px;
  display: flex;
  .l {
    color: #666;
    font-weight: bold;
    padding-right: 15px;
  }
  .r {
    overflow: hidden;
    // display: flex;
    text-align: right;
    flex: 1;
    color: #ccc;
    // font-size: 14px;
    &.active {
      color: #333;
    }
  }
}
.text {
  padding-right: 17px;
}
input {
  padding-right: 17px;
  text-align: right;
  outline: none;
  height: 40px;
  border: none;
  &::placeholder {
    color: #ccc;
    font-size: 14px;
    text-align: right;
  }
}
.row:last-child::after {
  border: 0;
}
.iconfont {
  vertical-align: middle;
}
</style>
