<template>
  <div class="search">
    <i class="iconfont fl s-iocn">&#xe625;</i>
    <!-- <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M965.97 1013.76c13.65 13.65 34.13 13.65 47.78 0 13.65-13.65 13.65-34.13 0-47.78l-167.25-167.25c75.09-88.74 119.46-197.97 119.46-317.44C965.97 215.04 747.52 0 481.28 0 215.04 0 0 215.04 0 481.28s215.04 481.28 481.28 481.28c78.50 0 150.18-17.06 218.45-51.2 17.06-6.82 23.89-27.30 13.65-44.37-6.82-17.06-27.30-23.89-44.37-13.65-58.02 30.72-122.88 44.37-187.73 44.37-228.69 0-416.42-187.73-416.42-416.42 0-228.69 187.73-416.42 416.42-416.42 228.69 0 416.42 187.73 416.42 416.42 0 102.4-34.13 194.56-98.98 269.65-10.24 10.24-20.48 23.89-34.13 34.13-6.82 6.82-10.24 13.65-10.24 20.48 0 10.24 3.41 17.06 10.24 27.30" fill="currentColor"></path>
      </svg> -->
    <slot name="r-btn"></slot>
    <input ref="ipt" class="s-ipt" type="text" :placeholder="placeholder" v-model.trim="search">
  </div>
</template>

<script>
  import ExcuDelay from '@/modules/corejs/excu/excu-delay'
  let excuDelay = new ExcuDelay()
  export default {
    name: 'VSearch',
    props: {
      placeholder: String
    },
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
          this.$emit('search', v)
        }, 400)
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .search {
    position: relative;
    padding: 13px 0;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    .fl {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      font-size: 14px;
    }
    .s-iocn {
          font-size: 18px;
          color: #999;
          /* width: 14px;
      height: 16px;
      display:inline-block; */
         /* background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cpath%20d%3D%22M965.97%201013.76c13.65%2013.65%2034.13%2013.65%2047.78%200%2013.65-13.65%2013.65-34.13%200-47.78l-167.25-167.25c75.09-88.74%20119.46-197.97%20119.46-317.44C965.97%20215.04%20747.52%200%20481.28%200%20215.04%200%200%20215.04%200%20481.28s215.04%20481.28%20481.28%20481.28c78.50%200%20150.18-17.06%20218.45-51.2%2017.06-6.82%2023.89-27.30%2013.65-44.37-6.82-17.06-27.30-23.89-44.37-13.65-58.02%2030.72-122.88%2044.37-187.73%2044.37-228.69%200-416.42-187.73-416.42-416.42%200-228.69%20187.73-416.42%20416.42-416.42%20228.69%200%20416.42%20187.73%20416.42%20416.42%200%20102.4-34.13%20194.56-98.98%20269.65-10.24%2010.24-20.48%2023.89-34.13%2034.13-6.82%206.82-10.24%2013.65-10.24%2020.48%200%2010.24%203.41%2017.06%2010.24%2027.30%22%20fill%3D%22currentColor%22%3E%3C/path%3E") */
    }
    .s-ipt {
      width: 100%;
      outline: none;
      border: none;
      box-sizing: border-box;
      border-radius: 10px;
      padding: 0 10px 0 34px;
      font-size: 14px;
      &::placeholder {
        color: #999;
      }
    }
    .s-r-btn+.s-ipt{
      padding-right: 80px;
    }
  }
  .s-r-btn {
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
</style>
