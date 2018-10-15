<template>
  <div class="btn-container" @mousedown="$event.preventDefault()">
    <!-- 字体大小 -->
    <div class="item-box font-box cf">
      <div class="font-switch" :class="{active: isActiveFontSwitch}" @click="isActiveFontSwitch=!isActiveFontSwitch">Aa</div>
      <ul class="fontBtn-box" :class="{active: isActiveFontSwitch}">
        <li class="fontBtn-item" v-for="(item, i) in fontSizeData" :key="'fontSizeData'+i" :class="{'active': currFontSize === item.text}"
                    @click.prevent="sizeBtnAction(item)">{{item.text}}</li>
      </ul>
    </div>
    <!-- 字体颜色 -->
    <div class="item-box color-box">
      <div class="color-switch iconfont-richtext" :class="{active: isActiveColorSwitch}" @click.prevent="isActiveColorSwitch=!isActiveColorSwitch">&#xe646;</div>
      <ul class="colorBtn-box" :class="{active: isActiveColorSwitch}">
        <li class="colorBtn-item" v-for="(item, i) in fontColorData" :key="'fontColorData'+i"
                                  @click.prevent="colorBtnAction(item)">
            <div class="bg-item"  :class="[item.className,{'active': currFontColor === item.className}]"></div>
        </li>
      </ul>
    </div>
    <!-- 加粗 -->
    <div class="item-box font-weight-box" :class="{active: isActiveBold}" @click.prevent="isActiveBold=!isActiveBold;onexcuCmd(fontWeightData.params)">B</div>
    <!-- 居左 OR 居中 -->
    <div class="item-box center-box iconfont-richtext" :class="{active: isActiveCenter}" @click.prevent="isActiveCenter=!isActiveCenter;onexcuCmd(justifyData.params)">{{isActiveCenter?'&#xe609;':'&#xe607;'}}</div>
    <!-- 无序列表 -->
    <div class="item-box bullets-box iconfont-richtext" :class="{active: isActiveUl}" @click.prevent="isActiveUl=!isActiveUl;onexcuCmd(ulData.params)">&#xe65f;</div>
    <!-- 有序列表 -->
    <div class="item-box bullets-box iconfont" :class="{active: isActiveOl}" @click.prevent="isActiveOl=!isActiveOl;onexcuCmd(olData.params)">&#xe65e;</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActiveFontSwitch: false, // 字体--大小
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
            argu: 3
          }
        },
        {
          text: '中',
          params: {
            cmd: 'fontSize',
            argu: 4
          }
        },
        {
          text: '大',
          params: {
            cmd: 'fontSize',
            argu: 5
          }
        }
      ],
      fontColorData: [ // 字体颜色
        {
          className: 'black',
          params: {
            cmd: 'foreColor',
            argu: 'black'
          }
        },
        {
          className: 'red',
          params: {
            cmd: 'foreColor',
            argu: 'red'
          }
        },
        {
          className: 'green',
          params: {
            cmd: 'foreColor',
            argu: 'green'
          }
        },
        {
          className: 'blue',
          params: {
            cmd: 'foreColor',
            argu: 'blue'
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
      olData: {// 有序列表
        params: {
          cmd: 'insertOrderedList'
        }
      }
    }
  },
  computed: {
    'justifyData': function () {
      return this.isActiveCenter ? this.centerData : this.leftData
    }
  },
  methods: {
    onexcuCmd (params) {
      let { cmd, argu } = params
      return document.execCommand(cmd, false, argu)
    },
    excuCmdBoxAction (ev) {
      console.log(111)
      ev.preventDefault()
    },
    // 选择--字体颜色
    colorBtnAction (item) {
      this.currFontColor = item.className
      this.onexcuCmd(item.params)
      // this.$emit('excuCmd', item.params)
    },
    // 选择--字体大小
    sizeBtnAction (item) {
      this.currFontSize = item.text
      this.onexcuCmd(item.params)
      // this.$emit('excuCmd', item.params)
    }
  }
}
</script>


<style lang="scss" scoped>
.iconfont-richtext{
  font-family: "iconfont-richtext";
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.btn-container{
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
