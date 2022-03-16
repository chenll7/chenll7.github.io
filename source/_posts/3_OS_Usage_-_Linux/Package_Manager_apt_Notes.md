---
title: 包管理器 apt 笔记
date: '2020-11-01 11:36:12'
updated: '2022-03-16 10:18:06'
categories:
  - 3 OS Usage - Linux
---
# 包管理器 apt 笔记

## 简介

　　apt是Debian系操作系统默认包管理器。使用时一般需要以root身份执行。安装软件包的可执行文件一般放在/usr/bin目录下。Ubuntu16.04增加了apt命令，但不能完全代替原来的apt-get、apt-cache和apt-config。

| 命令             | 取代的命令           | 命令的功能                           |
| ---------------- | -------------------- | ------------------------------------ |
| apt install      | apt-get install      | 安装软件包                           |
| apt remove       | apt-get remove       | 移除软件包                           |
| apt purge        | apt-get purge        | 移除软件包及配置文件                 |
| apt update       | apt-get update       | 刷新存储库索引                       |
| apt upgrade      | apt-get upgrade      | 升级所有可升级的软件包               |
| apt autoremove   | apt-get autoremove   | 自动删除不需要的包                   |
| apt full-upgrade | apt-get dist-upgrade | 在升级软件包时自动处理依赖关系       |
| apt search       | apt-cache search     | 搜索应用程序                         |
| apt show         | apt-cache show       | 显示装细节                           |
| apt list         |                      | 列出包含条件的包（已安装，可升级等） |
| apt edit-sources |                      | 编辑源列表                           |

## 添加和删除PPA源

　　添加PPA源可以安装官方仓库没有的软件包，一般使用add-apt-repository简化添加PPA源的步骤。例子如下：

```sh
# 安装add-apt-repository工具
sudo apt update && sudo apt install -y python-software-properties software-properties-common
# 添加PPA软件源到/etc/apt/sources.list.d
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt update
# 安装Node.js
sudo apt install -y nodejs
sudo apt install -y nodejs-legacy
sudo apt install -y npm
# 删除PPA软件源要到/etc/apt/sources.list.d手动删除
```

## 用apt安装常用软件包

- 中文语言包：`sudo apt install language-pack-zh-hans`

- 图片格式转换：`sudo apt install imagemagick`

