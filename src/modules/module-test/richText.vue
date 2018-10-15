<template>
  <div class="rich-text">
    <div class="control-box" ref="ctrl-box">
      <ul class="list">
        <button class="itemBtn" @touchstart="changeStyle($event,item.params)" @click="changeStyle($event,item.params)" v-for="(item, i) in controlList" :key="'controlList'+i">{{item.text}}</button>
      </ul>
      <ul class="list">
        <li class="itemBtn" @touchstart="changeStyle($event,item.params)" @mousedown="$event.preventDefault()" @click="changeStyle($event,item.params)" v-for="(item, i) in controlList" :key="'controlList'+i">{{item.text}}</li>
      </ul>
    </div>
    <div class="textarea-box">
      <div placeholder='111111111' id="richtext-box" ref="content" class="richtext-box" contenteditable @click="contentAction">

      </div>
    </div>
    <div class="test-box">
      <button @click="getSelection">获取选中内容</button>
      <button @click="_printText">打印富文本内容</button>
    </div>
    <richTextBtn v-show="true" :styleData='styleData'></richTextBtn>
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
  data () {
    return {
      styleData: null,
      isShowRichTextBtn: false,
      selectionContent: null,
      contentText: '',
      controlList: [
        {
          text: '撤销',
          params: {
            cmd: 'undo'
          }
        },
        {
          text: '重做',
          params: {
            cmd: 'redo'
          }
        },
        {
          text: '加粗',
          params: {
            cmd: 'bold',
            dUI: false,
            argu: null
          }
        },
        {
          text: '倾斜',
          params: {
            cmd: 'italic'
          }
        },
        {
          text: '红色',
          params: {
            cmd: 'foreColor',
            argu: 'red'
          }
        },
        {
          text: '绿色',
          params: {
            cmd: 'foreColor',
            argu: 'green'
          }
        },
        {
          text: '蓝色',
          params: {
            cmd: 'foreColor',
            argu: 'blue'
          }
        },
        {
          text: '有序列表',
          params: {
            cmd: 'insertOrderedList'
          }
        },
        {
          text: '无序列表',
          params: {
            cmd: 'insertUnorderedList'
          }
        },
        {
          text: '左对齐',
          params: {
            cmd: 'justifyLeft'
          }
        },
        {
          text: '居中',
          params: {
            cmd: 'justifyCenter'
          }
        },
        {
          text: '右对齐',
          params: {
            cmd: 'justifyRight'
          }
        },
        {
          text: '小号',
          params: {
            cmd: 'fontSize',
            argu: 2
          }
        },
        {
          text: '中号',
          params: {
            cmd: 'fontSize',
            argu: 4
          }
        },
        {
          text: '大号',
          params: {
            cmd: 'fontSize',
            argu: 6
          }
        },
        {
          text: '链接',
          params: {
            cmd: 'createLink',
            argu: 'https://wwww.baidu.com'
          }
        }
      ]
    }
  },
  mounted () {
    // var ctrlBox = this.$refs['ctrl-box']
    // ctrlBox.addEventListener('touchstart', function (e) {
    //   console.log(11)
    // e.preventDefault()
    // })
    let content = this.$refs.content
    // console.dir(content)
    content.addEventListener('focus', (e) => {
      // console.log(111)
      this.isShowRichTextBtn = true
    })
    content.addEventListener('blur', (e) => {
      // console.log(222)
      this.isShowRichTextBtn = false
    })
    content.addEventListener('click', (e) => {
      // console.log(e)
    })
  },
  methods: {
    contentAction () {
      let targetEle = window.getSelection().focusNode
      targetEle = parseInt(targetEle.nodeType) === 1 ? targetEle : targetEle.parentNode
      let eleList = seekElements(targetEle, this.$refs.content)
      this.styleData = testStyle(eleList)
    },
    _printText () {
      // console.log(this.contentText)
      let p = this.$refs.content.innerHTML
      console.log(p)
      console.log(JSON.stringify(p))
    },
    onexcuCmd (params) {
      let { cmd, argu } = params
      return document.execCommand(cmd, false, argu)
    },
    getSelection () {
      this.selectionContent = window.getSelection()
      console.dir(this.selectionContent.focusNode)
    },
    itemAction (ev) {
      console.log(ev)
      // var bool = this.changeStyle(ev.target.dataset)
      // console.log(bool)
    },
    changeStyle (e, data) {
      data.argu = data.argu || null
      let { cmd, argu } = data
      console.log('执行changeStyle')
      e.preventDefault()
      return document.execCommand(cmd, false, argu)
    }
  }
}
</script>

<style lang="scss" scoped>

.rich-text{
  padding-bottom: 60px;
}
.control-box {
  min-height: 100px;
  background: cornflowerblue;
}
.textarea-box {
  line-height: 30px;
  font-size: 18px;
  min-height: 300px;
  background: #fff;
}
#richtext-box{
  overflow-y: auto;
  height: 300px;
  background: #efefef;
}
#richtext-box /deep/ ol {
  list-style-type: decimal;
  list-style-position: inside;
  padding-left: 10px;
}
#richtext-box /deep/ ul {
  list-style-type: disc;
  list-style-position: inside;
  padding-left: 10px;
}
.itemBtn {
  padding: 5px 10px;
  background: #ccc;
  display: inline-block;
  border-radius: 5px;
  margin: 3px;
}
</style>
