<template>
  <div class="buttom-operation-box top-one-px">
    <div class="keyboart-btn">
      <span class="iconfont-approval">&#xe7be;</span>
    </div>
    <div class="input-box">
      <div class="inputContent-box">
        <input type="text" v-model="inputText">
        <span class="sendText" :class="{ active: isCanSend }"  @click="sendAction">发送</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputText: ''
    }
  },
  computed: {
    // 输入框是否为空
    isCanSend: function () {
      if (this.inputText.length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    sendAction () {
      if (!this.isCanSend) {
        return false
      }
      this.$emit('sendOpinionAction', this.inputText)
      this.inputText = ''
    }
  }
}
</script>

<style scoped>

  .buttom-operation-box{
    width: 100%;
    height: 54px;
    display: flex;
    line-height: 54px;
    text-align: center;
    font-size: 15px;
    position: fixed;
    bottom: 0px;
    background: #fff;
    font-weight: bold;
  }
  .buttom-operation-box .keyboart-btn{
    width: 69px;
    color: #88b8f8;
    position: relative;
    font-weight: normal;
    display: inline-block
  }
  .buttom-operation-box .keyboart-btn .iconfont-approval{
    transform: rotate(180deg);
    display: inline-block;
  }
  .buttom-operation-box .keyboart-btn:after{
    content: '';
    display: block;
    width: 1PX;
    height: 100%;
    border-right: 1PX #ddd solid;
    position: absolute;
    right: -1PX;
    /* background-color: #f00; */
    top: 0;
    transform: scaleX(0.5)
  }
  .buttom-operation-box .keyboart-btn>span{
     font-size: 26px;
  }
  .buttom-operation-box .input-box{
    flex: 1;
    padding: 8px 21px 8px 18px;
  }
  .buttom-operation-box .input-box .inputContent-box{
    border-radius: 4px;
    height: 36px;
    border: #ddd solid 1PX;
    padding: 0 5px;
    display: flex;
  }
  .buttom-operation-box .input-box .inputContent-box input{
    outline:none;
    flex: 1;
    border: none;
    padding-right: 3px;
  }
  .buttom-operation-box .input-box .inputContent-box .sendText{
    width: 40px;
    height: 28px;
    line-height: 28px;
    background-color: #ddd;
    color: #fff;
    font-weight: normal;
    border-radius: 3px;
    align-self: center;
    display: inline-block;
    font-size: 12px;
  }
  .buttom-operation-box .input-box .inputContent-box .sendText.active{
    background-color:#88b8f8;
  }



</style>
