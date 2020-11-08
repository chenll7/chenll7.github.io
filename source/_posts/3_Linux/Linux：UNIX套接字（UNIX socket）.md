---
title: Linux：UNIX套接字（UNIX socket）
date: '2020-11-01 11:36:12'
updated: '2020-11-04 22:14:24'
categories:
  - 3 Linux
---
UNIX套接字作为 POSIX 标准中的一个组件，提供进程间通信的机制，而避免通过网络协议。它是全双工的通道。



使用curl给UNIX发送数据例子：



```sh
curl --unix-socket /var/run/docker.sock http:/images/json
```

