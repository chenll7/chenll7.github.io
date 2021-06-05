---
title: Python3模块学习笔记之itertools
date: '2020-11-01 11:36:11'
updated: '2020-11-07 10:37:05'
categories:
  - 2 Python
---
# Python3模块学习笔记之itertools

## 遍历文件每一行并筛掉回车

```python
#!/usr/bin/env python3
from itertools import takewhile

f = open('test.txt')
for line in takewhile(bool, f):
    line = line.strip('\n')
    print(line)
```
