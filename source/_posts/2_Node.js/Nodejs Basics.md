---
title: Nodejs Basics
date: '2020-11-01 11:36:10'
updated: '2020-11-07 10:37:05'
categories:
  - 2 Node.js
---
# Node.js Basics

## 全局对象

　　`global`是Node.js中的全局对象，全局作用域下`this`即指向这个对象。

## 执行外部命令

```js
const child_process = require("child_process");
// 直接执行命令
child_process.spawnSync("<命令>",[<参数>]);
// UNIX下通过Shell或者Win下通过cmd执行命令，退出码为非零时会抛出错误
child_process.execSync("<命令> <参数>");                         
```
