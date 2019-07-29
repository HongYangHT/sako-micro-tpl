module.exports = [
  {
    test: /\.vue$/,
    use: [
      {
        loader: 'vue-loader',
        options: {}
      },
      {
        loader: 'iview-loader',
        options: {
          prefix: true
        }
      }
    ]
  }
]
