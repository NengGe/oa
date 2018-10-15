<template>
  <div class="search">
    <i class="iconfont-assets fl">&#xe620;</i>
    <input ref="ipt" class="ipt" type="text" placeholder=" 请输入搜索内容" v-model.trim="search">
    <div class="fr"><i class="iconfont-assets i">&#xe629;</i></div>
  </div>
</template>

<script>
  import ExcuDelay from '@/modules/corejs/excu/excu-delay'
  let excuDelay = new ExcuDelay()
  export default {
    name: 'search',
    data () {
      return {
        search: ''
      }
    },
    methods: {
      // 清空，不触发更新
      clean () {
        this.$refs.ipt.value = ''
      }
    },
    watch: {
      search (v) {
        excuDelay.excu(() => {
          this.$emit('loadData', v)
        }, 400)
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .search {
    position: relative;
    margin: 20px 10px 15px;
    padding: 13px 0;
    background-color: #fff;
    border-radius: 10px;
    .fl {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      font-size: 14px;
    }
    .ipt {
      width: 100%;
      outline: none;
      border: none;
      box-sizing: border-box;
      border-radius: 10px;
      padding: 0 80px 0 30px;
      font-size: 14px;
    }
    .fr {
      .i {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 18px;
        background-color: #f0f8ff;
        padding: 10.5px 15px;
        border-left: 1PX solid #ccc;
        border-radius: 0 10px 10px 0;
      }
    }
  }
</style>
