---
title: Linux_Background_And_Foreground_Process
date: '2020-11-01 11:36:12'
updated: '2020-11-04 22:14:24'
categories:
  - 3.03 Linux
---
参考：<http://blog.csdn.net/u012787436/article/details/39722583>

　　使用

```sh
jobs
```

查看当前有多少在后台运行的命令。jobs -l选项可显示所有任务的PID，jobs的状态可以是running、stopped、terminated。但是如果任务被终止了（kill），shell 从当前的shell环境已知的列表中删除任务的进程标识；也就是说，jobs命令显示的是当前shell环境中所起的后台正在运行或者被挂起的任务信息。

# 直接将一个进程扔到后台执行

　　在命令后加“&”。

# 将一个前台进程扔到后台执行

　　Ctrl+Z将前台进程转入后台，并处于挂起状态。再用bg（或者bg %<jobs命令中查到的序号>）让它在后台跑起来。

# 将一个后台进程拉倒前台执行

　　用fg（或者fg %<jobs命令中查到的序号>）。

# 敲重点！！！

　　一个不停在向屏幕（标准输出流）打印字符的进程放到后台运行（用&或者用Ctrl+Z加bg）时，仍然会向屏幕打印字符。这时候除了关闭shell，即使Ctrl+C或者Ctrl+Z也无法阻止打印，因为Ctrl+C和Ctrl+Z只想前台进程发送信号。这时候应该在混乱中输入fg将后台进程拉到前台，然后再用Ctrl+C、Ctrl+Z或者其他方法处理。
