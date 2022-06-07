# Module 的语法

## 浏览器使用模块化引入

浏览器加载 ES6 模块，也使用`<script>`标签，但是要加入`type="module"`属性。

```html
<script type="module" src="./m1.js"></script>
```

```html
<script type="module">
  import * as m1 from "./m1.js"
  console.log(as)
</script>
```

```js
// m1.js
export const name = '7rainbowcloud'
export function test() {
  console.log('7rainbowcloud')
}
```



## export 暴露数据

- 分别暴露

```js
// m1.js
export const name = '7rainbowcloud'
export const obj = { name: '7rainbowcloud' }
export function test() {
  console.log('7rainbowcloud')
}
```

- 统一暴露

```js
// m2.js
const name = '7rainbowcloud'
const obj = { name: '7rainbowcloud' }
function test() {
  console.log('7rainbowcloud')
}

export { name, obj, test}
```

- 默认暴露

```js
// m3.js
export default {
  name: '7rainbowcloud',
  obj: {
    name: '7rainbowcloud'
  },
  test() {
    console.log('7rainbowcloud')
  }
}
```



## import 引入数据

- 通用引入方式

```js
import * as m1 from './m1.js'
import * as m2 from './m2.js'
import * as m3 from './m3.js'
console.log(m1.name)
console.log(m2.name)
console.log(m3.name)
```

- 结构赋值形式

```js
import { name, test } from './m1.js'
console.log(name)

// 定义别名
import { name as rename, test as testFun } from './m2.js'
console.log(rename)
```

- 简便形式   <strong style="color:#DD5145">只针对与默认暴露</strong>

```js
import m3 from './m3.js'
```

