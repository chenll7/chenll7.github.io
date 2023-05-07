---
title: Linux sudo命令笔记
excerpt: Linux：sudo命令
category: 笔记
tags: null
date: '2018-04-29 16:19:08'
updated: '2023-05-07 20:03:44'
categories:
  - 3 OS Usage - Linux
---

# Linux sudo 命令笔记

## sudo

参考：<https://www.cnblogs.com/kevingrace/p/6130008.html>

sudo是常见的临时提权命令，CentOS、Ubuntu上都有。它在环境变量保持不变的情况下的，以root身份执行命令。

### vim后忘记加sudo导致无法保存

`:w !sudo tee %`

### 执行命令忘记加sudo

`sudo !!`

```sh
[bear@bear-server ~]$ cat /etc/sudoers|tail -3
cat: /etc/sudoers: Permission denied
[bear@bear-server ~]$ sudo !!
sudo cat /etc/sudoers|tail -3
```

## /etc/sudoers

参考：
<https://serversforhackers.com/c/sudo-and-sudoers-configuration>
<https://blog.csdn.net/weiyi556/article/details/78980139>

　　这个文件用来配置哪些用户可以用sudo命令临时提权执行命令。

　　在Ubuntu16.04下，推荐用`visudo`命令来编辑**/etc/sudoers**，这样保存退出时有检查。但由于visudo用的是nano编辑器，所以需要“Ctrl+O”来保存退出。会显示保存到/etc/sudoers.tmp，不要担心，visudo会帮你转存到/etc/sudoers。

　　在/etc/sudoers我们可以看到以下重要两条：

```
# Members of the admin group may gain root privile$
%admin ALL=(ALL) ALL
# Allow members of group sudo to execute any comma$
%sudo   ALL=(ALL:ALL) ALL
```

　　新安装的Ubuntu16.04是没有admin用户组的。所以考察一下sudo组的配置：

- **%sudo** ALL=(ALL:ALL) ALL - 这条配置应用于sudo组
- %sudo **ALL**=(ALL:ALL) ALL - 从任何主机登陆都可以
- %sudo ALL=(**ALL**:ALL) ALL - 可以作为任何用户执行命令
- %sudo ALL=(ALL:**ALL**) ALL - 可以作为任何组执行命令
- %sudo ALL=(ALL:ALL) **ALL** - 可以执行任何命令

总结起来就是：主机=(用户:组) 命令

　　如果想要执行sudo是不输入密码，可以：

- %sudo ALL=(ALL:ALL) NOPASSWD:ALL
