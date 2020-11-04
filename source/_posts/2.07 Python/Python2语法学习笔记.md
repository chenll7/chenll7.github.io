---
title: Python2语法学习笔记
date: '2020-11-01 11:36:11'
updated: '2020-11-04 22:14:24'
categories:
  - 2.07 Python
---
# Python2语法学习笔记

## `__init__`、`__new__`、新式类和旧式类

　　继承object的是新式类，否则是旧式类。`__new__`是object的函数。

　　`__new__`在类的实例创建前被调用，`__init__`在类的实例创建后被调用，`__init__`需要带self参数。
