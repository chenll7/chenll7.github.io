---
title: OpenSSH：基本知识
date: '2020-11-01 11:36:12'
updated: '2020-11-01 12:23:05'
categories:
  - 3. Usage of OpenSSH
---
# OpenSSH包含的工具

参考：<https://www.openssh.com/>

The OpenSSH suite consists of the following tools:

- Remote operations are done using [ssh](https://man.openbsd.org/?query=ssh&sektion=1), [scp](https://man.openbsd.org/?query=scp&sektion=1), and [sftp](https://man.openbsd.org/?query=sftp&sektion=1).

- Key management with [ssh-add](https://man.openbsd.org/?query=ssh-add&sektion=1), [ssh-keysign](https://man.openbsd.org/?query=ssh-keysign&sektion=8), [ssh-keyscan](https://man.openbsd.org/?query=ssh-keyscan&sektion=1), and [ssh-keygen](https://man.openbsd.org/?query=ssh-keygen&sektion=1).
- The service side consists of [sshd](https://man.openbsd.org/?query=sshd&sektion=8), [sftp-server](https://man.openbsd.org/?query=sftp-server&sektion=8), and [ssh-agent](https://man.openbsd.org/?query=ssh-agent&sektion=1).

# ssh命令

##  参数选项

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
