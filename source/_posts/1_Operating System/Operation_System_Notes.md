---
title: 操作系统笔记
date: '2021-05-23 16:50:28'
updated: '2021-05-23 17:03:02'
categories:
  - 1 Operating System
---
# 操作系统笔记

## 操作系统的5种功能

- 作业管理
- 文件管理
- 存储管理：对主存的管理，也叫内存管理
- 设备管理
- 进程管理

## 微内核（Micro Kernel）操作系统和宏内核（Monolithic Kernel，[mɒnə'lɪθɪk]）操作系统

　　目前（2021年5月），Windows和macOS是微内核（Micro Kernel）操作系统，Linux是宏内核（Monolithic Kernel，[mɒnə'lɪθɪk]）操作系统。具体特征为：

- Linux的宏内核运行时，操作系统本身是单个进程，内部各个功能通过函数调用直接沟通，通过加载内核模块（.ko文件）的方式加载驱动程序和其他内核功能。

- Win等微内核操作系统的操作系统进程利用进程间通信的方式调用系统功能和驱动程序。
