<template>
  <div class="appeal-introduction">
    <VMask v-show="isMask"></VMask>
    <transition name="fade-appeal">
      <div class="appeal-outer" v-show="isMask">
        <div class="appeal-box">
          <span class="bg-word" v-show="isShow">请填写申诉说明</span>
          <div class="content" contenteditable="true" @focus="focus" @blur="blur" @keyup="keyup" ref="appealContent">
          </div>
          <div class="operate">
            <div class="left-cancel btn" @click="cancelAppeal">取消申诉</div>
            <div class="right-sure btn" @click="sureAppeal">确定申诉</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import VMask from '@/modules/mask/VMask'
export default {
  name: 'appealIntroduction',
  components: {
    VMask
  },
  props: {
  },
  data () {
    return {
      isShow: true,
      isMask: false
    }
  },
  methods: {
    blur () {
      let contentDom = this.$refs.appealContent
      let re = /\s*/g
      if (contentDom.innerText.replace(re, '')) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    focus () {
      this.isShow = false
    },
    keyup () {

    },
    sureAppeal () { // 确定申诉
      let contentDom = this.$refs.appealContent
      let re = /^\s*|\s*$/g
      let text = contentDom.innerText.replace(re, '')
      // console.log('(' + text + ')')
      this.$emit('getAppeal', {
        text
      })
      this.isMask = false
    },
    cancelAppeal () { // 取消申诉
      // let contentDom = this.$refs.appealContent
      this.clearContent()
      this.isMask = false
    },
    show () { // 显示申诉窗口
      if (this.isMask) return
      this.isMask = true
      this.isShow = true
      this.clearContent()
    },
    close () { // 显示关闭窗口
      this.isMask = false
    },
    clearContent () {
      let contentDom = this.$refs.appealContent
      contentDom.innerText = ''
    }
  }
}
</script>
<style scoped>
/* .appeal-introduction {

} */
.appeal-outer {
   position: fixed;
   left: 0;
   top: 0;
   bottom: 0;
   right: 0;
   z-index: 9;
}
 .appeal-box {
   width: 280px;
   height: 150px;
   position: absolute;
   left: 0;
   top: 0;
   bottom: 0;
   right: 0;
   margin: auto;
   background-color: #ffffff;
   border-radius: 12.5px;
   z-index: 10;
 }
 .appeal-box .content {
   /* margin-bottom: 55px; */
   box-sizing: border-box;
   border-bottom: 1px solid  #dddddd;
   padding: 10px 6px 0px 6px;
   height: calc(100% - 45px);
   outline: none;
 }
 .operate {
   /* position: absolute; */
   height: 45px;
   line-height: 45px;
   display: flex;
 }
 .left-cancel {
   border-bottom-left-radius: 12.5px;
 }
 .right-sure {
   border-bottom-right-radius: 12.5px;
 }
 .bg-word {
   color: #dddddd;
   position: absolute;
   top: 10px;
   left: 6px;
   z-index: -1;
 }
 .btn {
   flex: 1 1;
   text-align: center;
   font-size: 16px;
   color: #007aff;
   &:active {
     background: #efebeb;
   }
 }
 .btn:first-of-type {
   border-right: 1px solid #dddddd;
 }
 .fade-appeal-enter-active, .fade-appeal-leave-active {
   transition: all 0.3s;
 }
 .fade-appeal-enter, .fade-appeal-leave-to {
   opacity: 0;
   transform: scaleX(0.6)
 }
</style>