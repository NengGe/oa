let path = require('path')
const webpack = require('webpack')
const CompileEventsPlugin = require('./build/compile-events-plugin')
const findRemove = require('./build/find-remove')
const msgWebpack = require('./build/msg-webpack')
let merge = require('webpack-merge')
const getWebpackConfig = require('./build/webpack.prod')
const argv = require('yargs').argv
process.env.APP_TEST = argv['app-test'] === true
const webpackConfig = getWebpackConfig(__dirname)

// 打包输出路径设置：
let outputPath = path.resolve(__dirname, './dist')
// let outputPath = 'C:\\Users\\admin\\Desktop\\oa'

let prodConfig = {}

// ios 情况
if (argv['ios']) {
  prodConfig = {
    output: {
      path: outputPath
    },
    plugins: [
      new CompileEventsPlugin({
        compile () {
          findRemove(outputPath, /\.(jpg|js|ttf)$/)
        },
        done () {
          // findRemove(outputPath, /\.(css)$/)
        }
      })
    ].concat(
      // 打包分析
      1 ? [(new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)())] : []
    )
  }
  // ios 路径处理
  require('./build/ios-path-handle')(webpackConfig)
}


webpack(merge(webpackConfig, prodConfig), msgWebpack)
