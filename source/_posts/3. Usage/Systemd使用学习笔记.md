---
title: Systemd使用学习笔记
date: '2020-11-01 11:36:12'
updated: '2019-09-30 00:13:18'
categories:
  - 3. Usage
---
# Systemd使用学习笔记

## 简述

　　Systemd是模仿macOS下的Launchd设计的，作为Linux系统下内核之后启动的第一个进程，用来管理各种系统资源，有例如开机启动服务、开关机等很多功能。虽然有违背UNIX的”一个工具只做一件事“的设计风格，还有指责作者[Lennart Poettering](https://en.wikipedia.org/wiki/Lennart_Poettering)不靠谱，但是现在大部分Linux发行版已经从原来的sysvinit切换到Systemd。
　　
　　Systemd的操作有系统级的（需要root权限）和用户级的（需要加`--user`参数）两种。<!--使用后觉得有root权限的话直接用前者就好了，后者的功能貌似有所阉割。-->

## Service模板

```ini
[Unit]
Description=hehe daemon

[Service]
ExecStart=/usr/bin/touch /home/bear/hehe

[Install]
WantedBy=multi-users.target
```

　　命名为hehe.service后放入`/lib/systemd/system`目录下。

## systemctl命令

`systemctl enable --user <服务名>`：执行Install字段，一般用于开机启动（hehe服务加入multi-user.target，multi-user.target开机会运行）。

`systemctl start --user <服务名>`：运行一次服务。



## journalctl命令

`journalctl --user -u <服务名>`：查看服务的日志。
