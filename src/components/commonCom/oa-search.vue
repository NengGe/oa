<template>
  <div class="oa-search" :class="{active: $attrs.hasOwnProperty('position')}">
    <div class="input-box">
      <div class="icon-box search">
        <span class="iconfont icon">&#xe625;</span>
      </div>
      <input class="ipt" type="text" v-model="inputData" :placeholder="placeholder" @input="searchAction">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '搜索'
    }
  },
  data () {
    return {
      inputData: '',
      timer: null
    }
  },
  watch: {
    keyword: {
      handler: function (newV) {
        this.inputData = newV
      },
      immediate: true
    }
  },
  methods: {
    searchAction () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('update:keyword', this.inputData)
      }, 500)
    },
    /*
    fn: 模糊匹配 return Boolean
    keyword   String            关键字
    target    [Object|String]   匹配对象
    attr      String            匹配属性（ps：当target为【Object】时，匹配的字符为target[attr]）
    */
    keywordTest (keyword, target, attr) {
      let targetStr = typeof target === 'string' ? target : target[attr]
      let keywordStr = keyword.trim().replace(/(\s)+/g, '.*') // 除去收尾空格 && 将 空格+ 替换成 '.*'
      let reg = new RegExp(keywordStr)
      return reg.test(targetStr)
    }
  }
}
</script>

<style lang="scss" scoped>
.oa-search {
}
.oa-search.active {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0px;
  right: 0px;
}
.input-box {
  margin: 10px 10px 6px;
  background-color: #eeeff3;
  border-radius: 15px;
  height: 30px;
  display: flex;
  box-sizing: border-box;
  top: 0;
  left: 10px;
  right: 10px;
  .icon-box.search {
    line-height: 30px;
    font-size: 16px;
    width: 44px;
    text-align: center;
    .icon {
      font-size: 14px;
    }
  }
  .ipt {
    background-color: inherit;
    flex: 1;
    border: 0;
    outline: none;
    margin-right: 22px;
  }
}
</style>
