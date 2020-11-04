---
title: Python3模块学习笔记之subprocess
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:24:47'
categories:
  - 2.7. Python
---
# Python3模块学习笔记之subprocess

　　subprocess模块是python从2.4版本开始引入的模块。主要用来取代一些旧的模块方法，如`os.system`、`os.spawn*`、`os.popen*`、`commands.*`等。subprocess通过子进程来执行外部指令，并通过input/output/error管道，获取子进程的执行的返回信息。

## 参考

- <https://www.cnblogs.com/breezey/p/6673901.html>


## 阻塞方式启动进程（subprocess.run）

　　（`subprocess.run`是python3.5引入的，以前用`subprocess.call`。）

　　根据`help(subprocess.run)`的介绍，可以这样使用：

```python
//Windows下
subprocess.run("dir",shell=True)//使用shell来执行dir命令，dir命令表示列出所有子文件
subprocess.run(["dir"],shell=True)//使用shell来执行dir命令，dir命令表示列出所有子文件
subprocess.run("dir")//会报错，找不到该文件
```

它会返回一个类似于`CompletedProcess(args='dir', returncode=0)`的对象，表示执行结果。

　　高级用法:

```python
subprocess.run(["dir"],shell=True,stdout=subprocess.PIPE)//子进程标准输出的内容不打印在本进程的标准输出，而是存在返回的CompletedProcess对象的stdout属性中
subprocess.run(["dir"],shell=True,stdout=subprocess.DEVNULL)//子进程标准输出的内容不打印在本进程的标准输出
subprocess.run(["dir"],shell=True,stderr=subprocess.STDOUT)//子进程标准错误流重定向到标准输出流
```

## 非阻塞方式启动进程（subprocess.Popen）



　　
