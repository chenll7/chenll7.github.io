---
title: OpenSSH：隧道
date: '2020-11-01 11:36:12'
updated: '2020-11-01 12:23:05'
categories:
  - 3. Usage of OpenSSH
---
参考：

- <http://blog.csdn.net/dliyuedong/article/details/49804825>
- <https://segmentfault.com/a/1190000002718360>

# 基本操作

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

# 避免进程挂掉

　　为了防止A上的进程因为断电或者重启什么原因挂掉。我写了用expect写了脚本让A机器的/etc/rc.local（Debain系Linux）开机调用。其实更好的是用“ssh免密码登陆”，但我没有弄出来，以后研究。
