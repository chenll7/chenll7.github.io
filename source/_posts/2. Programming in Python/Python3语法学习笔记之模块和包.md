---
title: Python3语法学习笔记之模块和包
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:23:05'
categories:
  - 2. Programming in Python
---
# Python3语法学习笔记之模块和包

　　包一般是目录，模块一般是文件。模块里存放变量、函数、类等。

## 参考

- <https://www.cnblogs.com/kex1n/p/5977051.html>
- <http://www.runoob.com/python3/python3-module.html>

## 模块

### 隐式相对导入

```python
import module
import module.something#语法错误，提示module不是一个包
```

调用模块里的东东需要加上模块名：

```python
module.variableName='miaomiao'
module.func()
module.Classname.staticfunc()
```

无法用来导入当前工作目录的包。

### 显示相对导入

```python
from . import moduleY # 显式相对da
```

### 绝对导入

```python
from module import *#或者
from module import something
```

调用模块里的东东不需要模块名了：

```python
variableName='miaomiao'
func()
Classname.staticfunc()
```

### 模块导入时的搜索顺序

1. 在当前目录下搜索该模块
2. 在环境变量PYTHONPATH中指定的路径列表中依次搜索
3. 在Python安装路径的lib库中搜索

## 包

　　（这里我也没有实践，有机会的话检验）

　　包可以包含若干模块和子包。

```python
#以下在调用导入的东西时不能省略前缀
import 包名.子包名.模块名.something
import 包名.子包名.模块名
import 包名.子包名
import 包名
#以下在调用导入的东西时可以省略相应前缀
from 包名.子包名.模块名 import something
from 包名.子包名 import 模块名
from 包名 import 子包名
```

　　每个包下要有一个\_\_init\_\_.py。\_\_init\_\_.py里包含一个\_\_all\_\_字符串列表，包含这个包包含的所有模块和子包的名字（不带“.py”）。\_\_all\_\_主要是为了应对

```python
from 包名 import *
```

的情况。
