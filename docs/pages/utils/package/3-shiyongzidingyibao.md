# 三、使用自定义工具包

## 1.下载工具包

```sh
# 名称是你前面指定的库的名称
npm install rainbowcloud-utils
```

## 2.网页中引入并使用

```html
<script src="./node_modules/rainbowcloud-utils/dist/rainbowcloud-utils.js"></script>
<script>
  rUtils.test()
</script>
```

## 3.模块化引入并使用

```js
// 使用ESM引入
import rUtils from 'rainbowcloud-utils'
rUtils.test()

// 使用commonjs引入
const {test} = require('a-utils2')
test()
```

