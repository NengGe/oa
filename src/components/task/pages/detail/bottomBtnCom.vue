<template>
  <div class="btn-b top-one-px">
    <div class="k-btn iconfont" v-click="keywordAction" :class="{active: isInput}">&#xe7be;</div>
    <div class="ipt-box" v-show="isInput">
      <input class="ipt" type="text" v-model="inputText" ref="ipt">
      <div class="send clickActive2" :class="{ active: isCanSend }" @click="sendAction">发送</div>
    </div>
    <ul class="list" v-show="!isInput">
      <li class="item clickActive" v-for="(item, i) in btnData" :key="i" :class="{'blue':item.content === '完成'}" @click="itemAction(item, i)">{{item.content}}</li>
    </ul>
    <confirmBoxCom v-show="isShowWarnBox" content='确定撤销？' @confirmAction="onRevoke" @cancelAction="isShowWarnBox = false"></confirmBoxCom>

  </div>
</template>

<script>
import confirmBoxCom from '@/modules/message-box/confirmBox'
export default {
  components: {
    confirmBoxCom
  },
  data () {
    return {
      isShowWarnBox: false,
      inputText: '',
      isInput: false,
      btnData: [
        { content: '撤销', cb: () => { this.isShowWarnBox = true } },
        { content: '编辑', cb: this.onEdit },
        { content: '完成', cb: this.onFinish }
      ]
    }
  },
  computed: {
    isCanSend: function () {
      return Boolean(this.inputText.length)
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.$route.name === 'detail_dealwith') {
        this.btnData = [
          { content: '完成', cb: this.onFinish }
        ]
      } else if (this.$route.name === 'detail_copysend') {
        this.btnData = []
        this.isInput = true
      }
    },
    keywordAction () {
      this.isInput = !this.isInput
      this.isInput && setTimeout(() => {
        this.$refs.ipt.focus()
      }, 0)
    },
    itemAction (item, i) {
      item.cb()
    },
    sendAction () {
      if (!this.isCanSend) return
      this.$emit('sendAction', this.inputText)
    },
    onFinish () { // 完成
      this.$emit('finish')
    },
    onEdit () { // 编辑
      this.$emit('edit')
    },
    onRevoke () { // 撤销
      this.$emit('revoke')
    },
    fn () {

    }
  }
}
</script>

<style lang='scss' scoped>
.btn-b {
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 54px;
  display: flex;
  line-height: 54px;
  text-align: center;
}
.k-btn {
  width: 65px;
  font-size: 32px;
  transition: transform 0.3s;
  color: #999;
  &.active {
    transform: rotate(180deg);
    color: #88b8f8;
  }
}
.list {
  flex: 1;
  display: flex;
  .item {
    font-weight: bold;
    border-left: 1px solid #e5e5e5;
    flex: 1;
    color: #666;
    font-size: 15px;
    &.blue {
      color: #88b8f8;
    }
  }
}
.ipt-box {
  border-left: 1px solid #e5e5e5;
  padding: 13px 13px;
  // align-items: center;
  flex: 1;
  display: flex;
  .ipt {
    padding: 0 10px;
    flex: 1;
    line-height: 28px;
    border-radius: 3px;
    border: 1px solid #ddd;
    outline: none;
  }
  .send {
    margin-left: 13px;
    border-radius: 3px;
    color: #fff;
    width: 40px;
    height: 28px;
    line-height: 28px;
    background-color: #ddd;
    &.active {
      background-color: #88b8f8;
    }
  }
}
</style>

