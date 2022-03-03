module.exports = {
  base: '/',
  title: '7彩虹云',
  description: '7彩虹云',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  serviceWorker: true, // 是否开启 PWA
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '/images/logo.png',
    lastUpdated: 'Last Updated',
    // sidebar: 'auto',
    sidebarDepth: '2',
    // 头部导航
    nav: [
      { text: '管理系统', link: '/pages/admin/admin' },
      {
        text: 'Vue',
        items: [
          {
            text: 'Vue3',
            items: [
              { text: '教程文档', link: '/pages/vue3/vue3' },
            ]
          },
        ]
      },
      { text: '开发规范', link: '/pages/dev-standard/dev-standard' },
      {
        text: '工具库',
        items: [
          {
            text: '工具包',
            items: [
              { text: '工具包使用', link: '/pages/utils/tools/tools-array' },
              { text: '创建自己的npm包', link: '/pages/utils/package/1_创建工具包项目' }
            ]
          },
          {
            text: '动画页面',
            items: [
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
      '/pages/vue3/': ['vue3'],
      '/pages/utils/tools/': [
        {
          title: '工具包使用',
          collapsable: false,
          children: [
            '',
            'tools-array',
            'tools-object',
            'tools-test'
          ]
        }
      ],
      '/pages/utils/package/': [
        {
          title: '创建自己的npm包',
          collapsable: false,
          sidebarDepth: '2',
          children: [
            '1_创建工具包项目',
            '2_发布到npm中央库',
            '3_使用自定义工具包',
          ]
        }
      ]
    }
  }
}
