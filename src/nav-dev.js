//

// 批量导入路由
let routes = []
function importAll (r) {
  r.keys().forEach(key => {
    routes = routes.concat(r(key).default)
    // console.log(routes)
  })
}

// importAll(require.context('./router', false, /\.js$/)) // 全部模块
importAll(require.context('./router', false, /(weekly-work|task|conference|out-mine|approval)\.js$/)) // 单个模块

export default [
  {
    path: '/',
    name: 'navDev',
    meta: {title: '快捷导航-dev'},
    component: {
      render (h) {
        const h2Style = { padding: '20px 6px 0', 'font-size': '16px' }
        const pStyle = { padding: '4px 10px' }
        const aStyle = { color: 'blue', 'text-decoration': 'underline' }

        const links = []
        routes.forEach(route => {
          links.push(<p style={pStyle}><router-link to={route.path} style={aStyle}>{route.meta ? route.meta.title : route.path}</router-link></p>)
        })

        return (
          <div>
            <h2 style={h2Style}>页面</h2>
            {links}
          </div>
        )
      }
    }
  }
]
