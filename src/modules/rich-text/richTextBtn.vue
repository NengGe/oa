<template>
  <div class="btn-container" @mousedown="$event.preventDefault()">
    <!-- 字体大小 -->
    <div class="item-box font-box cf">
      <div class="font-switch" :class="{active: isActiveSizeSwitch}" @click="fontSwitchAction">Aa</div>
      <ul class="fontBtn-box" :class="{active: isActiveSizeSwitch}">
        <li class="fontBtn-item" v-for="(item, i) in fontSizeData" :key="'fontSizeData'+i" :class="{'active': currFontSize === item.params.argu}"
                    @click.prevent="sizeBtnAction(item)">{{item.text}}</li>
      </ul>
    </div>
    <!-- 字体颜色 -->
    <div class="item-box color-box">
      <div class="color-switch iconfont-richtext" :style="{'color': currFontColor}" :class="{active: isActiveColorSwitch}" @click.prevent="colorSwitchAction">&#xe646;</div>
      <ul class="colorBtn-box" :class="{active: isActiveColorSwitch}">
        <li class="colorBtn-item" v-for="(item, i) in fontColorData" :key="'fontColorData'+i"
                                  @click.prevent="colorBtnAction(item)">
            <div class="bg-item"  :class="[item.className,{'active': currFontColor === item.params.argu}]"></div>
        </li>
      </ul>
    </div>
    <!-- 加粗 -->
    <div class="item-box font-weight-box" :class="{active: isActiveBold}" @click.prevent="isActiveBold=!isActiveBold;onexcuCmd(fontWeightData.params)">B</div>
    <!-- 居左 OR 居中 -->
    <div class="item-box center-box iconfont-richtext" :class="{active: isActiveCenter}" @click.prevent="isActiveCenter=!isActiveCenter;onexcuCmd(justifyData.params)">{{isActiveCenter?'&#xe609;':'&#xe607;'}}</div>
    <!-- 无序列表 -->
    <div class="item-box bullets-box iconfont-richtext" :class="{active: isActiveUl}" @click.prevent="ulAction(ulData)">&#xe65f;</div>
    <!-- 有序列表 -->
    <div class="item-box bullets-box iconfont-richtext" :class="{active: isActiveOl}" @click.prevent="olAction(olData)">&#xe65e;</div>
  </div>
</template>

<script>
export default {
  props: {
    'styleData': Object
  },
  data () {
    return {
      isActiveSizeSwitch: false, // 字体--大小
      isActiveColorSwitch: false, // 字体--颜色

      isActiveBold: false, // 字体--加粗
      isActiveCenter: false, // 文本--居中 or 居左
      isActiveUl: false, // 无序列表
      isActiveOl: false, // 无序列表

      currFontColor: '',
      currFontSize: '',

      fontSizeData: [ // 字体大小
        {
          text: '小',
          params: {
            cmd: 'fontSize',
            argu: '3'
          }
        },
        {
          text: '中',
          params: {
            cmd: 'fontSize',
            argu: '4'
          }
        },
        {
          text: '大',
          params: {
            cmd: 'fontSize',
            argu: '5'
          }
        }
      ],
      fontColorData: [ // 字体颜色
        {
          className: 'black',
          params: {
            cmd: 'foreColor',
            argu: '#000000'
          }
        },
        {
          className: 'red',
          params: {
            cmd: 'foreColor',
            argu: '#ff0000'
          }
        },
        {
          className: 'green',
          params: {
            cmd: 'foreColor',
            argu: '#00ff00'
          }
        },
        {
          className: 'blue',
          params: {
            cmd: 'foreColor',
            argu: '#0000ff'
          }
        }
      ],
      fontWeightData: {// 加粗
        params: {
          cmd: 'bold',
          dUI: false,
          argu: null
        }
      },
      centerData: {// 居中对齐
        params: {
          cmd: 'justifyCenter'
        }
      },
      leftData: {// 左对齐
        params: {
          cmd: 'justifyLeft'
        }
      },
      ulData: {// 无序列表
        params: {
          cmd: 'insertUnorderedList'
        }
      },
      olData: {// 无序列表
        params: {
          cmd: 'insertOrderedList'
        }
      }
    }
  },
  watch: {
    'styleData': function (styleO) {
      styleO = styleO || {}
      this.currFontSize = styleO.currFontSize
      this.currFontColor = styleO.currFontColor
      this.isActiveBold = styleO.isActiveBold
      this.isActiveCenter = styleO.isActiveCenter
      this.isActiveUl = styleO.isActiveUl
      this.isActiveOl = styleO.isActiveOl
    }
  },
  computed: {
    'justifyData': function () {
      return this.isActiveCenter ? this.centerData : this.leftData
    }
  },
  methods: {
    // 执行命令
    onexcuCmd (params) {
      let { cmd, argu } = params
      return document.execCommand(cmd, false, argu)
    },
    excuCmdBoxAction (ev) {
      ev.preventDefault()
    },
    // 开关--字体大小
    fontSwitchAction () {
      this.isActiveSizeSwitch = !this.isActiveSizeSwitch
      this.isActiveColorSwitch = false
    },
    // 开关--字体颜色
    colorSwitchAction () {
      this.isActiveColorSwitch = !this.isActiveColorSwitch
      this.isActiveSizeSwitch = false
    },
    // 选择--字体颜色
    colorBtnAction (item) {
      this.currFontColor = item.params.argu
      this.isActiveColorSwitch = false
      this.onexcuCmd(item.params)
    },
    // 选择--字体大小
    sizeBtnAction (item) {
      this.currFontSize = item.params.argu
      this.isActiveSizeSwitch = false
      this.onexcuCmd(item.params)
    },
    // 选择--无序列表
    ulAction (ulData) {
      this.isActiveUl = !this.isActiveUl
      this.isActiveOl = false
      this.onexcuCmd(ulData.params)
    },
    // 选择--有序列表
    olAction (olData) {
      this.isActiveOl = !this.isActiveOl
      this.isActiveUl = false
      this.onexcuCmd(olData.params)
    }
  }
}
</script>


<style lang="scss" scoped>

@font-face {
  font-family: 'iconfont-richtext';
  src: url('fonts/iconfont-richtext.ttf') format('truetype');
}
.iconfont-richtext{
  font-family: "iconfont-richtext";
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.btn-container{
  z-index: 100;
  display: flex;
  text-align: center;
  line-height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: #ddd;
  .item-box{
    flex-shrink: 0;
    flex-grow: 0;
    background-color: #ccc;
    &.active{
      background: cornflowerblue;
    }
  }
  .font-box{
    .font-switch{
      float: left;
      height: 50px;
      width: 50px;
      &.active{
        background: cornflowerblue;
      }
    }
    .fontBtn-box{
      transition: all 0.2s;
      width: 0;
      overflow: hidden;
      float: left;
      display: flex;
      &.active{
      width: 150px;
      box-sizing: border-box;
      border-right: 1PX #eee solid;
      }
      .fontBtn-item{
        width: 50px;
        background: #cdcdcd;
        &.active{
          color: cornflowerblue;
        }
      }
    }
  }
  .color-box{
    .color-switch{
      float: left;
      width: 50px;
      &.active{
        background: #bbcff3;
      }
    }
    .colorBtn-box{
      transition: all 0.2s;
      overflow: hidden;
      width: 0;
      float: left;
      // display: flex;
      &.active{
      width: 200px;
      }
      .colorBtn-item{
        float: left;
        width: 50px;
        height: 50px;
        background-origin: content-box;
        box-sizing: border-box;
        .bg-item{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin: 15px;
          padding: 2px;
          box-sizing: border-box;
          background-clip: content-box;
          &.black{
            background-color: #000;
          }
          &.black.active{
            border: 1PX solid #000
          }
          &.red{
            background-color: #f00;
          }
          &.red.active{
            border: 1PX solid #f00
          }
          &.green{
            background-color: #0f0;
          }
          &.green.active{
            border: 1PX solid #0f0
          }
          &.blue{
            background-color: #00f;
          }
          &.blue.active{
            border: 1PX solid #00f
          }
        }
      }

    }
  }
  .font-weight-box{
    // float: left;
    width: 50px;
    &.active{
      font-weight: bold;
    }
  }
  .center-box{
    background: #ccc;
    float: left;
    width: 50px;
    &.active{

    }
  }
  .bullets-box{
    // float: left;
    width: 50px;
    &.active{
      // background-color: cornflowerblue;
    }
  }
}
</style>
