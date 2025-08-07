---
title: 主题上手指南
published: 2025-01-26T00:00:00.000Z
updated: 2025-04-13T00:00:00.000Z
draft: true
tags:
  - 博客主题
  - 指南
pin: 99
lang: zh
abbrlink: theme-guide
aicommit: 这里是Zang-AI，这篇文章介绍了基于Astro框架的Retypeset静态博客主题“重新编排”的上手指南，旨在帮助用户快速搭建个人博客。文章核心内容分为两部分：主题配置和新文章创建。主题配置方面，详细讲解了如何通过修改配置文件来自定义站点信息、主题配色、全局设置、评论系统、搜索引擎优化、页脚及资源预加载，并提及了语法高亮、文章摘要、Open Graph社交卡片和RSS订阅等其他配置。新文章创建部分，强调了核心配置项的必填性，并介绍了草稿、置顶、目录生成、语言指定、自定义文章URL等多种进阶配置。文章还介绍了通过执行优化操作来改善中日韩文与英文混排格式，补充空格并纠正标点，以优化排版。
knowledge_graph:
  nodes:
    - id: retypeset
      label: Retypeset
      type: 技术
      description: 一款基于 Astro 框架的静态博客主题，中文名为“重新编排”。
      importance: 1
      category: primary
    - id: astro
      label: Astro
      type: 技术
      description: 一个用于构建静态网站的现代前端框架，Retypeset 主题基于此框架开发。
      importance: 0.8
      category: secondary
    - id: static-blog-theme
      label: 静态博客主题
      type: 概念
      description: 用于构建静态博客网站的预设模板、样式和功能集合。
      importance: 0.7
      category: secondary
    - id: theme-config
      label: 主题配置
      type: 过程
      description: 修改配置文件以自定义博客的站点信息、配色、功能等。
      importance: 0.9
      category: primary
    - id: config-file
      label: src/config.ts
      type: 文件
      description: Retypeset 主题的主要配置文件，用于定义站点范围的设置。
      importance: 0.7
      category: secondary
    - id: create-post
      label: 创建新文章
      type: 过程
      description: 在 Retypeset 博客中添加新内容的核心流程。
      importance: 0.9
      category: primary
    - id: front-matter
      label: Front Matter
      type: 概念
      description: 位于 Markdown 文件顶部的元数据块，用于配置单篇文章的属性，如标题、日期、是否草稿等。
      importance: 0.8
      category: primary
    - id: typesetting-optimization
      label: 混排优化
      type: 功能
      description: 自动优化 Markdown 文件中 CJK（中日韩）与英文混排时的空格和标点符号。
      importance: 0.7
      category: secondary
    - id: markdown
      label: Markdown
      type: 技术
      description: 一种轻量级标记语言，用于撰写文章内容。
      importance: 0.6
      category: secondary
    - id: fm-title
      label: title
      type: 配置项
      description: Front Matter 中的文章标题，为必填项。
      importance: 0.5
      category: tertiary
    - id: fm-pubdate
      label: pubDate
      type: 配置项
      description: Front Matter 中的文章发布日期，为必填项。
      importance: 0.5
      category: tertiary
    - id: advanced-config
      label: 进阶配置
      type: 概念
      description: Front Matter 中用于文章的非必需高级配置项，如草稿、置顶、目录等。
      importance: 0.6
      category: secondary
    - id: fm-draft
      label: draft
      type: 配置项
      description: Front Matter 配置项，用于将文章标记为草稿，使其在生产环境中不发布。
      importance: 0.4
      category: tertiary
    - id: fm-pin
      label: pin
      type: 配置项
      description: Front Matter 配置项，用于置顶文章，数值越大优先级越高。
      importance: 0.4
      category: tertiary
    - id: fm-toc
      label: toc
      type: 配置项
      description: Front Matter 配置项，用于控制是否为单篇文章生成目录（Table of Contents）。
      importance: 0.4
      category: tertiary
    - id: cjk
      label: CJK
      type: 概念
      description: 中文（Chinese）、日文（Japanese）、韩文（Korean）的统称。
      importance: 0.3
      category: tertiary
    - id: seo
      label: 搜索引擎优化
      type: 功能
      description: 主题配置的一部分，用于提升博客在搜索引擎中的可见性。
      importance: 0.5
      category: secondary
    - id: open-graph
      label: Open Graph
      type: 技术
      description: 一种使网页在社交媒体上分享时能展示为丰富预览卡片的协议。
      importance: 0.4
      category: tertiary
    - id: syntax-highlighting
      label: 语法高亮
      type: 功能
      description: 在代码块中用不同颜色和样式显示代码，以增强可读性。
      importance: 0.5
      category: secondary
  edges:
    - id: e1
      source: retypeset
      target: astro
      type: 依赖关系
      label: 基于
      weight: 0.9
    - id: e2
      source: retypeset
      target: static-blog-theme
      type: 分类关系
      label: 是一种
      weight: 0.8
    - id: e3
      source: retypeset
      target: theme-config
      type: 功能关系
      label: 支持
      weight: 0.9
    - id: e4
      source: retypeset
      target: create-post
      type: 功能关系
      label: 支持
      weight: 0.9
    - id: e5
      source: retypeset
      target: typesetting-optimization
      type: 功能关系
      label: 提供
      weight: 0.7
    - id: e6
      source: theme-config
      target: config-file
      type: 实现方式
      label: 通过修改
      weight: 1
    - id: e7
      source: create-post
      target: markdown
      type: 工具关系
      label: 使用
      weight: 0.8
    - id: e8
      source: create-post
      target: front-matter
      type: 概念关系
      label: 使用
      weight: 0.9
    - id: e9
      source: front-matter
      target: fm-title
      type: 包含关系
      label: 需要必填项
      weight: 0.8
    - id: e10
      source: front-matter
      target: fm-pubdate
      type: 包含关系
      label: 需要必填项
      weight: 0.8
    - id: e11
      source: front-matter
      target: advanced-config
      type: 包含关系
      label: 包含
      weight: 0.7
    - id: e12
      source: advanced-config
      target: fm-draft
      type: 组成关系
      label: 包含选项
      weight: 0.6
    - id: e13
      source: advanced-config
      target: fm-pin
      type: 组成关系
      label: 包含选项
      weight: 0.6
    - id: e14
      source: advanced-config
      target: fm-toc
      type: 组成关系
      label: 包含选项
      weight: 0.6
    - id: e15
      source: typesetting-optimization
      target: cjk
      type: 作用对象
      label: 优化对象为
      weight: 0.8
    - id: e16
      source: typesetting-optimization
      target: markdown
      type: 作用对象
      label: 作用于
      weight: 0.7
    - id: e17
      source: theme-config
      target: seo
      type: 包含关系
      label: 包含
      weight: 0.5
    - id: e18
      source: retypeset
      target: open-graph
      type: 功能关系
      label: 支持
      weight: 0.5
    - id: e19
      source: retypeset
      target: syntax-highlighting
      type: 功能关系
      label: 支持
      weight: 0.6
  metadata:
    extracted_at: '2025-08-07T02:20:01.135Z'
    entity_count: 19
    relation_count: 19
    confidence: 0.8
---

Retypeset 是一款基于 [Astro](https://astro.build/) 框架的静态博客主题，中文名为重新编排。本文为 Retypeset 主题上手指南，主要介绍如何修改主题配置与创建新文章，来帮助你快速搭建个人博客。

## 主题配置

通过修改配置文件 [src/config.ts](https://github.com/radishzzz/astro-theme-retypeset/blob/master/src/config.ts) 来自定义你的博客。

### 站点信息

```ts
site: {
  // 站点标题
  title: 'Retypeset'
  // 站点副标题
  subtitle: 'Revive the beauty of typography'
  // 站点描述
  description: 'Retypeset is a static blog theme...'
  // 使用 src/i18n/ui.ts 中的多语言标题/副标题/站点描述，代替上方静态配置
  i18nTitle: true // true, false
  // 作者名称
  author: 'radishzz'
  // 站点地址
  url: 'https://retypeset.radishzz.cc'
  // 站点图标
  // 推荐格式：svg, png, ico
  favicon: '/icons/favicon.svg' // 或 https://example.com/favicon.svg
}
```

### 主题配色

```ts
color: {
  // 默认主题
  mode: 'light' // light, dark, auto
  // 亮色模式
  light: {
    // 主要颜色
    // 用于站点标题、鼠标悬停效果等
    primary: 'oklch(25% 0.005 298)'
    // 次要颜色
    // 用于普通文本
    secondary: 'oklch(40% 0.005 298)'
    // 背景色
    background: 'oklch(96% 0.005 298)'
    // 高亮颜色
    // 用于导航栏、选中文本等
    highlight: 'oklch(0.93 0.195089 103.2532 / 0.5)'
  }
  // 暗色模式
  dark: {
    // 主要颜色
    primary: 'oklch(92% 0.005 298)'
    // 次要颜色
    secondary: 'oklch(77% 0.005 298)'
    // 背景色
    background: 'oklch(22% 0.005 298)'
    // 高亮颜色
    highlight: 'oklch(0.93 0.195089 103.2532 / 0.5)'
  }
}
```

### 全局设置

```ts
global: {
  // 默认语言
  // 站点根路径 '/' 的语言
  locale: 'zh' // de, en, es, fr, ja, ko, pl, pt, ru, zh, zh-tw
  // 更多语言
  // 生成 '/en/' '/es/' 等多语言路径
  // 不要重复填写默认语言，可以为空 []
  moreLocales: ['en', 'es', 'ja', 'ru', 'zh-tw'] // ['de', 'en', 'es', 'fr', 'ja', 'ko', 'pl', 'pt', 'ru', 'zh', 'zh-tw']
  // 字体样式
  fontStyle: 'sans' // sans, serif
  // 文章日期格式
  // YYYY-MM-DD, MM-DD-YYYY, DD-MM-YYYY, MONTH DAY YYYY, DAY MONTH YYYY
  // 2025-04-13, 04-13-2025, 13-04-2025, Apr 13 2025，13 Apr 2025
  dateFormat: 'YYYY-MM-DD'
  // 文章目录
  toc: true // true, false
  // KaTeX 数学渲染
  katex: true // true, false
  // 减少动画效果
  reduceMotion: false // true, false
}
```

### 评论系统

```ts
comment: {
  // 开启评论系统
  enabled: true // true, false
  // giscus 评论系统
  giscus: {
    repo: ''
    repoId: ''
    category: ''
    categoryId: ''
    mapping: 'pathname'
    strict: '0'
    reactionsEnabled: '1'
    emitMetadata: '0'
    inputPosition: 'bottom'
  }
  // twikoo 评论系统
  twikoo: {
    envId: ''
    // version: 前端版本可在 package.json 中修改
  }
  // waline 评论系统
  waline: {
    // 服务器地址
    serverURL: 'https://retypeset-comment.radishzz.cc'
    // emoji 表情地址
    emoji: [
      'https://unpkg.com/@waline/emojis@1.2.0/tw-emoji'
      // 'https://unpkg.com/@waline/emojis@1.2.0/bmoji'
      // 更多表情：https://waline.js.org/en/guide/features/emoji.html
    ]
    // gif 搜索
    search: false // true, false
    // 图片上传
    imageUploader: false // true, false
  }
}
```

### 搜索引擎优化

```ts
seo: {
  // @twitter ID
  twitterID: '@radishzz_'
  // 站点验证
  verification: {
    // google 搜索控制台
    google: 'AUCrz5F1e5qbnmKKDXl2Sf8u6y0kOpEO1wLs6HMMmlM'
    // bing 网站管理员工具
    bing: '64708CD514011A7965C84DDE1D169F87'
    // yandex 网站管理员
    yandex: ''
    // baidu 站长工具
    baidu: ''
  }
  // google 网站分析
  googleAnalyticsID: ''
  // umami 网站分析
  umamiAnalyticsID: '520af332-bfb7-4e7c-9386-5f273ee3d697'
  // follow 验证
  follow: {
    // 订阅 ID
    feedID: ''
    // 用户 ID
    userID: ''
  }
  // apiflash access key 访问密钥
  // 自动生成网站截图用于 open graph
  // 获取访问密钥：https://apiflash.com/
  apiflashKey: ''
}
```

### 自定义页脚

```ts
footer: {
  // 社交链接
  links: [
    {
      name: 'RSS',
      url: '/atom.xml', // 或 /rss.xml
    },
    {
      name: 'GitHub',
      url: 'https://github.com/radishzzz/astro-theme-retypeset',
    },
    {
      name: 'Email',
      url: 'email@radishzz.cc',
    }
    // {
    //   name: 'X',
    //   url: 'https://x.com/radishzz_',
    // },
  ]
  // 建站年份
  startYear: 2025
}
```

### 资源预加载

```ts
preload: {
  // 图床地址
  // 优化 Markdown 文件中的远程图片以避免布局抖动
  imageHostURL: 'image.radishzz.cc'
  // 定制 google analytics js
  // 适用于路由 google analytics js 到自定义域名的用户
  customGoogleAnalyticsJS: ''
  // 定制 umami analytics js
  // 适用于自部署 umami，或路由 umami analytics js 到自定义域名的用户
  customUmamiAnalyticsJS: 'https://js.radishzz.cc/jquery.min.js'
}
```

## 更多配置

除了配置文件 `src/config.ts` 外，还有部分配置项位于其它文件中。

### 语法高亮

代码块的语法高亮主题。

```ts
// astro.config.ts

shikiConfig: {
  // 可选主题：https://shiki.style/themes
  // 背景色固定跟随博客主题，而非语法高亮主题
  themes: {
    light: 'github-light' // 亮色主题
    dark: 'github-dark' // 暗色主题
  }
}
```

### 文章摘要

文章自动摘要的字符数量。

```ts
// src/utils/description.ts

const excerptLengths: Record<ExcerptScene, {
  cjk: number // 中文、日文、韩文
  other: number // 其他语言
}> = {
  list: { // 首页文章列表
    cjk: 120, // 自动摘要前 120 字
    other: 240, // 自动摘要前 240 字
  },
}
```

### Open Graph

[Open Graph 社交卡片](https://orcascan.com/tools/open-graph-validator?url=https%3A%2F%2Fretypeset.radishzz.cc%2Fposts%2Ftheme-guide%2F) 样式。

```ts
// src/pages/og/[...image].ts

getImageOptions: (_path, page) => ({
  logo: {
    path: './public/icons/og-logo.png', // 本地路径的 PNG 图片
    size: [250], // logo 宽度
  },
  font: {
    title: { // 标题
      families: ['Noto Sans SC'], // 字体
      weight: 'Bold', // 字重
      color: [34, 33, 36], // 颜色
      lineHeight: 1.5, // 行高
    },
  },
  fonts: [ // 字体路径（本地或远程）
    'https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Sans/SubsetOTF/SC/NotoSansSC-Bold.otf',
    'https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Sans/SubsetOTF/SC/NotoSansSC-Regular.otf',
  ],
  bgGradient: [[242, 241, 245]], // 背景色
  // 更多配置：https://github.com/delucis/astro-og-canvas/tree/latest/packages/astro-og-canvas
})
```

### RSS 订阅

[RSS 订阅页](https://retypeset.radishzz.cc/rss.xml) 配色。

```html
<!-- public/feeds/xxx-style.xsl -->

<style type="text/css">
body{color:oklch(25% 0.005 298)} /* 字体颜色 */
.bg-white{background-color:oklch(0.96 0.005 298)!important} /* 背景颜色 */
.text-gray{color:oklch(0.25 0.005 298 / 75%)!important} /* 次要字体颜色 */
</style>
```

## 创建新文章

执行 `pnpm new-post <filename>` 创建新文章，可在 `src/content/posts/` 目录中编辑。

```bash
pnpm new-post                      ->  src/content/posts/new-post.md
pnpm new-post first-post           ->  src/content/posts/first-post.md
pnpm new-post 2025/03/first-post   ->  src/content/posts/2025/03/first-post.md
pnpm new-post first-post.mdx       ->  src/content/posts/first-post.mdx
```

### Front Matter

`title` 和 `published` 为必填项，其余配置均可删除。

```md
---
# 必填
title: 主题上手指南
published: 2025-01-26

# 可选
description: 自动选取文章前 120 字作为摘要。
updated: 2025-03-26
tags:
  - 博客主题
  - 指南

# 进阶，可选
draft: true/false
pin: 0-99
toc: true/false
lang: de/en/es/fr/ja/ko/pl/pt/ru/zh/zh-tw
abbrlink: theme-guide
---
```

### 进阶配置

#### draft

是否标记文章为草稿。设为 true 时无法发布文章，仅供本地开发预览。默认为 false。

#### pin

是否置顶文章。数字越大，文章的置顶优先级越高。默认为 0，即不置顶。

#### toc

是否生成目录。显示 h2 至 h4 标题。默认由全局配置项 `global.toc` 决定，可在文章中单独设置以覆盖全局配置。

#### lang

指定文章语言。只能指定一种语言，不指定则默认显示在所有语言路径下。

```md
# src/config.ts
# locale: 'en'
# moreLocales: ['es', 'ru']

# lang: ''
src/content/posts/apple.md   ->  example.com/posts/apple/
                             ->  example.com/es/posts/apple/
                             ->  example.com/ru/posts/apple/
# lang: en
src/content/posts/apple.md   ->  example.com/posts/apple/
# lang: es
src/content/posts/apple.md   ->  example.com/es/posts/apple/
# lang: ru
src/content/posts/apple.md   ->  example.com/ru/posts/apple/
```

#### abbrlink

自定义文章 URL。只能包含小写字母、数字和连字符 `-`。

```md
# src/config.ts
# locale: 'en'
# moreLocales: ['es', 'ru']
# lang: 'es'

# abbrlink: ''
src/content/posts/apple.md           ->  example.com/es/posts/apple/
src/content/posts/guide/apple.md     ->  example.com/es/posts/guide/apple/
src/content/posts/2025/03/apple.md   ->  example.com/es/posts/2025/03/apple/

# abbrlink: 'banana'
src/content/posts/apple.md           ->  example.com/es/posts/banana/
src/content/posts/guide/apple.md     ->  example.com/es/posts/banana/
src/content/posts/2025/03/apple.md   ->  example.com/es/posts/banana/
```

### 混排优化

执行 `pnpm format-posts`，可优化 `src/content/` 目录中 Markdown 文件的排版格式。在 CJK（中文、日文、韩文）与英文混写的场景下，补充正确的空格，纠正标点符号等。

```bash
pnpm format-posts
🔍 Scanning Markdown files...
📦 Found 56 Markdown files
✅ src/content/posts/guides/Theme Guide-ja.md
✅ src/content/posts/guides/Theme Guide-zh-tw.md
✅ src/content/posts/guides/Theme Guide-zh.md
✨ Formatted 3 files successfully
```