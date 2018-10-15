<template>
  <div class="buttom-operation-box top-one-px">
    <div class="keyboart-btn" @click="keyboartAction">
      <span class="iconfont-approval" :class="{active: keyboartActive}">&#xe7be;</span>
    </div>
    <ul class="list" v-show="!keyboartActive">
      <li class="item" v-for="(item, i) in btnList" :key="i" @click="btnAction(item, i)">{{item.content}}</li>
    </ul>
    <div class="input-box" v-show="keyboartActive" @keyup.enter="enterAction">
      <div class="inputContent-box">
        <input ref="ipt" type="text" v-model="inputText">
        <span class="sendText" :class="{ active: isCanSend }" @click="sendAction">发送</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyboartActive: false,
      inputText: '',
      btnList: [
        { content: '同意', fn: 'agreeAction' },
        { content: '驳回', fn: 'rejectAction' },
        { content: '转审', fn: 'transferAction' }
      ]
    }
  },
  computed: {
    isCanSend: function () {
      if (this.inputText.length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    btnAction (item, i) {
      this.$emit(item.fn)
    },
    keyboartAction () {
      this.keyboartActive = !this.keyboartActive
      if (this.keyboartActive) {
        this.$refs.ipt.autofocus = true
      }
    },
    // agreeAction () {
    //   this.$emit('agreeAction')
    // },
    // rejectAction () {
    //   this.$emit('rejectAction')
    // },
    // transferAction () {
    //   this.$emit('transferAction')
    // },
    enterAction () {
      // alert('按下回车')
    },
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
.buttom-operation-box {
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
.list{
  flex: 1;
  display: flex;
}
.item{
  flex: 1;
  border-right: 1PX solid #ddd;
  color: #88b8f8;
}
.item:last-child{
  border-right: 0;
}
.buttom-operation-box .keyboart-btn {
  width: 69px;
  color: #88b8f8;
  position: relative;
  font-weight: normal;
  border-right: 1PX #ddd solid;
}
.buttom-operation-box .keyboart-btn .iconfont-approval {
  transform: rotate(0deg);
  display: inline-block;
  transition: all 0.5s;
}
.buttom-operation-box .keyboart-btn .iconfont-approval.active {
  transform: rotate(180deg);
}
.buttom-operation-box .keyboart-btn > span {
  font-size: 26px;
}
.buttom-operation-box .input-box {
  flex: 1;
  padding: 8px 21px 8px 18px;
}
.buttom-operation-box .input-box .inputContent-box {
  border-radius: 4px;
  /* width: 265px; */
  height: 36px;
  border: #ddd solid 1PX;
  /* outline:none; */
  padding: 0 5px;
  display: flex;
}
.buttom-operation-box .input-box .inputContent-box input {
  outline: none;
  flex: 1;
  border: none;
  padding-right: 3px;
}
.buttom-operation-box .input-box .inputContent-box .sendText {
  /* flex: 1; */
  width: 40px;
  height: 28px;
  line-height: 28px;
  /* background-color:#88b8f8; */
  background-color: #ddd;
  color: #fff;
  font-weight: normal;
  border-radius: 3px;
  align-self: center;
  display: inline-block;
  /* margin: 5px 0 4px; */
}
.buttom-operation-box .input-box .inputContent-box .sendText.active {
  background-color: #88b8f8;
}
</style>
