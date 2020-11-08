---
title: Python3模块学习笔记之re
date: '2020-11-01 11:36:11'
updated: '2020-11-07 10:37:05'
categories:
  - 2 Python
---
# Python3模块学习笔记之re

## 函数

### re.match

从头开始匹配。

### re.search

搜索符合模式的子串，搜索到第一个就停止。

### re.findall

搜索所有符合模式的子串，使用`^`会匹配串首。

## 修饰符

- `re.MULTILINE`：多行模式，对re.match无效
- `re.I`：大小写不敏感
