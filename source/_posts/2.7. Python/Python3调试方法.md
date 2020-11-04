---
title: Python3调试方法
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:24:47'
categories:
  - 2.7. Python
---
# Python3调试方法学习笔记

## -d参数

　　假设要调试一个叫hehe.py的脚本，那么执行`python -d hehe.py`时，sys.flags.debug的值会由默认的`0`变成`1`。

