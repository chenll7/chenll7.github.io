---
title: OpenSSH客户端使用学习笔记
date: '2020-11-01 11:36:12'
updated: '2020-11-01 12:24:47'
categories:
  - 3.6 OpenSSH
---
# OpenSSH客户端使用学习笔记

##  选项

　　ssh命令的参数选项可以在使用时在`-o`后面指定，也可以写在`/etc/ssh/ssh_config`或者`$HOME/.ssh/config`里。

###  StrictHostKeyChecking选项（检查远程主机公钥）

　　`ssh -o StrictHostKeyChecking=no <用户名>@<主机名> [<命令>]`自动将远程主机公钥加入本地~/.ssh/known_hosts文件，不检查和询问。

###  ConnectTimeout选项（超时设定）

　　`ssh -o ConnectTimeout=１ <用户名>@<主机名> [<命令>]`超时限制改为1s。

###  ServerAliveInterval选项（连接保活）

　　客户端的/etc/ssh/ssh_config（注意不是/etc/ssh/sshd_config文件）后面添加

```sh
Host *
ServerAliveInterval 60
```

## 暂时挂起

　　键入“~”加“Ctrl+Z”将前台的SSH会话挂起放到后台进程组，处理完事情后再键入“fg"恢复SSH会话。
