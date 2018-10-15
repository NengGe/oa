import Vue from 'vue'
import Router from 'vue-router'

/*
  功能：测试路由重名(name命名重复)
  参数：this.$router.options.routes
  返回：{
    allArr: 所有路由 Array
    repeatArr: 重复路由name Array
    allObj: 所有路由 Object
  }
*/
// fn(routes) {
//   routes.forEach((item, i) => {
//     this.arr1.push(item)
//     this.arr2[item.name] = this.arr2[item.name] ? this.arr2[item.name] : []
//     this.arr2[item.name][0] && this.arr3.indexOf(item.name) === -1 && this.arr3.push(item.name)
//     this.arr2[item.name].push(item)
//     item.children && item.children[0] && this.fn(item.children)
//   })
//   return {
//     allArr: this.arr1,
//     repeatArr: this.arr3,
//     allObj: this.arr2
//   }
// }

// 批量导入路由
let routes = []
function importAll (r) {
  r.keys().forEach(key => {
    routes = routes.concat(r(key).default)
    // console.log(key)
  })
}

// 指定只打包具体 router
if (process.env.NODE_ENV === 'production') {
  // 正式环境

  importAll(require.context('./router', false, /(morality-manager|conference|videos|statistics|approval|inform|file|attendance|leave-school|index|task|student-leave|dy-inform|classManange|moralityResource|out-mine|weekly-work)\.js$/))
} else {
  // 开发环境
  // importAll(require.context('./', true, /^\.\/router\/.+?\.js$|^\.\/nav-dev.js$/))
  // importAll(require.context('./', true, /^\.\/router\/.+?\.js$/))
  importAll(require.context('./router', true, /^.+?\.js$/))
  // 指定具体页面
  // importAll(require.context('./', true, /^\.\/router\/(weekly-work|task|conference|out-mine|approval|index)\.js$/))
  // importAll(require.context('./', true, /^\.\/router\/(weekly-work)\.js$/))
  // importAll(require.context('./', true, /^\.\/router\/(weekly-work|task|conference|out-mine|approval)\.js$|^\.\/nav-dev.js$/))
}

Vue.use(Router)

export default new Router({
  routes: routes
})
