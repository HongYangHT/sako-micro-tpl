/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 常用功能函数
 * @Date: 2019-07-10 10:23:22
 * @LastEditTime: 2019-07-10 11:14:56
 */
/**
 * 是否是除 `symbool` 外基本数据类型
 * @param {*} value
 */
export function isStatic(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined' ||
    value === null
  )
}

/**
 * 是否是原始数据类型
 * @param {*} value
 */
export function isPrimitive(value) {
  return isStatic(value) || typeof value === 'symbol'
}

/**
 * 是否是引用数据类型 eg: Array， function，object， String， Number， Regex
 * @param {*} value
 */
export function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

/**
 * 是否是类对象
 * @param {*} value
 */
export function isObjectLike(value) {
  return value != null && typeof value === 'object'
}

/**
 * d当前数据类型
 * @param {*} value
 */
export function getRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * 对象
 * @param {*} obj
 */
export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 数组
 * @param {*} arr
 */
export function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 * 正则
 * @param {*} value
 */
export function isRegExp(value) {
  return Object.prototype.toString.call(value) === '[object RegExp]'
}

/**
 * 日期
 * @param {*} value
 */
export function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]'
}

/**
 * 浏览器内置函数
 * @param {*} value
 */
export function isNative(value) {
  return typeof value === 'function' && /native code/.test(value.toString())
}

/**
 * 函数
 * @param {*} value
 */
export function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]'
}

/**
 * 是否是有效数组长度
 * @param {*} value
 */
export function isLength(value) {
  return (
    typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER
  )
}

/**
 * 是否是类数组
 * @param {*} value
 */
export function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value)
}

/**
 * 是否为空
 * @param {*} value
 */
export function isEmpty(value) {
  if (value == null) {
    return true
  }
  if (isArrayLike(value)) {
    return !value.length
  } else if (isPlainObject(value)) {
    for (const key in value) {
      if (hasOwnProperty.call(value, key)) {
        return false
      }
    }
    return true
  }
  return false
}

const camelizeRE = /-(\w)/g
/**
 * 转化驼峰
 * @param {*} str
 */
export function camelize(str) {
  return str.replace(camelizeRE, function(_, c) {
    return c ? c.toUpperCase() : ''
  })
}

const hyphenateRE = /\B([A-Z])/g
/**
 * 转化连字符
 * @param {*} str
 */
export function hyphenate(str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}

/**
 * 首字母大写
 * @param {*} str
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 浅复制
 * @param {*} to
 * @param {*} _from
 */
export function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

/**
 * 浅复制，可使用 object.assign
 * @param {*} source
 * @param {*} target
 */
export function swollowClone(source, target) {
  if (arguments.length === 0) throw new TypeError('Cannot convert undefined or null to object')

  let key
  target.forEach(function(item) {
    for (key in item) {
      item.hasOwnProperty(key) && (source[key] = item[key])
    }
  })
  return source
}

/**
 * 深度clone
 * @param {*} value
 * @param {*} deep
 */
export function clone(value, deep = true) {
  // 基础数据类型
  if (isPrimitive(value)) {
    return value
  }

  if (isArrayLike(value)) {
    // 是类数组
    value = Array.prototype.slice.call(value)
    return value.map(item => (deep ? clone(item, deep) : item))
  } else if (isPlainObject(value)) {
    // 是对象
    const target = {}
    let key
    for (key in value) {
      value.hasOwnProperty(key) && (target[key] = deep ? clone(value[key], deep) : value[key])
    }
  }

  const type = getRawType(value)

  switch (type) {
    case 'Date':
    case 'RegExp':
    case 'Error':
      value = new window[type](value)
      break
  }
  return value
}

/**
 * 数组去重
 * @param {*} arr
 */
export function unique(arr) {
  if (!isArrayLike(arr)) {
    // 不是类数组对象
    return arr
  }
  const result = []
  const objarr = []
  const obj = Object.create(null)

  arr.forEach(item => {
    if (isStatic(item)) {
      // 是除了symbol外的原始数据
      const key = `${item}_${getRawType(item)}`
      if (!obj[key]) {
        obj[key] = true
        result.push(item)
      }
    } else {
      // 引用类型及symbol
      if (!objarr.includes(item)) {
        objarr.push(item)
        result.push(item)
      }
    }
  })

  return result
}

/**
 * format date
 * @param {*} formater
 * @param {*} t
 */
export function dateFormater(formater, t) {
  const date = t ? new Date(t) : new Date()
  const Y = `${date.getFullYear()}`
  const M = date.getMonth() + 1
  const D = date.getDate()
  const H = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  return formater
    .replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
}

/**
 * 获取对象值
 * @param {*} obj
 * @param {*} path
 * @param {*} strict
 */
export function getPropByPath(obj, path, strict) {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1') // 将[0]转化为.0
  path = path.replace(/^\./, '') // 去除开头的.

  const keyArr = path.split('.') // 根据.切割
  let i = 0
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break
    const key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      if (strict) {
        // 开启严格模式，没找到对应key值，抛出错误
        throw new Error('please transfer a valid prop path to form item!')
      }
      break
    }
  }
  return {
    o: tempObj, // 原始数据
    k: keyArr[i], // key值
    v: tempObj ? tempObj[keyArr[i]] : null // key值对应的值
  }
}

/**
 * 查询参数
 */
export function GetUrlParam() {
  const url = document.location.toString()
  let arrObj = url.split('?')
  const params = Object.create(null)
  if (arrObj.length > 1) {
    arrObj = arrObj[1].split('&')
    arrObj.forEach(item => {
      item = item.split('=')
      params[item[0]] = item[1]
    })
  }
  return params
}

/**
 * 设置全屏
 */
export function toFullScreen() {
  const elem = document.body
  elem.webkitRequestFullScreen
    ? elem.webkitRequestFullScreen()
    : elem.mozRequestFullScreen
    ? elem.mozRequestFullScreen()
    : elem.msRequestFullscreen
    ? elem.msRequestFullscreen()
    : elem.requestFullScreen
    ? elem.requestFullScreen()
    : alert('浏览器不支持全屏')
}

/**
 * 退出全屏
 */
export function exitFullscreen() {
  const elem = parent.document
  elem.webkitCancelFullScreen
    ? elem.webkitCancelFullScreen()
    : elem.mozCancelFullScreen
    ? elem.mozCancelFullScreen()
    : elem.cancelFullScreen
    ? elem.cancelFullScreen()
    : elem.msExitFullscreen
    ? elem.msExitFullscreen()
    : elem.exitFullscreen
    ? elem.exitFullscreen()
    : alert('切换失败,可尝试Esc退出')
}

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function(callback) {
    // 为了使setTimteout的尽可能的接近每秒60帧的效果
    window.setTimeout(callback, 1000 / 60)
  }

window.cancelAnimationFrame =
  window.cancelAnimationFrame ||
  Window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.msCancelAnimationFrame ||
  window.oCancelAnimationFrame ||
  function(id) {
    // 为了使setTimteout的尽可能的接近每秒60帧的效果
    window.clearTimeout(id)
  }

/**
 * 非数字
 * @param {*} v
 */
export function _isNaN(v) {
  return !(typeof v === 'string' || typeof v === 'number') || isNaN(v)
}

/**
 * 过滤非数字，查询最大值
 * @param {*} arr
 */
export function max(arr) {
  arr = arr.filter(item => !_isNaN(item))
  return arr.length ? Math.max.apply(null, arr) : undefined
}

/**
 * 过滤非数字，并求最小值
 * @param {*} arr
 */
export function min(arr) {
  arr = arr.filter(item => !_isNaN(item))
  return arr.length ? Math.min.apply(null, arr) : undefined
}
