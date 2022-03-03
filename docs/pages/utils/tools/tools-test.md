# 规则校验

## 使用

```js
rUtils.test.方法名()
```

## 验证是否为空

```js
/**
 * 验证是否为空
 * @param value
 * @param defaultValue
 * @return {string}
 */
function isNull(value, defaultValue = '-') {
  switch (typeof value) {
    case 'undefined':
      return defaultValue
    case 'string':
      if (value.includes('null') || value.includes('undefined')) return defaultValue
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return defaultValue
      break
    case 'boolean':
      if (!value) return defaultValue
      break
    case 'number':
      if (value === 0 || isNaN(value)) return defaultValue
      break
    case 'object':
      if (value === null || value.length === 0) return defaultValue
      for (const i in value) {
        return value
      }
      return defaultValue
  }
  return value
}
```

## 验证电子邮箱格式

```js
/**
 * 验证电子邮箱格式
 */
function isEmail(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)
}
```

## 验证手机格式

```js
/**
 * 验证手机格式
 */
function isMobile(value) {
  return /^1[23456789]\d{9}$/.test(value)
}
```

## 是否固定电话

```js
/**
 * 是否固定电话
 */
function isLandline(value) {
  return /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(value)
}
```

## 验证登录账号

规则：只能输入6到20位字母或者数字，或者数字和字母组合

```js
/**
 * 验证登录账号
 */
function isUserAccount(str) {
  return /^\w{6,20}$/.test(str)
}
```

## 验证密码

规则：(6-20位 正则表达式验证（数字+字母）或者（数字+特殊字符）或者（字母+特殊字符），不能是纯数字、纯字母、纯特殊字符，即只要符合这3个组合其中之一都为true)

```js
/**
 * 验证密码
 */
function isPassWord(str) {
  return /((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]{6,20}/i.test(str)
}
```

## 验证URL格式

```js
/**
 * 验证URL格式
 */
function isUrl(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value)
}
```

## 验证日期格式

```js
/**
 * 验证日期格式
 */
function isDate(value) {
  if (!value) return false
  // 判断是否数值或者字符串数值(意味着为时间戳)，转为数值，否则new Date无法识别字符串时间戳
  if (Number(value)) value = +value
  return !/Invalid|NaN/.test(new Date(value).toString())
}
```

## 验证整数

```js
/**
 * 验证整数
 */
function isDigits(value) {
  return /^\d+$/.test(value)
}
```

## 验证身份证号码

```js
/**
 * 验证身份证号码
 */
function isIdCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
}
```

## 是否车牌号

```js
/**
 * 是否车牌号
 */
function isCarNo(value) {
  // 新能源车牌
  const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
  // 旧车牌
  const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
  if (value.length === 7) {
    return creg.test(value)
  } else if (value.length === 8) {
    return xreg.test(value)
  } else {
    return false
  }
}
```

## 金额,只允许2位小数

```js
/**
 * 金额,只允许2位小数
 */
function isAmount(value) {
  // 金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value)
}
```

## 验证中文

```js
/**
 * 中文
 */
function isChinese(value) {
  return /^[\u4e00-\u9fa5]+$/gi.test(value)
}
```

## 只能输入字母

```js
/**
 * 只能输入字母
 */
function isLetter(value) {
  return /^[a-zA-Z]*$/.test(value)
}
```

## 只能是字母或者数字

```js
/**
 * 只能是字母或者数字
 */
function isEnOrNum(value) {
  return /^[0-9a-zA-Z]*$/g.test(value)
}
```
## 是否json字符串

```js
/**
 * 是否json字符串
 */
function isJsonStr(value) {
  if (typeof value === 'string') {
    try {
      var obj = JSON.parse(value)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
  return false
}
```

## 是否数组

```js
/**
 * 是否数组
 */
function isArray(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  } else {
    return Object.prototype.toString.call(value) === '[object Array]'
  }
}
```

## 是否对象

```js
/**
 * 是否对象
 */
function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}
```

## 是否短信验证码

```js
/**
 * 是否短信验证码
 */
function isCode(value, len = 6) {
  return new RegExp(`^\\d{${len}}$`).test(value)
}
```