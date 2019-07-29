/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 抛出请求
 * @Date: 2019-06-27 15:11:19
 * @LastEditTime: 2019-07-02 15:55:47
 */
import HomeService from './home'

export const homeService = new HomeService({
  baseUrl: 'http://localhost:8099',
  basePath: 'api/v1/pty/fetch'
})
