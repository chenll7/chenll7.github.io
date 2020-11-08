---
title: 前端：Bootstrap的安装与使用
description: 用Node.js安装Bootstrap，并编译less成html调用的CSS和js
category: 笔记
date: '2017-12-09 08:24:56'
tags: null
updated: '2020-11-07 10:37:05'
categories:
  - 2 Frontend - Bootstrap
---

　　介绍一下用Node.js安装Bootstrap，并编译less成html调用的CSS和js。

　　参考：
- <https://v3.bootcss.com/getting-started/>
- <https://www.cnblogs.com/xnlc/p/3836697.html>

# 下载Bootstrap源码包

```sh
npm install bootstrap@3
```

　　从node_module里把boostrap拿出来就是源码包了。

# 安装grunt

```sh
npm install -g grunt-cli
```

　　进入/bootstrap/根目录，然后执行

```sh
npm install
```

命令。npm 将读取 package.json 文件并自动安装此文件中列出的所有被依赖的扩展包。然后用

```sh
grunt dist
```

就可以编译了，输出在boostrap/dist目录里。

　　其他命令：

grunt watch （监测文件的改变，并运行指定的 Grunt 任务）
监测 Less 源码文件的改变，并自动重新将其编译为 CSS 文件。

grunt test （运行测试用例）
在 PhantomJS 环境中运行 JSHint 和 QUnit 自动化测试用例。

grunt docs （编译并测试文档中的资源文件）
编译并测试 CSS、JavaScript 和其他资源文件。在本地环境下通过 bundle exec jekyll serve 运行 Bootstrap 文档时需要用到这些资源文件。

grunt （重新构建所有内容并运行测试用例）
编译并压缩 CSS 和 JavaScript 文件、构建文档站点、对文档做 HTML5 校验、重新生成定制工具所需的资源文件等，都需要 Jekyll 工具。这些只有在你对 Bootstrap 深度研究时才有用。

# 最后

　　然后就是熟悉less语法的问题。less目录下的varibles.less有bootstrap所有的变量，比较重要。

