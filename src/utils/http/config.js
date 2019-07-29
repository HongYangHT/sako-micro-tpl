/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: http 请求配置文件
 * @Date: 2019-06-27 15:22:55
 * @LastEditTime: 2019-07-02 15:38:21
 */

export default {
  baseUrl: {
    local: 'http://localhost:8009', // 本地开发环境
    development: 'https://development.com', // 测试服务器环境
    production: 'https://production.com' // 正式服务器环境
  },
  timeout: 5000
}
