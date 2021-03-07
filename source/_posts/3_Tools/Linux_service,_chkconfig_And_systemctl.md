---
title: 'Linux_service,_chkconfig_And_systemctl'
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:24:47'
categories:
  - 3 Tools
---
　　　Ubuntu 16.04和CentOS7开始支持systemd启动，是一种比init更快的启动方式.了解了一下systemctl命令和原来service命令和chkconfig命令的区别。

# service

　　类似于

```sh
service sshd restart
```

service会到/etc/init.d目录下执行相关脚本。

# chkconfig

```sh
# 设置sshd服务开机启动
chkconfig sshd start
```

# systemctl

参考：<https://blog.csdn.net/yuanguozhengjust/article/details/38019923>

　　systemctl脚本存放在：/usr/lib/systemd/，有系统（system）和用户（user）之分，像需要开机不登陆就能运行的程序，还是存在系统服务里，即：/usr/lib/systemd/system目录下。

　　每一个服务以.service结尾，一般会分为3部分：[Unit]、[Service]和[Install]。

例如：

```sh
sudo systemctl start cups.service
sudo systemctl stop cups.service
sudo systemctl restart cups.service
```

（具体使用时再了解）
