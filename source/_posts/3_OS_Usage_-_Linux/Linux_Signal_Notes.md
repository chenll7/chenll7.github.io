---
title: Linux Signal 笔记
date: '2020-11-01 11:36:12'
updated: '2022-03-16 10:18:05'
categories:
  - 3 OS Usage - Linux
---

# Linux Signal 笔记

　　只有SIGKILL和SIGSTOP不可以被捕获

信号名 | 按键 | kill命令中的编号 | 说明
 - | - | - | - |
SIGINT | Ctrl+C | 2 | 通知要求前台进程组终止
SIGTSTP | Ctrl+Z | 20 | 信号给前台进程组中的所有进程，常用于挂起一个进程
SIGTQUIT | Ctrl+\ | ? | 进程终止并且将内存中的信息转储到硬盘（核心转储）
SIGKILL |  | 9 | 立即结束程序的运行，本信号不嗯呢该被进程捕获，不能被阻塞、处理和忽略，可能造成资源不能释放等问题
SIGHUP |  | 1 |　终端断开连接时用来通知session内的所有作业，默认行为是终止程序
SIGTERM |  | 15 | 要求结束程序运行，可以被阻塞和处理。用来要求程序自己正常退出，默认行为是终止程序，kill命令默认发送这个信号
