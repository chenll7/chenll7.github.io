---
title: 包管理器 pacman 笔记
date: '2020-11-01 11:36:12'
updated: '2023-05-07 20:03:44'
categories:
  - 3 OS Usage - Linux
---
# 包管理器 pacman 笔记

## 基础知识

- 安装包：`pacman -S <包名>`

- 同步数据库：`pacman -Sy`

- 强制数据库更新和升级：`pacman Syyu`

- 搜索包：`pacman -Ss <关键字>`

- 设置国内镜像源：`pacman-mirrors --country China && pacman -Syyu`

## 参考

[^1]: [Pacman 命令详解](https://gist.github.com/fbigun/b859fc426c11f972ec97)
