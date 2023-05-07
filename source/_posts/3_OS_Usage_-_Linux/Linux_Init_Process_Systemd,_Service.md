---
title: Linux Init进程：Systemd、SysVinit、init
date: '2022-03-16 09:35:11'
updated: '2023-05-07 20:03:42'
categories:
  - 3 OS Usage - Linux
---
# Linux Init进程：Systemd、SysVinit、init

　　Linux 的 Init 进程是系统所有进程的父进程，根据出现前后，常见的有：Systemd、SysVinit、init。现在Systemd基本已经统治Linux世界了。

## Systemd

### 简述

　　Systemd是模仿macOS下的Launchd设计的，作为Linux系统下内核之后启动的第一个进程，用来管理各种系统资源，有例如开机启动服务、开关机等很多功能。虽然有违背UNIX的”一个工具只做一件事“的设计风格，还有指责作者[Lennart Poettering](https://en.wikipedia.org/wiki/Lennart_Poettering)不靠谱，但是现在大部分Linux发行版已经从原来的sysvinit切换到Systemd。
　　
　　Systemd的操作有系统级的（需要root权限）和用户级的（需要加`--user`参数）两种。<!--使用后觉得有root权限的话直接用前者就好了，后者的功能貌似有所阉割。-->

### 服务配置文件

　　服务配置文件存放于/usr/lib/systemd目录下，有系统（system）和用户（user）之分。
　　
　　开机不登陆就能运行的程序要存在系统服务里，即`/usr/lib/systemd/system`目录下。

　　每一个服务配置文件以`.service`结尾，一般含有3部分：[Unit]、[Service]和[Install]，例如：

```ini
[Unit]
Description=hehe daemon

[Service]
ExecStart=/usr/bin/touch /home/bear/hehe

[Install]
WantedBy=multi-users.target
```

### systemctl命令

`systemctl enable --user <服务名>`：执行Install字段，一般用于开机启动（hehe服务加入multi-user.target，multi-user.target开机会运行）。

`systemctl start --user <服务名>`：运行一次服务。

`systemctl start --user <服务名>`：重启服务。

### journalctl命令

`journalctl --user -u <服务名>`：查看服务的日志。

## SysVinit

　　重启服务例子：

```sh
# 执行/etc/init.d目录下相关脚本。
service sshd restart
```

　　配置服务例子：

```sh
# 设置sshd服务开机启动
chkconfig sshd start
```

## init

历史上，Linux 的启动一直采用init 进程。

在类Unix 的计算机操作系统中，Init（初始化的简称）是在启动计算机系统期间启动的第一个进程。

Init 是一个守护进程，它将持续运行，直到系统关闭。它是所有其他进程的直接或间接的父进程。

因为init 的参数全在`/etc/init.d`目录下，所以使用 init 启动一个服务，应该这样做：[^1]

```shell
sudo /etc/init.d/nginx start
```

## 参考

[^1]: [Linux init、service、systemctl 三者区别](https://segmentfault.com/a/1190000038458363)

