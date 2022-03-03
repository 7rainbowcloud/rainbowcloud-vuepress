# 一、创建工具包项目

## 1.安装node

- 检查是否已经安装node(node中自带npm)

![](/images/utils/node.png)

## 2.创建项目

```sh
# 创建一个空的项目文件夹: atguigu-utils
# 在文件夹下执行命令
npm init -y
```

## 3.下载依赖包

```sh
npm i webpack webpack-cli
```

## 4.配置webpack

新建 `webpack.config.js`

```js
const path = require('path')
module.exports = {
  // 模式
  mode: 'development', // 也可以使用 production
  // 入口
  entry: './utils/index.js', 
  // 出口
  output: {
    // 打包文件夹
    path: path.resolve(__dirname, 'dist'),
    // 打包文件
    filename: 'rainbowcloud-utils.js', 
    // 向外暴露的对象的名称
    library: 'rUtils',
    // 打包生成库可以通过esm/commonjs/reqirejs的语法引入
    libraryTarget: 'umd', 
  },
}
```

## 5.在入口JS中暴露功能

`utils/index.js`

```js
export function test() {
  document.write('测试自定义包')
  console.log('test()')
}
```

## 6.配置打包命令

`package.json`

```js
"scripts": {
  "build:watch": "webpack --watch"
}
```

## 7.对项目进行打包

```sh
npm run build:watch
```

## 8.测试使用自定义包

`test.html`

```html
<body>
  <script src="./dist/rainbowcloud-utils.js"></script>
  <script>
    Utils.test()
  </script>
</body>
```
![](/images/utils/testbao.png)

