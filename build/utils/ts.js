const { resolve } = require('path')
module.exports = [
  {
    test: /\.ts$/,
    loader: 'ts-loader',
    exclude: file => /node_modules/.test(file) && !/\.js\.ts/.test(file),
    include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
    options: { appendTsSuffixTo: [/\.vue$/] }
  }
]
