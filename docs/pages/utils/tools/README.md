---
sidebarDepth: 2
---

# 安装使用

#### 1.npm 安装

```sh
npm i rainbowcloud-utils
```

#### 2.全局使用

- 引入

`main.js`

```js
import rUtils from 'rainbowcloud-utils'
// 原型注册
Vue.prototype.$rUtils = rUtils
```

- 使用

`.vue `

```js
this.$rUtils.object.deepClone()
```

#### 3.单个使用

`.vue` 

- 引入

```js
import rUtils from 'rainbowcloud-utils'
```

- 使用

```js
rUtils.object.deepClone()
```

#### rUtils 属性类

```js
// 规则校验
rUtils.test.xxx
// 数组方法
rUtils.array.xxx
// 对象方法
rUtils.object.xxx
```

