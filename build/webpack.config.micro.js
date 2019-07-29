const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { resolve } = require('path')
const devMode = process.env.NODE_ENV !== 'production'
const BaseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const packageJson = require('../package.json')

const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap(
  merge(BaseConfig, {
    entry: {
      'single-spa': './src/single-spa'
    },
    output: {
      path: resolve(__dirname, '../dist/asset'),
      publicPath: '/asset/',
      libraryTarget: 'umd',
      filename: `${packageJson.name}-js/[name].js`,
      chunkFilename: `${packageJson.name}-js/[name].[chunkhash].js`,
      umdNamedDefine: true
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          common: {
            test: module => {
              return (
                /[\\/]node_modules[\\/]/.test(module.context) &&
                !/react|redux|prop-types/.test(module.context) &&
                !/vue|vuex|vue-router/.test(module.context)
              )
            },
            name: 'common',
            chunks: 'initial',
            priority: 2,
            minChunks: 3
          },
          // reactBase: {
          //   name: 'reactBase',
          //   test: module => {
          //     return /react|redux|prop-types/.test(module.context)
          //   },
          //   chunks: 'initial',
          //   priority: 10
          // },
          vueBase: {
            name: 'vueBase',
            test: module => {
              return /vue|vuex|vue-router/.test(module.context)
            },
            chunks: 'initial',
            priority: 12
          },
          chunkCommon: {
            name: 'chunk-common',
            chunks: 'async',
            priority: 10,
            minChunks: 3 // 最小共用次数
          },
          componentCommon: {
            name: 'component-commons',
            test: resolve('src/components'), // 可自定义拓展你的规则
            minChunks: 2, // 最小共用次数
            priority: 5,
            reuseExistingChunk: true
          },
          commonStyle: {
            name: 'commonStyle',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
            priority: 20
          }
        }
      },
      // runtimeChunk: {
      //   name: 'manifest'
      // },
      minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({}), // 压缩css
        new UglifyJsPlugin({
          // 有很多可以配置
          cache: true,
          parallel: true,
          sourceMap: true,
          uglifyOptions: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            warnings: false,
            output: {
              // 删除所有的注释
              comments: false,
              // 最紧凑的输出
              beautify: false
            },
            compress: {
              // 删除所有的 `console` 语句
              // 还可以兼容ie浏览器
              drop_console: true,
              // 内嵌定义了但是只用到一次的变量
              collapse_vars: true,
              // 提取出出现多次但是没有定义成变量去引用的静态值
              reduce_vars: true
            }
          }
        })
      ]
    },
    plugins: [
      new webpack.BannerPlugin({
        banner:
          'hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]'
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*'],
        verbose: true,
        dry: false
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css\.*(?!.*map)/g,
        cssProcessor: require('cssnano'), // 引入cssnano配置压缩选项
        cssProcessorOptions: {
          map: {
            // 不生成内联映射,这样配置就会生成一个source-map文件
            inline: false,
            // 向css文件添加source-map路径注释
            // 如果没有此项压缩后的css会去除source-map路径注释
            annotation: true
          },
          discardComments: { removeAll: true },
          // 避免 cssnano 重新计算 z-index
          safe: true,
          // cssnano 集成了autoprefixer的功能
          // 会使用到autoprefixer进行无关前缀的清理
          // 关闭autoprefixer功能
          // 使用postcss的autoprefixer功能
          autoprefixer: false
        },
        canPrint: true // 是否将插件信息打印到控制台
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
        chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[contenthash].css'
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
        // NOTE: 设置生成`gzip`文件大小 100K
        threshold: 100 * 1024,
        minRatio: 0.8,
        cache: true
      }),
      new CopyPlugin([
        {
          from: 'src/project.js',
          to: 'project.js'
        }
      ]),
      new SWPrecacheWebpackPlugin({
        cacheId: `${packageJson.name}`,
        // By default, a cache-busting query parameter is appended to requests
        // used to populate the caches, to ensure the responses are fresh.
        // If a URL is already hashed by Webpack, then there is no concern
        // about it being stale, and the cache-busting can be skipped.
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        // dontCacheBustUrlsMatching: false,
        filename: 'service-worker.js',
        logger(message) {
          if (message.indexOf('Total precache size is') === 0) {
            // This message occurs for every build and is a bit too noisy.
            return
          }
          console.log(message)
        },
        minify: false,
        mergeStaticsConfig: true,
        staticFileGlobs: [],
        // For unknown URLs, fallback to the index page
        navigateFallback: '/index.html',
        // Ignores URLs starting from /__ (useful for Firebase):
        // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
        navigateFallbackWhitelist: [/^(?!\/__).*/],
        // Don't precache sourcemaps (they're large) and build asset manifest:
        staticFileGlobsIgnorePatterns: [/\.html/, /\.map$/, /asset-manifest\.json$/],
        // Work around Windows path issue in SWPrecacheWebpackPlugin:
        // https://github.com/facebookincubator/create-react-app/issues/2235
        stripPrefix: '/asset'.replace(/\\/g, '/') + '/'
      }),
      new webpack.DefinePlugin({
        'process.env.PUBLIC_URL': JSON.stringify('/asset'),
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  })
)
