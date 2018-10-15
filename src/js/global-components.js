/* eslint-disable no-multiple-empty-lines */
import Vue from 'vue'
// import oaBgNodata from '@/components/commonCom/oa-bg-nodata.vue'
// import oaListCom from '@/components/commonCom/oa-listCom.vue'
// import oaTabHead from '@/components/commonCom/oa-tabHead.vue'
// import oatabBottom from '@/components/commonCom/oa-tabBottom.vue'
// import oasearch from '@/components/commonCom/oa-search.vue'
// import oaiconBtn from '@/components/commonCom/oa-iconBtn.vue'
// import iconBtnContainer from '@/components/commonCom/oa-iconBtnContainer.vue'
// import logo from '@/components/commonCom/oa-logo.vue'

// Vue.component('oa-bg-nodata', oaBgNodata) // 无数据背景图
// Vue.component('oa-listCom', oaListCom) // 列表项
// Vue.component('oa-tabHead', oaTabHead) // 头部导航
// Vue.component('oa-tabBottom', oatabBottom) // 底部导航
// Vue.component('oa-search', oasearch) // 搜索框
// Vue.component('oa-iconBtn', oaiconBtn) // 带图标box
// Vue.component('oa-iconBtnContainer', iconBtnContainer) // 带图标box 容器
// Vue.component('oa-logo', logo) // 移动oa + desc


const requireComponent = require.context(
  // 其组件目录的相对路径
  '@/components/commonCom',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /oa-.+\.(vue|js)$/
)
requireComponent.keys().forEach((fileName, i) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 剥去文件名开头的 `'./` 和结尾的扩展名
  const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1')

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
