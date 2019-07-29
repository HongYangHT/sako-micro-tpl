const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = [
  {
    test: /\.styl(us)?$/,
    use: [
      {
        loader:
          process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
        options: {
          hmr: process.env.NODE_ENV === 'development'
        }
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  }
]
