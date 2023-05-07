---
title: Node.js 笔记
date: '2020-11-01 11:36:10'
updated: '2023-05-07 20:03:28'
categories:
  - 2 Node.js
---
# Node.js 笔记

## 全局对象

　　`global`是Node.js中的全局对象，全局作用域下`this`即指向这个对象。

## 区分开发环境、生产环境与其他环境

　　Node.js 假定其始终运行在开发环境中。 可以通过设置 `NODE_ENV=production` 环境变量来向 Node.js 发出正在生产环境中运行的信号。[^1]
　　
　　可以通过将环境变量放在应用程序的初始化命令之前来应用它：

```bash
NODE_ENV=production node app.js
```
　　此环境变量是一个约定，在外部库中也广泛使用。其取值一般可以为`development`（默认值）、`production`，有些项目中还有`preview`等取值。

　　设置环境为 production 通常可以确保：

- 日志记录保持在最低水平。
- 更高的缓存级别以优化性能。

## 执行外部命令

```js
const child_process = require("child_process");
// 直接执行命令
child_process.spawnSync("<命令>",[<参数>]);
// UNIX下通过Shell或者Win下通过cmd执行命令，退出码为非零时会抛出错误
child_process.execSync("<命令> <参数>");                         
```

## 参考

[^1]: [Node.js 开发环境与生产环境的区别](http://nodejs.cn/learn/nodejs-the-difference-between-development-and-production)
