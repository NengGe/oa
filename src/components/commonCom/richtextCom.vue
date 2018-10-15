<template>
  <div class="reasonContent-box">
    <div id="richtext" ref="richtext" :placeholder='placeholder' contenteditable="true" @click="richtextAction" v-html="content" @input="$emit('input',$refs.richtext.innerHTML)"></div>
    <richTextBtn v-show="isShowRichTextBtn" :styleData='styleData' @input="onInput"></richTextBtn>
  </div>
</template>

<script>
import richTextBtn from '@/modules/rich-text/richTextBtn'
import testStyle from '@/modules/rich-text/js/rich-text.js'
import seekElements from '@/modules/corejs/dom/seek-elements.js'
export default {
  components: {
    richTextBtn
  },
  props: {
    'placeholder': {
      type: String,
      default: '请输入说明'
    },
    'content': {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      styleData: null,
      isShowRichTextBtn: false
    }
  },
  watch: {

  },
  mounted () {
    let richtext = this.$refs.richtext
    richtext.addEventListener('focus', (e) => {
      this.isShowRichTextBtn = true
    })
    richtext.addEventListener('blur', (e) => {
      this.isShowRichTextBtn = false
      this.$emit('updateContent', this.$refs.richtext.innerHTML)
    })
  },
  methods: {
    richtextAction () {
      let targetEle = window.getSelection().focusNode
      targetEle = parseInt(targetEle.nodeType) === 1 ? targetEle : targetEle.parentNode
      let eleList = seekElements(targetEle, this.$refs.richtext)
      this.styleData = testStyle(eleList)
    },
    onInput (v) {
      console.log(v)
    }
  }
}
</script>

<style scoped>
.reasonContent-box{
  height: 123px;
  margin-top: 12px;
  /* border-radius: 9px; */
  background-color: #fff;
  padding: 13px 15px;
}
#richtext{
  width: 100%;
  height: 100%;
  outline: none;
  overflow-y: auto;
}
#richtext:empty:before{
  content: attr(placeholder);
  color:#ccc;
}
#richtext:focus:before{
  content:none;
}
#richtext /deep/ ol li{
  list-style-type: decimal;
  list-style-position: inside;
  padding-left: 10px;
}
#richtext /deep/ ul li{
  list-style-type: disc;
  list-style-position: inside;
  padding-left: 10px;
}
</style>
