<template>
  <div id="app">
    <a class="button" v-click="()=>{show=1}">弹出</a>
    <SelectPopup :show.sync="show" :type="0"></SelectPopup>
  </div>
</template>

<script>
  import SelectPopup from '@/components/assets-manage/pages/List/select-popup/SelectPopup'
  export default {
    data () {
      return {
        show: 1
      }
    },
    components: {
      SelectPopup
    },
    methods: {
      onClickShow () {
        this.show = 1
      }
    }
  }
</script>

<style>
  .button {
    display: block;
    padding: 12px 0;
    background: #ddd;
    border-radius: 6px;
    font-size: 18px;
    color: #333;
    text-align: center;
    margin: 10px;
  }
  .iconfont-assets {
    font-family: "iconfont-assets";
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
