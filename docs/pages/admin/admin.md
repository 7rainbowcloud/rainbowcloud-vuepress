# 介绍:green_book:
## 快速了解

项目整体框架参考使用了GitHub开源后台管理框架 [若依](https://github.com/yangzongzhuan/RuoYi)  star 1.4K 对他进行了二次改善和封装，达到公司的开发需求场景。

不用IE我们大家都是好朋友！~

### 核心技术

- npm：node.js的包管理工具，用于统一管理我们前端项目中需要用到的包、插件、工具、命令等，便于开发和维护。
- ES6：Javascript的新版本，ECMAScript6的简称。利用ES6我们可以简化我们的JS代码，同时利用其提供的强大功能来快速实现JS逻辑。
- vue-cli：Vue的脚手架工具，用于自动生成Vue项目的目录及文件。
- vue-router： Vue提供的前端路由工具，利用其我们实现页面的路由控制，局部刷新及按需加载，构建单页应用，实现前后端分离。
- vuex：Vue提供的状态管理工具，用于统一管理我们项目中各种数据的交互和重用，存储我们需要用到数据对象。
- element-ui：基于MVVM框架Vue开源出来的一套前端ui组件。

### 内置功能

- 用户管理：用户是系统操作者，该功能主要完成系统用户配置。
- 菜单管理：配置系统菜单，操作权限，按钮权限标识等。
- 角色管理：角色菜单权限分配、设置角色数据范围权限划分。
- 部门管理：配置系统组织机构，树结构展现支持数据权限。
- 岗位管理：配置系统用户所属担任职务。
- 字典管理：对系统中经常使用的一些较为固定的数据进行维护。（例如：下拉框，复选框）
- 参数管理：对系统动态配置常用参数。
- 操作日志：系统正常操作日志记录和查询；系统异常信息日志记录和查询。
- 登录日志：系统登录日志记录查询包含登录异常。

## 环境部署

### 运行

```sh
# 强烈建议不要用直接使用 cnpm 安装，会有各种诡异的 bug，可以通过重新指定 registry 来解决 npm 安装速度慢的问题。
npm install --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
npm run dev
```

### 发布

**应用路径配置**

有些特殊情况需要部署到子路径下，例如：`https://www.1chalk.com/admin`，按照下面修改

修改 `.env.production` 文件中的 `VUE_APP_BASE_URL`

```js
VUE_APP_BASE_URL = '/admin/'
```

```sh
# 打包正式环境
npm run build:prod
```

`nginx`配置

::: tip 提示

这里不用管，服务端或测试人员会配置好的

:::

```sh
# 前端nginx路径配置
location /admin {
	alias   /home/admin;
	try_files $uri $uri/ /admin/index.html;
	index  index.html index.htm;
}
# 后端接口请求代理配置
location /prod-api/ {
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://localhost:8080/;
}
```

打开浏览器，输入：`https://www.1chalk.com/admin` 能正常访问和刷新表示成功。

### 环境变量

所有测试环境或者正式环境变量的配置都在 [.env.development](https://github.com/PanJiaChen/vue-element-admin/blob/master/.env.development)等 `.env.xxxx`文件中。

它们都会通过 `webpack.DefinePlugin` 插件注入到全局。

环境变量必须以`VUE_APP_`为开头。如:`VUE_APP_API`、`VUE_APP_TITLE`

在代码中可以通过如下方式获取:

```js
console.log(process.env.VUE_APP_xxxx)
```

::: warning 注意

环境配置修改后，需要重新运行才会生效

:::

## 文件结构

```
├── build                      // 构建相关  
├── public                     // 公共文件
│   ├── html           		   // ie浏览校验
│   ├── favicon.ico            // favicon图标
│   └── index.html             // html模板
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令 *权限*
│   ├── layout                 // 框架结构布局 (一般情况不需要改动)
|   ├── plugins				   // 全局封装方法 (提示框, 校验, 工具库, 日期处理库)
│   ├── router                 // 路由
│   ├── store                  // vuex
│   ├── utils                  // 项目全局的配置 (请求封装, 系统配置, 本地存储)
│   ├── views                  // 项目所有页面
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   ├── permission.js          // 路由守卫权限管理
├── .editorconfig              // 编码格式
├── .env.development           // 开发环境配置
├── .env.production            // 生产环境配置
├── .env.staging               // 测试环境配置
├── .eslintignore              // 忽略语法检查
├── .eslintrc.js               // eslint 配置项
├── .gitignore                 // git 忽略项
├── babel.config.js            // babel.config.js
├── package.json               // package.json
└── vue.config.js              // vue.config.js
```

## 布局结构

![](/images/web-admin/layout.png)

## 路由使用

框架的核心是通过路由自动生成对应导航，所以除了路由的基本配置，还需要了解框架提供了哪些配置项。

### 路由配置

`@/router/index.js` 路由配置项

```js
// 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
hidden: true // (默认 false)

//当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
redirect: 'noRedirect'

// 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
// 只有一个时，会将那个子路由当做根路由显示在侧边栏--如首页
// 若你想不管路由下面的 children 声明的个数都显示你的根路由
// 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
alwaysShow: true

name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
meta: {
  title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' // 设置该路由的图标，对应路径src/assets/icons/svg
  noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
  affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)

  // 当路由设置了该属性，则会高亮相对应的侧边栏。
  // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
  // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
  activeMenu: '/article/list'
}
```

**普通示例**

```js
{
  path: '/system',
  component: Layout,
  meta: { title: '系统管理', icon: 'dashboard'},
  children: [{
    path: 'user',
    name: 'User',
    component:() => import('@/views/system/user'),
    meta: { title: '用户管理',icon: 'dashboard' }
  }]
}
```

**外链示例**

```js
{
  path: 'https://1chalk.com',
  meta: { title: 'chalk管理系统', icon : "guide" }
}
```

### 静态路由

代表那些不需要动态判断权限的路由，如登录页、404、等通用页面，`@/router/index.js`配置对应的公共路由 `constantRoutes`。

### 动态路由

代表那些需要根据用户动态判断权限并通过`addRoutes`动态添加的页面，在`@/store/modules/permission.js`加载后端接口路由配置。

::: tip 提示

- 动态路由可以在系统管理-菜单管理进行新增和修改操作，前端加载会自动请求接口获取菜单信息并转换成前端对应的路由。
- 动态路由在生产环境下会默认使用路由懒加载，实现方式参考`loadView`方法的判断。

:::

### 常用方法

想要跳转到不同的页面，使用`router.push`方法

```js
this.$router.push({ path: "/system/user" });
```

跳转页面并设置请求参数，使用`query`属性

```js
this.$router.push({ path: "/system/user", query: {id: "1", name: "chalk"} });
```

## 页签缓存

路由 router 和路由对应的 view 页面一定要确保 两者的 name 是完全一致的。(切记 name 命名时候保证唯一性 切记不要和某些组件的命名重复了，不然会递归引用最后内存溢出等问题)

示例：

```js
// router
{
  path: 'user',
  name: 'User',
  component: (resolve) => require(['@/views/system/user'], resolve),
  meta: { title: '用户管理', icon: 'edit' }
}
```

```js
// 路由对应的view页面  system/user
export default {
  name: 'User'
}
```

**一定要保证两者的名字相同，切记写重或者写错。默认如果不写 name 就不会被缓存**

::: tip 提示
在系统管理-菜单管理-可以配置菜单页签是否缓存，默认为缓存
:::

## 模块开发

### 新增 view

**请先看目录 [模板页面](./#模板页面) 介绍用途**

在 `@/views ` 文件下 创建对应的文件夹，一个文件夹对应一个模块，模块里面一个路由对应一个 `.vue` 文件 ，各个模块维护自己的`utils`或`components`组件。

::: warning 注意
创建文件尽量命名有意义和模块意思相关的英文
:::

```
# 示例
views/
  system/
    components/
    user.vue
    role.vue
  ...
```

**.vue文件结构**

```vue
<!-- 推荐使用文档最底部模板页面 已经集成好增删改查基础功能 -->
<template>
  <!-- 不能删除class -->
  <el-card class="model-container">
      
  </el-card>
</template>

<script>
export default {
    name: 'Name',
}
</script>
<style lang="scss" scoped>

</style>
```

### 新增 api

在 `@/api` 文件夹下创建本模块对应的 api 服务。
::: warning 注意
创建文件尽和模块名保持一致
:::
```
# 示例
api/
  system/
    user.js
    role.js
  ...
```

**.js文件结构（必须）**

```js
import request from '@/utils/request'
/******************************调用API标椎模板*******************************************/
// 方法名字根据模块名字定义 

// 获取数据详情
export function getTestPageId(data) {
  return request({
    url: '/system/config/' + data,
    method: 'GET'
  })
}
// 获取数据
export function getTestPage(data) {
  return request({
    url: '/system/config/list',
    method: 'GET',
    params: data
  })
}
// 添加数据
export function addTestPage(data) {
  return request({
    url: '/system/config',
    method: 'POST',
    data: data
  })
}
// 编辑数据
export function editorTestPage(data) {
  return request({
    url: '/system/config',
    method: 'PUT',
    data: data
  })
}
// 删除数据
export function delTestPage(data) {
  return request({
    url: '/system/config/' + data,
    method: 'DELETE'
  })
}
```

### 新增组件

在全局的`@/components`写一些全局的组件，如富文本，各种上传组件，封装的分页组件等等能被公用的组件。 每个页面或者模块特定的业务组件则会写在当前`@/`views`下面
如：`@/views/system/user/components/xxx.vue`。这样拆分大大减轻了维护成本。

### 新增样式

页面的样式和组件是一个道理，全局的`@/assets/style`放置一下全局公用的样式，每一个页面的样式就写在当前 `views`下面，请记住加上`scoped` 就只会作用在当前组件内了，避免造成全局的样式污染。

## 请求流程

### 交互流程

为了方便管理维护，统一的请求处理都放在 `@/src/api` 文件夹中，并且一般按照 model 纬度进行拆分文件，如：

```
api/
  system/
    user.js
    role.js
  monitor/
    operlog.js
	logininfor.js
  ...
```

::: tip 提示
其中，`@/src/utils/request.js` 是基于axios 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误提示信息等。 它封装了全局 request拦截器、response拦截器、统一的错误处理、统一做了超时处理、baseURL设置等。
:::
### 请求示例

```js
// api/system/user.js
import request from '@/utils/request'

// 查询用户列表
export function getUser(query) {
  return request({
    url: '/system/user/list',
    method: 'GET',
    params: query
  })
}

// views/system/user/index.vue
// 单个引入
// import { getUser } from "../../api/system/user"
// 生命关键字全部引入
import * as user from '../../api/system/user'

export default {
  data() {
    userOption: null,
  },
  methods: {
    getList() {
      user.getUser().then(response => {
        this.userOption = response
      })
    }
  }
}
```

::: tip 提示
如果有不同的`baseURL`，直接通过覆盖的方式，让它具有不同的`baseURL`。
如果不需要传`token`，`headers`配置属性`isToken： false`，可自定义`token`的值
::: 
```js
 export function getUser(query) {
   return request({
     url: '/system/user/list',
     method: 'GET',
     params: query,
     baseURL: 'xxxxxx',
     headers: {
       isToken: false
       // 可以自定义 Authorization
       // 'Authorization': 'Basic d2ViOg=='
     },
   })
 }
```

## 通用方法

所有通用方法都封装在`@/plugins`

### $tab 对象

`$tab`对象用于做页签操作、刷新页签、关闭页签、打开页签、修改页签等，它定义在`plugins/tab.js`文件中，方法如下：

- 打开页签

```js
this.$tab.openPage("用户管理", "/system/user");

this.$tab.openPage("用户管理", "/system/user").then(() => {
  // 执行结束的逻辑
})
```

- 修改页签

```js
const obj = Object.assign({}, this.$route, { title: "自定义标题" }) 
this.$tab.updatePage(obj);

this.$tab.updatePage(obj).then(() => {
  // 执行结束的逻辑
})
```

- 关闭页签

```js
// 关闭当前tab页签，打开新页签
const obj = { path: "/system/user" };
this.$tab.closeOpenPage(obj);

// 关闭当前页签，回到首页
this.$tab.closePage();

// 关闭指定页签
const obj = { path: "/system/user", name: "User" };
this.$tab.closePage(obj);

this.$tab.closePage(obj).then(() => {
  // 执行结束的逻辑
})
```

- 关闭所有页签

```js
this.$tab.closeAllPage();

this.$tab.closeAllPage().then(() => {
  // 执行结束的逻辑
})
```

- 关闭左侧页签

```js
this.$tab.closeLeftPage();

const obj = { path: "/system/user", name: "User" };
this.$tab.closeLeftPage(obj);

this.$tab.closeLeftPage(obj).then(() => {
  // 执行结束的逻辑
})
```

- 关闭右侧页签

```js
this.$tab.closeRightPage();

const obj = { path: "/system/user", name: "User" };
this.$tab.closeRightPage(obj);

this.$tab.closeRightPage(obj).then(() => {
  // 执行结束的逻辑
})
```

- 关闭其他tab页签

```js
this.$tab.closeOtherPage();

const obj = { path: "/system/user", name: "User" };
this.$tab.closeOtherPage(obj);

this.$tab.closeOtherPage(obj).then(() => {
  // 执行结束的逻辑
})
```

- 刷新页签

```js
// 刷新当前页签
this.$tab.refreshPage();

// 刷新指定页签
const obj = { path: "/system/user", name: "User" };
this.$tab.refreshPage(obj);

this.$tab.refreshPage(obj).then(() => {
  // 执行结束的逻辑
})
```



### $auth 对象

`$auth`对象用于验证用户是否拥有某些权限或角色，它定义在`plugins/auth`文件中，方法如下：

- 验证用户权限

```js
// 验证用户是否具备某权限
this.$auth.hasPermi("system:user:add")
// 验证用户是否含有指定权限，只需包含其中一个
this.$auth.hasPermiOr(["system:user:add", "system:user:update"])
// 验证用户是否含有指定权限，必须全部拥有
this.$auth.hasPermiAnd(["system:user:add", "system:user:update"])
```

- 验证用户角色

```js
// 验证用户是否具备某角色
this.$auth.hasRole("admin")
// 验证用户是否含有指定角色，只需包含其中一个
this.$auth.hasRoleOr(["admin", "common"])
// 验证用户是否含有指定角色，必须全部拥有
this.$auth.hasRoleAnd(["admin", "common"])
```

### $cache 对象

`$cache`对象用于处理缓存。不建议直接使用`sessionStorage`或`localStorage`，因为项目的缓存策略可能发生变化，且不美观；通过`$cache`对象做一层调用代理的封装处理，定义在`plugins/cache `文件中。

`$cache`提供`session`和`local`两种级别的缓存，方法如下：

| 对象名称 | 缓存类型                           |
| :------- | ---------------------------------- |
| session  | 会话级缓存，通过sessionStorage实现 |
| local    | 本地级缓存，通过localStorage实现   |

**示例**

```js
// local 普通值
this.$cache.local.set('key', 'local value')
console.log(this.$cache.local.get('key')) // 输出'local value'

// local JSON值
this.$cache.local.setJSON('jsonKey', { local: 1 })
console.log(this.$cache.local.getJSON('jsonKey')) // 输出'{local: 1}'

// session 普通值
this.$cache.session.set('key', 'session value')
console.log(this.$cache.session.get('key')) // 输出'session value'

// session JSON值
this.$cache.session.setJSON('jsonKey', { session: 1 })
console.log(this.$cache.session.getJSON('jsonKey')) // 输出'{session: 1}'
```

### $modal 对象

`$modal`对象用于做消息提示、通知提示、对话框提醒、二次确认、遮罩等，定义在`plugins/modal`文件中，方法如下：

- 反馈信息

```js
this.$modal.msg("默认反馈")
this.$modal.msgError("错误反馈")
this.$modal.msgSuccess("成功反馈")
this.$modal.msgWarning("警告反馈")
```

- 提示信息

```js
this.$modal.alert("默认提示")
this.$modal.alertError("错误提示")
this.$modal.alertSuccess("成功提示")
this.$modal.alertWarning("警告提示")
```

- 通知信息

```js
this.$modal.notify("默认通知");
this.$modal.notifyError("错误通知");
this.$modal.notifySuccess("成功通知");
this.$modal.notifyWarning("警告通知")
```

- 确认弹窗信息

```js
this.$modal.confirm("是否确认提交？").then(() => {
   console.log('点击确认按钮')
}).catch(() => {
   console.log('点击取消按钮')
})
```

- 遮罩层信息

```js
// 打开遮罩层
this.$modal.loading("正在导出数据，请稍后...")
// 关闭遮罩层
this.$modal.closeLoading()
```

### $test 对象

`$test `对象用于做检验规则，正则匹配等，定义在`plugins/test`文件中，方法如下：

**示例**

```js
/* 部分方法示例 完整看plugins/test/test.js */
this.$test.isNull('value') // 验证是否为空
this.$test.isMobile('value') // 验证手机格式
this.$test.isIdCard('value') // 验证身份证号码
this.$test.isEmail('value') // 验证电子邮箱格式
....
// 可以自定义去加
```

### $utils 对象

`$utils  `对象用于封装一些js工具库，定义在`plugins/utils`文件中，方法如下：

```js
/* 部分方法示例 完整看plugins/utils/utils.js */
/**
 * @function handleTree 构造树型结构数据
 * @function deepClone 深度克隆
 * @function queryParams 对象转url参数
 * @function getQueryString 获取url拼接参数
 * ..... 可以自定义去加
 */
```

### $export 导出

`$Export  `对象用于项目所有的导出Excel功能封装处理，定义在`plugins/excel `文件中。

1、第一种方法：通过数据源导出
::: warning 注意
此方法无法导出带有图片的数据；如需图片导出请用第二种方法
:::

```vue
<template>
    <el-button @click="exportExcel">导出</el-button>
</template>
<script>
	export default {
        methods: {
            // 导出按钮操作
            exportExcel() {
                /**
                 * 数据固定格式 （必须是组装成这样的数据格式）！
                 * 注意: title、data固定属性key不可自定义; sheet: 页签名称可不传,默认取文件名称
                 */
                // 示例
                const tableOption =  [
                   {
                    sheet: '页签1',
                    title: ['姓名', '年龄', '性别'],
                    data: [
                       ['小王', 18, '女'],
                       ['小红', 8, '男'],
                       ['小啊', 60, '女']
                     ]
                   },
                   {
                     sheet: '页签2',
                     title: ['身高', '体重', '住址'],
                     data: [
                       ['162cm', '20kg', '北京市'],
                       ['186cm', '65kg', '西安市'],
                       ['145cm', '45kg', '中国']
                     ]
                   }
                ]
				this.$export.dataExportExcel(tableOption, '导出文件名称')
            }
        }
    }
</script>
```

2、第二种方法：通过数据源导出（可导出图片）

```vue
<template>
    <el-button @click="exportExcel">导出</el-button>
</template>
<script>
	export default {
        methods: {
            // 导出按钮操作
            exportExcel() {
                /**
                 * 数据固定格式
                 */
                /**
                 * column数据的说明
                 * 1.title为column的标题
                 * 2.key为column对应的key
                 * 3.type默认是text，若为图片格式type为image , 并且可以设置图片的宽高
                 */
                const column = [
                    {
                      title: '标题',
                      key: 'title',
                      type: 'text'
                    },
                    {
                      title: '图片',
                      key: 'img',
                      type: 'image',
                      width: 50,
                      height: 50
                    }
                  ]
                  // 数据源
                  const dataOption = [
                    {
                      title: '标题1',
                      img: 'https://avatar.csdnimg.cn/2/1/E/3_qq_40576549_1564381773.jpg'
                    },
                    {
                      title: '标题2',
                      img: 'https://avatar.csdnimg.cn/2/1/E/3_qq_40576549_1564381773.jpg'
                    }
                  ]
				this.$export.imgExportExcel(column, dataOption, '导出文件名称')
            }
        }
    }
</script>
```



### $download 下载

`$download`对象用于文件下载，它定义在`plugins/download.js`文件中。方法如下：

- 根据下载url路径下载

```js
const fileUrl = "https:://1chalk.com/profile/upload/xxxxxxx.png";

this.$download.url(fileUrl, '文件名称')
```

- 根据二进制文档流下载

```js
this.$download.url(dataBlob, '文件名称', '.xlsx')
```

### $print 打印

`$print`对象用于文件下载，它定义在`plugins/print.js`文件中。方法如下：

```vue
<el-button type="primary" @click="handlePrint">打印全部</el-button>
<el-button type="primary" @click="handlePrint1">打印局部</el-button>
<el-button type="primary" @click="handlePrint2">打印DOM</el-button>
<div id="test">
  <h2 style="color:red">我是测试字段</h2>
</div>
<script>
export default {
  methods: {
    handlePrint() {
      this.$print('#app');
    },
    handlePrint1(){
      this.$print('#test');
    },
    handlePrint2(){
      this.$print(document.querySelector('.logo'));
    }
  }
}
</script>
```
**API**

| 参数 | 说明                                                                  | 类型              | 默认值                      |
|-----------|:--------------------------------------------------------------------|-----------------|--------------------------|
| id   | dom元素的id                                                 | String | - |
| html | html代码片段                                    | String | - |


### $chalk 对象

项目框架内所必要的方法；这个文件比较特殊，不能自定义新增或者修改，只可以用。

有以下几种方法使用：

```js
// 重置表单
// <el-form ref="dialogBindData"></el-form>
this.$resetForm('dialogBindData')

// 清除表单
// <el-form ref="dialogBindData"></el-form>
this.$clearForm('dialogBindData')

// 条件查询添加日期范围
// this.queryParams = { name: '搜索条件' }
// this.dateRange = ['2021-08-08', '2021-09-09']
this.searchAddDateRange(this.queryParams, this.dateRange, ['startTime', 'enTime'])
```



## 使用图标

全局 Svg Icon 图标组件。也可以使用Element 图标库

默认在 `@/assets/icons` 中注册到全局中，可以在项目中任意地方使用。所以图标均可在 `@/assets/icons/svg`可自行添加或者删除图标，所有图标都会被自动导入，无需手动操作。

### 使用图标

```vue
<!-- icon-class 为 icon 的名字; class-name 为 icon 自定义 class-->
<svg-icon icon-class="password"  class-name='custom-class' />
```

### 改变颜色

`svg-icon`默认会读取父级`color`，你可以改变父级的`color`或者直接改变`fill`的颜色即可。

::: tip 提示
需要下载图标可去 [iconfont](https://www.iconfont.cn/home/index) 矢量图标库下载.svg格式，规范一下图标的大小问题，不然可能会造成项目中的图标大小尺寸不统一的问题。 项目中使用的图标都是 128*128 大小规格的。
:::
## 权限使用

项目`@/directive` 下已经封装了全局指令权限，能够简单快速的实现按钮级别的权限判断。

**使用权限字符串  v-hasPermi**

```vue
// 单个
<el-button v-hasPermi="['system:user:add']">存在权限字符串才能看到</el-button>
// 多个
<el-button v-hasPermi="['system:user:add', 'system:user:edit']">包含权限字符串才能看到</el-button>
```

**使用角色字符串  v-hasRole**

```vue
// 单个
<el-button v-hasRole="['admin']">管理员才能看到</el-button>
// 多个
<el-button v-hasRole="['role1', 'role2']">包含角色才能看到</el-button>
```

::: tip 提示
按钮权限可使用 v-hasPermi指令来判断。元素标签组件，需要设置v-if，可以使用全局权限判断函数，用法和指令 v-hasPermi 类似。
:::
```vue
<template>
  <el-tabs>
    <el-tab-pane v-if="$checkPermi(['system:user:add'])" label="用户管理" name="user">用户管理</el-tab-pane>
    <el-tab-pane v-if="$checkPermi(['system:user:add', 'system:user:edit'])" label="参数管理" name="menu">参数管理</el-tab-pane>
    <el-tab-pane v-if="$checkRole(['admin'])" label="角色管理" name="role">角色管理</el-tab-pane>
    <el-tab-pane v-if="$checkRole(['admin','common'])" label="定时任务" name="job">定时任务</el-tab-pane>
   </el-tabs>
</template>
```

## 字典使用

字典管理是用来维护数据类型的数据，如下拉框、单选按钮、复选框、树选择的数据，方便系统管理员维护。主要功能包括：字典分类管理、字典数据管理

**有两种方法使用**

第一种方法（**优先推荐使用**）

1、加载数据字典，可以是多个。

```js
export default {
  dicts: ['字典类型'],
  ...
}
```

2、读取数据字典

```vue
<dict-select v-model="value" :options="dict.type.字典类型" />
```

3、翻译数据字典

```vue
// 字典标签组件翻译
<el-table-column label="名称">
  <template slot-scope="{ row }">
    <dict-tag :options="dict.type.字典类型" :value="row.name"/>
  </template>
</el-table-column>

// 自定义方法翻译
{{ xxxxFormat(row) }}

xxxxFormat(row) {
  return this.$chalk.selectDictLabel(this.dict.type.字典类型, row.name);
},
```

第二种方法

1、加载数据字典

```js
export default {
  data() {
    return {
      xxxxxOptions: [],
      .....
    }
  },
  created() {
      this.$api.getDicts("字典类型").then(response => {
      	this.xxxxxOptions = response.data;
      });
  }
}
```

2、读取数据字典

```vue
<dict-select v-model="value" :options="xxxxxOptions" />
```

4、翻译数据字典

```vue
// 字典标签组件翻译
<el-table-column label="名称" align="center" prop="name">
  <template slot-scope="{ row }">
    <dict-tag :options="xxxxxOptions" :value="row.name"/>
  </template>
</el-table-column>

// 自定义方法翻译
{{ xxxxFormat(row) }}
xxxxFormat(row) {
  return this.$chalk.selectDictLabel(this.xxxxxOptions, row.name);
},
```

## 参数使用

参数设置是提供开发人员、实施人员的动态系统配置参数，不需要去频繁修改后台配置文件，也无需重启服务器即可生效。

```js
this.$api.getConfigKey("参数键名").then(response => {
  this.xxxxx = response.data;
});
```

## 事件总线

 在vue项目中，父子组件间的通讯很方便。但兄弟组件或多层嵌套组件间的通讯，就会比较麻烦。这时，使用eventBus通讯，就可以很便捷的解决这个问题。

1. 引入到使用的组件

```js
import EventBus from '@/utils/eventBus'
```

2. 触发事件

```js
EventBus.$emit('eventName', param1,param2,...)
```

3. 监听事件（通常在mounted或created中声明）

```js
EventBus.$on('eventName', (param1,param2,...) => {
    // 需要执行的代码
})
```

4. 移除监听事件

::: tip 提示
为了避免在监听时，事件被反复触发，通常需要在页面销毁时移除事件监听。或者在开发过程中，由于热更新，事件可能会被多次绑定监听，这时也需要移除事件监听
:::

```js
EventBus.$off('eventName')
```

## 全局组件

### 树形选择组件

```vue
<template>
	<treeselect
    	v-model="xxxxx"
        :options="树的数据"
        :normalizer="normalizer"
        show-count
        placeholder="选择上级菜单"
    />
</template>
<script>
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
        components: { Treeselect },
        methods: {
            /** 转换菜单数据结构 如果默认字段一样则不需要加 */
            normalizer(node) {
              if (node.children && !node.children.length) {
                delete node.children
              }
              return {
                id: node.id,
                label: node.label,
                children: node.children
              }
            }
        }
    }
</script>
```

### 富文本组件

```vue
/**
* 组件属性值
* height 高度
* minHeight 最小高度
* readOnly 只读
* fileSize 上传文件大小限制(MB)
*/
<template>
	<editor v-model="xxxx" :min-height="192"/>
</template>
```

### 表格分页组件

```vue
<template>
    <pagination
        v-show="rowCount>0"
        :total="rowCount"
        :page.sync="queryParams.current"
        :limit.sync="queryParams.size"
        @pagination="getList"
    />
</template>
<script>
export default {
    data() {
    	return {
            // 查询参数
          queryParams: {
            current: 1,
            size: 10
          },
          rowCount: 8, // 总条数
    	}
    },
    methods: {
        /** 查询列表 */
        getList() {
            this.dataLoading = true
            templateApi.getTestPage(this.queryParams).then(res => {
                this.dataOption = res.data.records
                this.rowCount = res.data.total
                this.dataLoading = false
            })
        }
    }
}
</script>
```

### 图片上传组件

```vue
/**
* 组件属性值
* limit 图片数量限制 默认 5
* isShowTip 是否显示提示 默认 true
* fileType 文件类型, 例如['png', 'jpg', 'jpeg']
* fileSize 上传文件大小限制(MB) 默认 5
*/
<template>
	<image-upload v-model="xxxx"/>
</template>
```

### 文件上传组件

```vue
/**
* 组件属性值
* limit 图片数量限制 默认 5
* isShowTip 是否显示提示 默认 true
* fileType 文件类型, 例如['doc', 'xls', 'ppt', 'txt', 'pdf']
* fileSize 上传文件大小限制(MB) 默认 5
*/
<template>
	<file-upload v-model="xxxx"/>
</template>
```

### 大屏自适应组件

新建vue页面，直接复制下面模板到页面

::: warning 注意

所有组件必须全部写在  `class="scale-screen-main"`  里面

:::

```vue
<template>
  <scale-screen full-screen>
    <div class="scale-screen-main">
      <!-- 所有组件全部写在这里 -->
    </div>
  </scale-screen>
</template>

<script>
import ScaleScreen from '@/components/ScaleScreen'
export default {
  name: 'visualPage',
  components: { ScaleScreen },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.scale-screen-main{
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
```
**API**

| 属性        | 说明                                                                  | 类型              | 默认值                      |
|-----------|:--------------------------------------------------------------------|-----------------|--------------------------|
| width     | 大屏宽度（设计稿宽度）                                                         | Number \|String         | 1920 |
| height   | 大屏高度（设计稿高度）                                            | Number \|String | 1080 |
| autoScale | 自适应配置，配置为boolean类型时，为启动或者关闭自适应，配置为对象时，若x为true，x轴产生边距，y为true时，y轴产生边距，启用fullScreen时此配置失效 | boolean\|{x:boolean,y:boolean} | true                     |
| delay     | 窗口变化防抖延迟时间                                                          | Number          | 500                      |
| fullScreen | 全屏自适应，启用此配置项时会存在拉伸效果，同时autoScale失效，非必要情况下不建议开启 | boolean | false |
| backgroundColor | 页面背景色                                                  | String    | #000                   |



## 修改element-ui样式

在组件内修改elementui样式需要加上::v-deep, less需要使用 /deep/ 正常css需要使用 >>>

- 修改单个elementui的样式

```css
<style lang="scss" scoped>
::v-deep .el-input{

}
::v-deep .el-tablet{
    
}
::v-deep .el-button{
    
}
</style>
```

- 修改多个elementui的样式

```css
<style lang="scss" scoped>
::v-deep {
    .el-table {}
    .el-input {}
    .el-button {}
}
</style>
```



## 模板页面

为什么会有模板页面？因为后台管理系统页面大体一致，基本都是的增删改查，只不过就是调用的地址，和字段名称不一样，其他东西都是一致的，只需要修改对应模块的字段名称以及接口地址就大功告成了 so easy ~。所以就单独写了一个模板页面能够快速实现开发效率，达到开箱即用！

路径`src/template.vue` ，里面集成了增、删、改、查基础功能，用法就是在需要开发的模块新建一个.vue页面，然后可以直接把模板页面对应的所有内容复制粘贴过去，注意：复制到新页面修改`name: 'Template'`改为当前页面页面的文件名并且首字母大写！在浏览器就直接可以看到模板页的资源信息了，只需要自己对对应的模块修修改改就欧克了~

优点：不需要重新在写实现增删改查的方法，不需要修改样式，风格保持统一；

缺点：没有缺点 :grinning:

::: tip 提示
如果开发的页面没有不符合模板页面，那就自己手写吧。如果开发需求一致，那就直接粘贴过来使用吧，强烈推荐！
:::

## 开发规范

- 命名规范

```
项目命名
	全小写-隔开  my-project-name
    
目录命名: 全小写 

文件命名:小写开头、驼峰命名、或全小写
    tempLate.html
    tempLate.css
    tempLate.js
    
css命名规范
	class 驼峰命名
 
js命名规范
	变量:小驼峰         maxCount
    常量:全大写_隔开     MAX_COUNT
    方法:
    	小驼峰、
        前缀应当为动词(get/set/is/has/can/load/hand)
        getData()
```

- 注释必须要有，每个方法添加好注释，个别特殊标签，变量也需要加。

- 所有的 input输入框必须通过v-model.trim绑定；去除首末位空格。

- 输入框带有手机号，邮箱，密码....输入框，必须添加校验规则。

- 列表数据必须加loading加载，提交保存按钮也必须要加loading加载，防止重复提交。

- 有关敏感重要的操作，必须加二次确认框入；如：删除操作

## ESLint 代码规范

ESLint 是一个集代码审查和修复的工具，它的核心功能是通过配置一个个规则来限制代码的合法性和风格，保证代码的可读性。

由于项目开发人员多，工具不固定，代码于一起，所以就出现了代码规范性的问题。

#### VSCode 开发者

首先需要把 ESLint 扩展安装到 VSCode 里，安装完成后，需要在设置里写入配置：

- 在 VSCode 左下角找到一个齿轮 ⚙ 图标，点击后选择设置选项，这个时候打开了设置面板；

- 然后在 VSCode 右上角找到打开设置（json）的图标，点击后，会打开 settings.json 文件；

- 然后把以下配置贴进去即可;

  ```js
  {
      "eslint.alwaysShowStatus": true,  // 总是在 VSCode 显示 ESLint 的状态
      "eslint.quiet": true,             // 忽略 warning 的错误
      "editor.codeActionsOnSave": {     // 保存时使用 ESLint 修复可修复错误
          "source.fixAll": true,
          "source.fixAll.eslint": true
      } 
  }
  ```

  当这样配置之后呢，每次编辑代码 ESLint 都会实时校验代码，且当保存的时候会自动修复，不过对于有些无法自动修复的代码就需要你手动去修改了。

#### WebStorm 开发者

- 左上角File>Settings
- 搜索ESLint
- 以下配置：

![](/images/web-admin/webstrom-eslint.png)
