[TOC]

# OA - 前端开发文档

## 相关模块

### 弹窗看图，双指放大

指定 `data-type="1"` 即可

```html
<img src="" data-type="1">
```

### label-switch

示例

```html
<template>
  <div>
    <p>
      <LabelSwitch :checked.sync="myChecked"></LabelSwitch>
    </p>
    <p>当前选择：{{myChecked}}</p>
    <p>
      <a @click="myChecked=!myChecked">编程更改</a>
    </p>
  </div>
</template>

<script>
  import LabelSwitch from '@/modules/label-switch'
  export default {
    data () {
      return {
        myChecked: true
      }
    },
    components: {
      LabelSwitch
    }
  }
</script>

<style scoped>
p{
padding: 10px;
}
a{
  color: blue;
  text-decoration: underline;
}
</style>

```
模块位置：@/modules/label-switch

模块demo位置：@/modules-test/20180111_label-switch

demo运行: node webpack.dev.run

### 获取用户信息

带缓存

```js
import getUserInfo from '@/js/get-user-info.js'

// 请求用户信息
// 多次调用不会重复请求。除非缓存清空
getUserInfo().then(d => {
  console.log(d)
})

// 清空缓存
getUserInfo.set(null)
```

### 人员选择

demo 位置：
@/modules-test/member-select/App.vue

```js
this.$refs.vMemberSelect.show({
  // 类型：单选(single)(默认)、多选(multiple)
  // type: 'multiple',
  // 已选项。初始选中。直接把确认拿到的数据丢过来即可
  selectedData: [{user_id: '492594'}],
  // 确认事件
  onConfirm (selectedData) {
    console.log(selectedData)
    // 进行是否关闭判断
    return false // 阻止自动关闭
  }
})
```

## 打包命令

```
npm run build     // 同时打包外网版本
npm run build.dev // 同时打包内网版本

build.ios         // ios 外网版本
build.dev.ios     // ios 内网版本

build.android     // android 外网版本
build.dev.android // android 内网版本
```

## 关于 css rem 适配

直接用px写即可，已使用[postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)自动转成rem。

不需要转换的px单位大写

逻辑分辨率: 750px(设计稿)/2 = 375px

## js 规范

[standard](https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style)

## css 规范

### 尽量不用元素选择器

[vue 官方说明](https://cn.vuejs.org/v2/style-guide/#scoped-%E4%B8%AD%E7%9A%84%E5%85%83%E7%B4%A0%E9%80%89%E6%8B%A9%E5%99%A8-%E8%B0%A8%E6%85%8E%E4%BD%BF%E7%94%A8)

尽量不用元素选择器，因为当与属性选择器组合使用时会慢很多倍。
经测试，只有 ie(9~11) 有这种性能差异，新版 Edge/16 也有，只是没有旧版那么夸张。Chrome/64、Firefox/58.0 没差别

不管如何，ie 的元素选择器就是慢很多。id、class 差别不大

```css
p[v-cloak] { color: red } /* ie性能差 */
```

==使用 class 或者 id 取代==

[选择器性能测试](https://stevesouders.com/efws/css-selectors/csscreate.php?n=1000&sel=.div&body=background%3A+%23CFD&ne=1000)





