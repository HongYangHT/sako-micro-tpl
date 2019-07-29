/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 基础的service请求
 * 做此设计是为了更加清晰明了的设计api的请求
 * @Date: 2019-06-27 15:11:12
 * @LastEditTime: 2019-07-02 15:55:00
 */
import axios from 'axios'
import config from '@/utils/http/config'

class BaseService {
  /**
   * http请求的构造函数
   * @param {*} options 传入参数
   * - baseUrl 可为空
   * - basePath 可为空
   * - timeout 可为空
   */
  constructor(options) {
    // NOTE: 先将环境变量变成 Map 格式
    const envs = new Map()
    Object.keys(config.baseUrl).forEach(key => {
      envs.set(key, config.baseUrl[key])
    })

    //  将默认设置的实例传入的 `option` 合并
    const {
      baseUrl = envs.get(process.env.NODE_ENV),
      basePath = '',
      timeout = config.timeout,
      requestInterceptor = config => config,
      responseInterceptor = response => response,
      requestError = () => {},
      responseError = () => {}
    } = options

    // NOTE: 先默认新建一个 `axios` 实例
    const baseAxios = axios.create({
      baseURL: basePath ? `${baseUrl}/${basePath}` : baseUrl,
      timeout
    })

    baseAxios.interceptors.request.use(
      config => {
        // NOTE: 这里添加请求前操作
        return requestInterceptor(config)
      },
      error => {
        requestError()
        return Promise.reject(error)
      }
    )

    baseAxios.interceptors.response.use(
      response => {
        // NOTE: 这里添加请求后操作
        return responseInterceptor(response)
      },
      error => {
        responseError()
        return Promise.reject(error)
      }
    )
    this.opts = options

    this.baseAxios = baseAxios
  }

  /**
   * get 请求
   * @param {*} path 相对路径
   * @param {*} opts 配置参数
   * opts
   * baseURL 绝对路径
   * - transformRequest `transformRequest` (data, headers) => data
   * allows changes to the request data before it is sent to the server
   * This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
   * The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
   * FormData or Stream
   * You may modify the headers object.
   * - transformResponse `transformResponse` data => data
   * allows changes to the response data to be made before
   * it is passed to then/catch
   * - headers `headers` are custom headers to be sent
   * - params `params` are the URL parameters to be sent with the request, Must be a plain object or a URLSearchParams object
   * - paramsSerializer `paramsSerializer` is an optional function in charge of serializing `params`
   * - data `data` is the data to be sent as the request body
   * Only applicable for request methods 'PUT', 'POST', and 'PATCH'
   * When no `transformRequest` is set, must be of one of the following types:
   * string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
   * Browser only: FormData, File, Blob
   * Node only: Stream, Buffer
   * - timeout `timeout` specifies the number of milliseconds before the request times out.
   * If the request takes longer than `timeout`, the request will be aborted.
   * - cancelToken `cancelToken` specifies a cancel token that can be used to cancel the request
   * 其中只有 `get` , `delete` 请求无法通过 `data` 属性进行传输参数 只能通过 `params`(`params`也是拼接参数) 参数或者 直接在url中拼接参数
   * `post`, `put`, `head`, `options`, `patch` 可以通过 `data` 来传参数 或者通过 `params` 来传参数
   */
  get(path, opts) {
    return this.baseAxios.get(path, {
      ...opts
    })
  }

  /**
   * post 请求
   * @param {*} path
   * @param {*} opts
   */
  post(path, opts) {
    return this.baseAxios.post(path, opts.data, {
      ...opts
    })
  }

  /**
   * put 请求
   * @param {*} path
   * @param {*} opts
   */
  put(path, opts) {
    return this.baseAxios.put(path, opts.data, {
      ...opts
    })
  }

  /**
   * delete 请求
   * @param {*} path
   * @param {*} opts
   */
  delete(path, opts) {
    return this.baseAxios.delete(path, {
      ...opts
    })
  }

  /**
   * head 请求
   * @param {*} path
   * @param {*} opts
   */
  head(path, opts) {
    return this.baseAxios.head(path, {
      ...opts
    })
  }

  /**
   * options 请求
   * @param {*} path
   * @param {*} opts
   */
  options(path, opts) {
    return this.baseAxios.options(path, {
      ...opts
    })
  }

  /**
   * patch 请求
   * @param {*} path
   * @param {*} opts
   */
  patch(path, opts) {
    return this.baseAxios.patch(path, opts.data, {
      ...opts
    })
  }
}

export default BaseService
