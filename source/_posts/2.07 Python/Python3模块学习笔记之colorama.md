---
title: Python3模块学习笔记之colorama
date: '2020-11-01 11:36:11'
updated: '2020-11-04 22:14:24'
categories:
  - 2.07 Python
---
# Python3模块学习笔记之colorama

```python
import colorama
from termcolor import colored 
  
colorama.init()
print(colored('Hello, World!', 'green', 'on_red')) 
```



## 参考

[^1]: [Print Colors in Python terminal](https://www.geeksforgeeks.org/print-colors-python-terminal/)
