const BaseConfig = require('./webpack.config.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const { resolve } = require('path')
const config = require('./config')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const devWebpackConfig = merge(BaseConfig, {
  output: {
    path: resolve(__dirname, './dist'),
    publicPath: '/',
    libraryTarget: 'umd',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    umdNamedDefine: true
  },
  devServer: {
    publicPath: '/',
    contentBase: resolve(__dirname, '../dist'),
    clientLogLevel: 'warning',
    compress: true,
    open: true,
    port: config.port,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
    hotOnly: true,
    historyApiFallback: true,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false
    },
    proxy: config.proxy
  },
  plugins: [
    // NOTE: webpack4 不需要
    // new webpack.HotModuleReplacementPlugin(),
    // 处理html
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      favicon: resolve(__dirname, '../src/asset/ico/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      scripts: [
        {
          src: '/static/lib/systemjs.js'
        },
        {
          src: '/static/config/index.js'
        }
      ]
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host ||
                'localhost'}:${port}`
            ]
          }
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
