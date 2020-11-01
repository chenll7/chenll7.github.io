---
title: Unison使用学习笔记
date: '2020-11-01 11:36:12'
updated: '2019-11-30 22:14:26'
categories:
  - 3. Usage
---
# Unison使用学习笔记

　　单向同步（加`-fat`表示有目录是Windows目录）：

```sh
unison -batch -fat -force <源目录> <源目录> <目标目录>
```

　　双向同步：

```sh
unison -batch -fat <源目录> <目标目录>
```
