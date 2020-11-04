---
title: Windows下Python3常见坑
date: '2020-11-01 11:36:11'
updated: '2020-11-04 22:14:24'
categories:
  - 2.07 Python
---
# Windows下Python3常见坑

## 读写utf-8文件

　　在Win下，由于默认编码为GBK，为了兼容性考虑，读写utf-8文件应该用以下方式:

```
with open('文件名','w',encoding='utf-8') as f:
    # ...
import codecs
with codecs.open("文件名","w","utf-8") as f:
    # ...
```
