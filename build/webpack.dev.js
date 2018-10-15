/* dev 用。因为使用的是默认的 devServer */
let path = require('path')
let webpack = require('webpack')
let getIPAdress = require('./get-ip-adress')
let getBaseConf = require('./webpack.base')
let merge = require('webpack-merge')

module.exports = function (dirname) {
  let baseConf = getBaseConf(dirname)
  baseConf.output.filename = baseConf.output.filename.replace(/chunkhash/, 'hash')

  // baseConf.module.rules.forEach(d => {
  //   // 普通 css 处理
  //   if (d.test.toString().indexOf('css') > -1) {
  //     // 普通 css 抽离处理：只是了解决延迟 bug：https://github.com/webpack-contrib/style-loader/pull/219
  //     // 调试版本来无需处理，等待官方解决
  //     d.use = ExtractTextPlugin.extract({
  //       fallback: 'style-loader',
  //       use: ['css-loader?sourceMap=true', 'postcss-loader?sourceMap=inline', 'sass-loader?sourceMap=true']
  //     })
  //   }
  // })

  let conf = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    watch: true,
    output: {
      pathinfo: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // 启用 hot
    ],
    devServer: {
      clientLogLevel: 'warning',// 去掉没必要的控制台输出。比如 hot 情况 --progress 浏览器控制台不再显示进度输出
      contentBase: path.resolve(dirname, 'dist'),
      compress: true, // gzip
      host: getIPAdress(),
      // port: 3002,
      // openPage: 'http://192.168.1.222',

      inline: true, // hot 相关
      hot: true,
      hotOnly: false,
      // proxy: [{
      //   context: ["/Content"],
      //   target: "http://192.168.1.222:3003"
      // }]
      // proxy: {
      //   '/': {
      //     target: 'https://api.shendupeiban.com',
      //     secure: false
      //   }
      // }
      proxy: {
        '/aaaaaa': {
          target: 'http://localhost:3000',
        },
        '/palm/v2/': {
          // target: `http://${getIPAdress()}:3003`,
          changeOrigin: true,
          target: 'http://192.168.1.162:8086',
          // onProxyReq: function(proxyReq, req, res){
          //   // proxyReq.setHeader('Host',`${getIPAdress()}:3002`)
          // }
        },
        '/classcard/v1': {
          // target: `http://${getIPAdress()}:3002`,
          target: 'http://192.168.1.162:8086',
          // onProxyReq: function(proxyReq, req, res){
          //   // proxyReq.setHeader('Host',`${getIPAdress()}:3002`)
          // }
        },
        '/mobicampus/task/v1': {
          // target: `http://${getIPAdress()}:3002`,
          target: 'http://192.168.1.162:8086',
          // onProxyReq: function(proxyReq, req, res){
          //   // proxyReq.setHeader('Host',`${getIPAdress()}:3002`)
          // }
        },
        '/mobicampus': {
          // target: `http://${getIPAdress()}:3002`,
          target: 'http://192.168.1.162:8086',
          // onProxyReq: function(proxyReq, req, res){
          //   // proxyReq.setHeader('Host',`${getIPAdress()}:3002`)
          // }
        },
        '/mobicampus/fund/v1': {
          // target: `http://${getIPAdress()}:3002`,
          target: 'http://192.168.1.162:8086',
          // onProxyReq: function(proxyReq, req, res){
          //   // proxyReq.setHeader('Host',`${getIPAdress()}:3002`)
          // }
        },
        '/mobicampus/attend/v1': {
          // target: `http://${getIPAdress()}:3002`,
          target: 'http://192.168.1.162:8086',
          // onProxyReq: function(proxyReq, req, res){
          //   // proxyReq.setHeader('Host',`${getIPAdress()}:3002`)
          // }
        },
        '/mobicampus/file/v1': {
          // target: `http://${getIPAdress()}:3002`,
          target: 'http://192.168.1.162:8131',
          // onProxyReq: function(proxyReq, req, res){
          //   // proxyReq.setHeader('Host',`${getIPAdress()}:3002`)
          // }
        },
        '/mobicampus/attendence/v1': {
          // target: `http://${getIPAdress()}:3002`,
          target: 'http://192.168.1.162:8123',
          // onProxyReq: function(proxyReq, req, res){
          //   // proxyReq.setHeader('Host',`${getIPAdress()}:3002`)
          // }
        },
        '/mobicampus/announce/v1': {
          // target: `http://${getIPAdress()}:3002`,
          target: 'http://192.168.1.162:8130',
          // onProxyReq: function(proxyReq, req, res){
          //   // proxyReq.setHeader('Host',`${getIPAdress()}:3002`)
          // }
        },
        '/mobicampus/approve/v1': {
          // target: `http://${getIPAdress()}:3002`,
          target: 'http://192.168.1.162:8125',
          // onProxyReq: function(proxyReq, req, res){
          //   // proxyReq.setHeader('Host',`${getIPAdress()}:3002`)
          // }
        },
        '/mobicampus/leave/v1': {
          // target: `http://${getIPAdress()}:3002`,
          target: 'http://192.168.1.162:8126',
          // onProxyReq: function(proxyReq, req, res){
          //   // proxyReq.setHeader('Host',`${getIPAdress()}:3002`)
          // }
        },
        '/mobicampus/biztrip/v1': {
          // target: `http://${getIPAdress()}:3002`,
          target: 'http://192.168.1.162:8127',
          // onProxyReq: function(proxyReq, req, res){
          //   // proxyReq.setHeader('Host',`${getIPAdress()}:3002`)
          // }
        },
        '/mobicampus/course/v1': {
          // target: `http://${getIPAdress()}:3002`,
          target: 'http://192.168.1.162:8129',
          // onProxyReq: function(proxyReq, req, res){
          //   // proxyReq.setHeader('Host',`${getIPAdress()}:3002`)
          // }
        },
        '/mobicampus/message/v1': {
          // target: `http://${getIPAdress()}:3002`,
          target: 'http://192.168.1.162:8124',
          // onProxyReq: function(proxyReq, req, res){
          //   // proxyReq.setHeader('Host',`${getIPAdress()}:3002`)
          // }
        },
        '/mobicampus/assets/v1': {
          // target: `http://${getIPAdress()}:3002`,
          target: 'http://192.168.1.162:8086',
          onProxyReq: function (proxyReq, req, res) {
            // proxyReq.setHeader('Host',`${getIPAdress()}:3002`)
          }
        },
        '/schoolorg/v1': {
          // target: `http://${getIPAdress()}:3003`,
          target: 'http://192.168.1.162:8086',
          // onProxyRes: function(proxyRes, req, res){
          //   // proxyRes.headers['Access-Control-Allow-Origin'] = '*'
          // }
        },
        '/mobicampus/tvstation/v1': {
          // target: `http://${getIPAdress()}:3003`,
          // target: 'http://192.168.1.162:8120',
          target: 'http://192.168.1.162:8120',
        },
        '/mobicampus/meeting/v1': {
          // target: `http://${getIPAdress()}:3003`,
          target: 'http://192.168.1.162:8117',
        },
        '/Api': {
          // target: `http://${getIPAdress()}:3003`,
          target: 'http://192.168.1.127:1900'
        },
        '/comm/v1/campustoken': {
          target: 'http://192.168.1.162:1235'
        },
        '/comm/v1/campuses': {
          target: 'http://192.168.1.162:1235'
        },
        '/comm/v1/campuses': {
          target: 'http://192.168.1.162:1235'
        },
        '/comm/v1/campuses': {
          target: 'http://192.168.1.162:1235'
        }
        // '/mobicampus/common/v1': {
        //   target: 'http://192.168.1.171:8080'
        // }
      }
    }
  }

  return merge(baseConf, conf)
}
