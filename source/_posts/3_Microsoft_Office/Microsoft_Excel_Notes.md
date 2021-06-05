---
title: Miscrosoft Excel笔记
date: '2021-12-08 15:33:46'
updated: '2021-12-08 15:38:00'
categories:
  - 3 Microsoft Office
---
# Miscrosoft Excel笔记

## 常用公式

判断B列是否在A列中存在。

```excel
=IF(ISERROR(MATCH(B1, $A:$A, 0)), B1, "")
```

INDEX和MATCH用来替代VLOOKUP。

```excel
=INDEX($A:$A, MATCH(B1, $A:$A, 0), 1)
```
