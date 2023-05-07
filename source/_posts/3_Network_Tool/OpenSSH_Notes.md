---
title: OpenSSH 笔记
date: '2020-11-01 11:36:12'
updated: '2023-05-07 20:03:39'
categories:
  - 3 Network Tool
---
# OpenSSH 笔记

## OpenSSH包含的工具

The OpenSSH suite consists of the following tools:

- Remote operations are done using [ssh](https://man.openbsd.org/?query=ssh&sektion=1), [scp](https://man.openbsd.org/?query=scp&sektion=1), and [sftp](https://man.openbsd.org/?query=sftp&sektion=1).

- Key management with [ssh-add](https://man.openbsd.org/?query=ssh-add&sektion=1), [ssh-keysign](https://man.openbsd.org/?query=ssh-keysign&sektion=8), [ssh-keyscan](https://man.openbsd.org/?query=ssh-keyscan&sektion=1), and [ssh-keygen](https://man.openbsd.org/?query=ssh-keygen&sektion=1).
- The service side consists of [sshd](https://man.openbsd.org/?query=sshd&sektion=8), [sftp-server](https://man.openbsd.org/?query=sftp-server&sektion=8), and [ssh-agent](https://man.openbsd.org/?query=ssh-agent&sektion=1).

## ssh命令

###  参数选项

　　ssh命令的参数选项可以在使用时在`-o`后面指定，也可以写在`/etc/ssh/ssh_config`或者`$HOME/.ssh/config`里。

####  StrictHostKeyChecking选项（检查远程主机公钥）

　　`ssh -o StrictHostKeyChecking=no <用户名>@<主机名> [<命令>]`自动将远程主机公钥加入本地~/.ssh/known_hosts文件，不检查和询问。

####  ConnectTimeout选项（超时设定）

　　`ssh -o ConnectTimeout=１ <用户名>@<主机名> [<命令>]`超时限制改为1s。

####  ServerAliveInterval选项（连接保活）

　　客户端的/etc/ssh/ssh_config（注意不是/etc/ssh/sshd_config文件）后面添加

```sh
Host *
ServerAliveInterval 60
```

### 暂时挂起

　　键入“~”加“Ctrl+Z”将前台的SSH会话挂起放到后台进程组，处理完事情后再键入“fg"恢复SSH会话。

### 免密登录服务器

　　客户端产生一对公私钥，把公钥给服务端，服务端把公钥加入信任列表，这样客户端就可以凭私钥免密登陆了。

　　对于UNIX操作系统的服务器，公钥信任列表在~/.ssh/authorized_keys（需要自己创建，权限必须是600）。里面一行存放一个公钥。~/.ssh/authorized_keys注释以“#”开头。

　　执行

```shell
ssh-keygen -t rsa
```

　　在~/.ssh下生成id_rsa（私钥）和id_rsa.pub（公钥）。然后：

```shell
# 服务器ssh端口是22
ssh-copy-id -i ~/.ssh/id_rsa.pub 服务器用户名@服务器主机名
# 服务器ssh端口不是22
ssh-copy-id -i ~/.ssh/id_rsa.pub -p 23 服务器用户名@服务器主机名
```

这样就可以把公钥传给服务器了。

### 搭建隧道

　　假设内网机子是A，跳板机是B，利用B从其他局域网访问A。首先都要有安装openssl-client，openssl-server：

　　在A上操作：

```sh
ssh -fCNR 端口甲:localhost:22 usr_b@B.B.B.B
```
通过

```sh
ps -ef|grep ssh
```

（假设A的ssh端口是默认端口22；假设B的sshd监听端口是22，如果不是，要增加“-p B的sshd监听端口”；usr_b不一定一定是root，可是权限更小的用户）

可以观察到这样的俩进程：

```
root     29370     1  0 09:14 ?        00:00:00 ssh -p 12345 -fCNR 21442:localhost:22 root@123.123.123.123
```

说明正常工作了。这样在B上就可以通过访问__localhost:端口甲__来访问A的22端口，但是此时外面的机子还无法通过B访问A。

　　在B上操作（假设B的sshd监听端口是22，如果不是，要增加“-p B的sshd监听端口”）：

```sh
ssh -fCNL *:端口乙:localhost:端口甲 localhost
```

这样B的端口乙会把报文转发给端口甲，端口甲把数据转发给A的22端口,通过

```sh
ps -ef|grep ssh
```

可以观察到这样的俩进程：

```
root      8586  7249  0 09:08 ?        00:00:00 sshd: root
root      8588     1  0 09:08 ?        00:00:00 ssh -p 12345 -fCNL *:21441:localhost:21442 localhost
```

说明正常工作了。

(
　　以下步骤貌似可以不用做：

　　在B的/etc/ssh/sshd_config末尾追加一下命令：

```
GatewayPorts yes
```

然后重启ssh，

```sh
service ssh restart
```

)

其他机子就可以通过访问B的__端口乙__来访问A的22端口，从而实现ssh访问A。
