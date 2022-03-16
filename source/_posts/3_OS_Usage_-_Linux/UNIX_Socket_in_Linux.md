---
title: Linux中的UNIX套接字
date: '2020-11-01 11:36:12'
updated: '2022-03-16 10:18:07'
categories:
  - 3 OS Usage - Linux
---

# Linux中的UNIX套接字

UNIX套接字作为 POSIX 标准中的一个组件，提供进程间通信的机制，而避免通过网络协议。它是全双工的通道。

使用curl给UNIX发送数据例子：

```sh
curl --unix-socket /var/run/docker.sock http:/images/json
```

