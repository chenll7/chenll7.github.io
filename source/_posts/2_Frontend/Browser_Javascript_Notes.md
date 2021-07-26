---
title: 浏览器Javascript笔记
date: '2021-07-26 14:29:35'
updated: '2021-07-26 14:36:20'
categories:
  - 2 Frontend
---
# 浏览器Javascript笔记

## Web Worker

　　Web Worker 可以用于从页面线程分流几乎所有繁重的处理。相当于额外开了个JS进程。

## Service Worker

　　Service Worker 是浏览器和网络之间的代理。通过拦截文档发出的请求， Service Worker 可以将请求重定向到缓存，从而实现脱机访问。

## Worklet

　　影响页面的渲染过程，使我们能够对浏览器的渲染过程（例如样式和布局）进行低级访问。

## 内建全局变量

### window

　　`window`是全局对象，全局作用域下`this`即指向这个对象。

### console

　　用法：

```js
// Verbose Level
console.debug('123');
// Info Level
console.log('123');
console.info('123');
// Warning Level
console.warn('123');
// Error Level
console.error('123');
```
