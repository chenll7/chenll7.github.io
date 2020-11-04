---
title: Python3模块学习笔记之shutil
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:24:47'
categories:
  - 2.7. Python
---
# Python3模块学习笔记之shutil

复制文件：

```python
shutil.copyfile(srcfile,dstfile)
```

移动文件：

```python
shutil.move(srcfile,dstfile)
```

递归删除目录（Windows下有bug）：

```python
shutil.rmtree(dir_name)
```
