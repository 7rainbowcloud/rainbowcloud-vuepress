const { defaultTheme } = require('@vuepress/theme-default')
const { searchPlugin } = require('@vuepress/plugin-search')
module.exports = {
  base: '/',
  lang: 'zh-CN',
  title: '7彩虹云',
  description: '7彩虹云-个人技术文档',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  theme: defaultTheme({
    home: '/',
    logo: '/images/logo.png',
    repo: 'https://gitee.com/wjyjiayu/rainbowcloud-web',
    repoLabel: 'Gitee',
    sidebarDepth: '2',
    editLink: false,
    lastUpdatedText: '最后更新时间',
    backToHome: '返回首页',
    toggleDarkMode: '切换夜间模式',
    toggleSidebar: '切换侧边栏',
    // 头部导航
    navbar: [
      { text: '管理系统', link: '/pages/admin/admin' },
      { text: 'ES6',link: '/pages/es6/module' },
      {
        text: 'Vue',
        children: [
          {
            text: 'Vue3',
            children: [
              { text: '教程文档', link: '/pages/vue3/vue3' },
            ]
          },
        ]
      },
      { text: '开发规范', link: '/pages/dev-standard/dev-standard' },
      {
        text: '工具库',
        children: [
          {
            text: '工具包',
            children: [
              { text: '工具包使用', link: '/pages/utils/tools/tools-install' },
              { text: '创建自己的npm包', link: '/pages/utils/package/1-chuangjiangongjubao' }
            ]
          },
          {
            text: '动画页面',
            children: [
              { text: '动画-1', link: 'https://7rainbowcloud.com/animation/animation-1.html' },
              { text: '动画-2', link: 'https://7rainbowcloud.com/animation/animation-2.html' },
              { text: '动画-3', link: 'https://7rainbowcloud.com/animation/animation-3.html' },
              { text: '动画-4', link: 'https://7rainbowcloud.com/animation/animation-4.html' },
              { text: '动画-5', link: 'https://7rainbowcloud.com/animation/animation-5.html' }
            ]
          },
        ]
      }
    ],
    // 左侧导航
    sidebar: {
      '/pages/admin/': ['admin'],
      '/pages/es6/': ['module'],
      '/pages/vue3/': [
        {
          text: 'vue3',
          children: ['vue3']
        }
      ],
      '/pages/utils/tools/': [
        {
          text: '工具包使用',
          children: ['tools-install', 'tools-array', 'tools-object', 'tools-test']
        }
      ],
      '/pages/utils/package/': [
        {
          text: '创建自己的npm包',
          children: ['1-chuangjiangongjubao', '2-fabudaonpmzhongyaoku', '3-shiyongzidingyibao']
        }
      ]
    }
  }),
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索文档',
        },
        '/zh/': {
          placeholder: '搜索',
        },
      },
      maxSuggestions: 10
    })
  ]
}
