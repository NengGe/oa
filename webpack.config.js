const friendlyError = require('./build/friendly-error')
const webpackConfig = require('./build/webpack.dev')(__dirname)

webpackConfig.entry.main = ['@/assets/iconfont-link.dev.css', '@/modules/ajax-mid/test.js'].concat(webpackConfig.entry.main)

module.exports = friendlyError(webpackConfig)
