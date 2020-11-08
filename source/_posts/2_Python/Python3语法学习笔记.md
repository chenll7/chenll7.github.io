---
title: Python3语法学习笔记
date: '2020-11-01 11:36:11'
updated: '2020-11-07 10:37:05'
categories:
  - 2 Python
---
# Python3语法学习笔记

## 作用域

　　Python是没有块级作用域的，变量可见性可以越过循环语句或者条件语句内部，外部可见。 

　　Python的Module(模块)、Class(类)、def(函数)内部会定义新的局部作用域。

　　Python在进行读操作时会按"本地→父函数→父父函数→……→全局→内建"的顺序来查找一个名字对应的对象。这也形成一个作用域链

　　Python的`global`关键字声明一个在局部作用域中的变量是全局的。 

　　Python的`nonlocal`关键字声明一个在局部作用域中变量是父作用域的。

## 类

　　未指定时，类的基类都是object。

## 内置变量`__file__`

It refers to the filepath of the current excuting file. But it can be a relative path or absolute path.

You can get absolute path using `os.path.realpath(__file__)`.

