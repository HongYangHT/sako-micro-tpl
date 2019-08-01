const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcss = require('postcss')
const packageJson = require('../../package.json')
module.exports = [
  {
    test: /\.less$/,
    use: [
      {
        loader:
          process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
        options: {
          hmr: process.env.NODE_ENV === 'development',
          publicPath: process.env.NODE_ENV === 'production' ? '/asset' : '/'
        }
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          sourceMap: true,
          plugins: () => [
            // 可以配置多个插件
            require('autoprefixer')({
              overrideBrowserslist: [
                'last 10 Chrome versions',
                'last 5 Firefox versions',
                'Safari >= 6',
                'ie > 8'
              ],
              grid: true
            }),
            // NOTE: 自定义插件
            postcss.plugin('namespace', () => css =>
              css.walkRules(rule => {
                if (rule.parent && rule.parent.type === 'atrule' && rule.parent.name !== 'media')
                  return
                rule.selectors = rule.selectors.map(
                  s =>
                    `${/^.ivu-tooltip-popper/.test(s) ? '' : '.' + packageJson.name + ' '}${
                      s === 'body' ? '' : s
                    }`
                )
              })
            )
          ]
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  }
]
