# 对象方法

## 使用

```js
rUtils.object.方法名()
```

## 深度克隆

```js
/**
 * @function 深度克隆
 * @param obj {Object}
 * @return Object
 */
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    // 原始类型直接返回
    return obj
  }
  const o = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}
  for (const i in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  }
  return o
}
```

## 对象深度合并

```js
/**
 * @function 对象深度合并
 * @param target <Object> 目标对象
 * @param source <Object> 源对象
 * @return target
 */
function deepMerge(target = {}, source = {}) {
  target = deepClone(target)
  if (typeof target !== 'object' || typeof source !== 'object') return false
  for (const prop in source) {
    // eslint-disable-next-line no-prototype-builtins
    if (!source.hasOwnProperty(prop)) continue
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop]
      } else if (typeof source[prop] !== 'object') {
        target[prop] = source[prop]
      } else if (target[prop].concat && source[prop].concat) {
        target[prop] = target[prop].concat(source[prop])
      } else {
        target[prop] = deepMerge(target[prop], source[prop])
      }
    } else {
      target[prop] = source[prop]
    }
  }
  return target
}
```

## 对象转url参数

- 使用

```js
rUtils.object.urlQueryParams()
```

- 源码

```js
/**
 * @function 对象转url参数
 * @param {*} data 对象
 * @param {*} isPrefix,是否自动加上"?"
 * @return string
 * @description 如把{name: 'lisa', age: 20}转换成?name=lisa&age=20
 */
function urlQueryParams(data = {}, isPrefix = true, arrayFormat = 'brackets') {
  const prefix = isPrefix ? '?' : ''
  const _result = []
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) === -1) arrayFormat = 'brackets'
  for (const key in data) {
    const value = data[key]
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      continue
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (let i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i])
          }
          break
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(_value => {
            _result.push(key + '[]=' + _value)
          })
          break
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(_value => {
            _result.push(key + '=' + _value)
          })
          break
        case 'comma':
          // 结果: ids=1,2,3
          // eslint-disable-next-line no-case-declarations
          let commaStr = ''
          value.forEach(_value => {
            commaStr += (commaStr ? ',' : '') + _value
          })
          _result.push(key + '=' + commaStr)
          break
        default:
          value.forEach(_value => {
            _result.push(key + '[]=' + _value)
          })
      }
    } else {
      _result.push(key + '=' + value)
    }
  }
  return _result.length ? prefix + _result.join('&') : ''
}
```