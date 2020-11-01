---
title: Python3模块学习笔记之docxtpl
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:23:05'
categories:
  - 2. Programming in Python
---
# Python3模块学习笔记之docxtpl

## 例子

```python
#!/usr/bin/python3
import os,sys
from docxtpl import DocxTemplate

doc = DocxTemplate("test.docx") # 对要操作的docx文档进行初始化  
context = { 'company_name' : "World company" } # company_name 是存在于1.docx文档里面的变量，就像这样{{company_name}}，直接放在1.docx文件的明确位置就行  
doc.render(context) # 这里是有jinjia2的模板语言进行变量的替换，然后便可以在1.docx文档里面看到{{company_name}}变成了World company  
doc.save("output.docx") # 保存  
```

