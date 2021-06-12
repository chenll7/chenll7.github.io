---
title: Zsh笔记
date: '2020-11-01 11:36:11'
updated: '2021-06-12 07:55:31'
categories:
  - 2 Shell
---
# Zsh笔记

## 脚本执行前执行的脚本

![](Zsh_Notes/20190501141959.png)

|     脚本      | 登录交互式Shell | 非登录交互式Shell | 非登录非交互式式Shell |
| :-----------: | :-------------: | :---------------: | :-------------------: |
|  /etc/zshenv  |        1        |         1         |           1           |
|   ~/.zshenv   |        2        |         2         |           2           |
| /etc/zprofile |        3        |                   |                       |
|  ~/.zprofile  |        4        |                   |                       |
|  /etc/zshrc   |        5        |         3         |                       |
|   ~/.zshrc    |        6        |         4         |                       |
|  /etc/zlogin  |        7        |                   |                       |
|   ~/.zlogin   |        8        |                   |                       |
|  ~/.zlogout   |        9        |                   |                       |
| /etc/zlogout  |       10        |                   |                       |

看起来文件多，其实alias什么的加入到`~/.zshrc`就可以了。

