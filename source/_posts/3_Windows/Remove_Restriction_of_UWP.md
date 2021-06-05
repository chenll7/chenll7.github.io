---
title: 移除UWP限制
date: '2021-09-28 15:05:11'
updated: '2022-01-25 11:20:02'
categories:
  - 3 Windows
---
# 移除UWP限制

## 移除访问本地回环地址限制

### 方法1

　　UWP默认无法访问回环地址localhost。可以使用CheckNetIsolation.exe移除这个限制。

　　允许邮件与日历使用代理软件。以管理员权限打开cmd，并键入以下内容：

```cmd
CheckNetIsolation.exe LoopbackExempt -a -p=S-1-15-2-2551677095-2355568638-4209445997-2436930744-3692183382-387691378-1866284433
rem 貌似这个没用？
CheckNetIsolation.exe LoopbackExempt -a -p=S-1-15-2-2750798217-1343590035-1234819260-1030354384-3318145141-3720257911-3461195215
```

### 方法2

　　使用[EnableLoopback Utility](http://www.apprcn.com/enableloopback-utility.html)，与Fiddler功能类似。

