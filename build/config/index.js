/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 设置代理
 * @Date: 2019-07-26 09:15:45
 * @LastEditTime: 2019-07-29 09:28:04
 */
module.exports = {
  proxy: {
    '/api': {
      target: 'http://localhost:9000/'
    },
    '/crm-app': {
      target: 'http://localhost:8000/',
      changeOrigin: true,
      pathRewrite: {
        '^/crm-app': ''
      }
    },
    '/crm-micro-js': {
      target: 'http://localhost:8000/',
      changeOrigin: true
    },
    '/sso-app': {
      target: 'http://localhost:8001/',
      changeOrigin: true,
      pathRewrite: {
        '^/sso-app': ''
      }
    },
    '/sso-micro-js': {
      target: 'http://localhost:8001/',
      changeOrigin: true
    },
    '/react-app': {
      target: 'http://localhost:8080/',
      changeOrigin: true
    },
    '/react-micro-js': {
      target: 'http://localhost:8080/',
      changeOrigin: true
    }
  },
  port: 8000
}
