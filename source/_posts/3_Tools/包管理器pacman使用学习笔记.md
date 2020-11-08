---
title: 包管理器pacman使用学习笔记
date: '2020-11-01 11:36:12'
updated: '2020-11-01 12:24:47'
categories:
  - 3 Tools
---
# 包管理器pacman使用学习笔记

## 参考

- [Pacman 命令详解](https://gist.github.com/fbigun/b859fc426c11f972ec97)

## 基础知识

- 安装包：`pacman -S <包名>`

- 同步数据库：`pacman -Sy`

- 强制数据库更新和升级：`pacman Syyu`

- 搜索包：`pacman -Ss <关键字>`

- 设置国内镜像源：`pacman-mirrors --country China && pacman -Syyu`
