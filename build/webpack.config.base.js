const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const VueConfig = require('./webpack.config.vue')
const merge = require('webpack-merge')
const devMode = process.env.NODE_ENV !== 'production'
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

// NOTE: 应用了splitChunks, 不再需要设置vender

module.exports = merge(
  {
    mode: devMode ? 'development' : 'production',
    entry: {
      app: './src'
    },
    devtool: devMode ? 'inline-source-map' : 'source-map',
    module: {
      rules: [
        // ... 其它规则
        {
          enforce: 'pre',
          test: /\.(js|vue|jsx)$/,
          exclude: /node_modules/,
          include: resolve(__dirname, '/src/**'),
          loader: 'eslint-loader',
          options: {
            fix: true,
            formatter: require('eslint-friendly-formatter')
          }
        }
      ]
    },
    resolve: {
      modules: [resolve('node_modules'), resolve('src')],
      extensions: ['.js', '.vue', '.jsx', '.json', '.css', '.scss', '.sass'],
      alias: {
        '@': resolve(__dirname, '../src'),
        vue$: devMode ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.min.js'
      }
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      // new webpack.DllPlugin({
      //   /**
      //    * path
      //    * 定义 manifest 文件生成的位置
      //    * [name]的部分由entry的名字替换
      //    */
      //   path: join(resolve(__dirname, "./dist"), "manifest.json"),
      //   /**
      //    * name
      //    * dll bundle 输出到那个全局变量上
      //    * 和 output.library 一样即可。
      //    */
      //   name: "[name]",
      //   context: __dirname
      // }),
      // 处理html
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: '../index.html',
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
        } /* ,
        scripts: [
          {
            src:
              process.env.NODE_ENV === 'production'
                ? '/asset/static/lib/systemjs.js'
                : '/static/lib/systemjs.js'
          },
          {
            src:
              process.env.NODE_ENV === 'production'
                ? '/asset/static/config/index.js'
                : '/static/config/index.js'
          }
        ], */,
        env: process.env.NODE_ENV === 'production'
      }),
      new CopyPlugin([
        {
          from: 'static/**/*',
          to: './'
        }
      ]),
      new StyleLintPlugin({
        files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}']
      })
    ]
  },
  VueConfig
)
