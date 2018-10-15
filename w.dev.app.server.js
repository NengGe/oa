/* app 测试 */
const webpack = require('webpack')
const webpackConfig = require('./build/webpack.prod')(__dirname)
const getIPAdress = require('./build/get-ip-adress')

const msgWebpack = require('./build/msg-webpack')
webpackConfig.watch = true
webpackConfig.devtool = 'source-map'
webpackConfig.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
    APP_TEST: JSON.stringify('true')
  }
}))
webpack(webpackConfig, msgWebpack)

// 开启即用服务器
const opn = require('opn')
const httpServer = require('http-server')
server = httpServer.createServer({
  root: webpackConfig.output.path
})
let port = '8888'
let host = getIPAdress()
server.listen(port, host, function () {
  opn(`http://${host}:${port}`, {app: ['chrome']})
})
