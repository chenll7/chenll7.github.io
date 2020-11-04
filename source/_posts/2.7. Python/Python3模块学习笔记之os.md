---
title: Python3模块学习笔记之os
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:24:47'
categories:
  - 2.7. Python
---
# Python3模块学习笔记之os

## 创建目录

```python
# 单级目录
mkdir( path [,mode] )
# 多级目录
makedirs( path [,mode] )
```

## 遍历目录和文件

　　遍历得到的路径是相对路径还是绝对路径取决于输入的路径`dirRoot`。

### 遍历单层（os.listdir）

```python
dirRoot='.'
for name in os.listdir(dirRoot):   
  path = os.path.join(dirRoot, name)   
  print(path) 
```

　　`os.listdir`会返回列表，列表里有该目录下一层所有目录名和文件名。然后用`os.path.join`拼接出完整路径,如果`dirRoot`是相对路径那么就是相对路径，否则是绝对路径。

　　`os.path.isdir`可以判断`path`是目录还是文件。

### 遍历全部（os.walk）

```python
dirRoot='.'
for dirSub, dirs, files in os.walk(dirRoot) :  
  for d in dirs:
    print('目录：'+os.path.join(dirSub, d))   
  for f in files:   
    print('文件：'+os.path.join(dirSub, f)) 
```

- `os.walk`会返回生成器，遍历时每次可以获得三元组：**(子目录名`dirSub`,该子目录下所有目录名的列表`dirs`,该子目录下所有文件名的列表`files`)**。
- 遍历顺序为所有目录的`中序遍历`。
- `dirSub`是绝对路径还是相对路径取决于`dirRoot`。

## 其他

- `os.path.isdir`：判断是目录还是文件。

- `os.path.exists`：判断目录或文件存在。
