---
title: Javascript原型和原型链笔记
date: '2020-11-01 11:36:10'
updated: '2020-11-10 13:38:28'
categories:
  - 2 Frontend
---
# Javascript原型和原型链笔记

## new、prototype、\_\_proto\_\_、原型与原型链


![](1.jpg)

　　js的对象分为普通对象和函数对象。

　　凡是通过**new Function()**创建的对象都是函数对象，其他的都是普通对象。

**定律**：每个对象都有**\_\_proto\_\_**属性，但只有函数对象才有**prototype**属性，它初始是个空对象。

## References

- <https://www.jianshu.com/p/dee9f8b14771>
- <https://www.zhihu.com/question/34183746>



