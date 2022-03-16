---
title: Unison 笔记
date: '2020-11-01 11:36:12'
updated: '2022-03-16 10:17:59'
categories:
  - 3 File Snchronization Tool
---
# Unison 笔记

　　单向同步（加`-fat`表示有目录是Windows目录）：

```sh
unison -batch -fat -force <源目录> <源目录> <目标目录>
```

　　双向同步：

```sh
unison -batch -fat <源目录> <目标目录>
```
