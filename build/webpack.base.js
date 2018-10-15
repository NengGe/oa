let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
// let HtmlPlugin = require('./build/html-plugin')

module.exports = function (dirname) {
  const devMode = process.env.NODE_ENV !== 'production'
  // 项目根路径
  function _resolve (p) {
    return path.resolve(__dirname, '../', p)
  }
  // 子项目路径
  function resolve (p) {
    return path.resolve(dirname, p)
  }

  const cssAlias = {
    "./@": _resolve('src')
  }

  function getCssLoaders (){
    return [
      {
        resourceQuery: /module/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: devMode,
              alias: cssAlias,
              modules: true,
              localIdentName: '[local]_[hash:base64:5]'
            }
          },
          'postcss-loader?sourceMap=true', 'sass-loader?sourceMap=true'
        ]
      },
      {
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: devMode,
              alias: cssAlias
            }
          },
          'postcss-loader?sourceMap=true', 'sass-loader?sourceMap=true'
        ],
      }
    ]
  }

  let conf = {
    // context: path.resolve(__dirname, '../'),
    // externals: {'TcPlayer': 'TcPlayer'},
    entry: {
      main: ['./src/main.js']
    },
    output: {
      path: resolve('dist'),
      filename: 'js/[name].js?_=[chunkhash:7]',
      chunkFilename: 'js/[name].bundle.js?_=[chunkhash:7]'
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: './index.html',
        template: './src/index.html',
        chunks: ['main']
      }),
      new VueLoaderPlugin()
    ],

    module: {
      //加载器配置
      rules: [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [_resolve('src'), resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [_resolve('src'), resolve('src')],
        // exclude: ['node_modules'],
      }, {
        test: /\.(css|scss|postcss)$/,
        // test: /\.(css|scss)$/,

        // 一起处理
        // oneOf: getCssLoaders()
        // 分开处理 vue css
        oneOf: [{
            test: /\.vue/,
            oneOf: getCssLoaders()
          },
          {
            oneOf: getCssLoaders()
          }
        ],
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,//单位 字节，1千字节(kb)=1024字节(b)
          // publicPath: '../',
          name: 'imgs/[name].[hash:7].[ext]'
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // publicPath: '../',
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }]
    },
    resolve: {
      modules: [
        "node_modules"
        // _resolve('modules')
      ],
      extensions: ['.js', '.vue'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': _resolve('src')
      }
    }
  }

  return conf
}
