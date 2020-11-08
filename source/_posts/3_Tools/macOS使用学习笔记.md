---
title: macOS使用学习笔记
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:24:47'
categories:
  - 3 Tools
---
# macOS使用学习笔记

## 设置计算机名和主机名

```sh
sudo scutil --set ComputerName <新计算机名>
sudo scutil --set HostName <新主机名>
```

　　计算机名是共享文件夹的那个名字。主机名是显示在终端上的那个。 

## 让计算机睡眠时进入深度睡眠

　　macOS的深度睡眠和Windows的休眠概念相似，即睡眠时将内存的内容全部写入磁盘，苏醒时再写回内存，这样可以省电。命令为：

```sh
# 查看所有变量的值
sudo pmset -g
# 设置hibernatemode的值为25
sudo pmset -a hibernatemode 25
```

　　hibernatemode的值可以为0（睡眠时内容保留在内存）、3（默认，睡眠时内容保留在内存，但没电时写入磁盘）、25（睡眠时内容写入磁盘）。

## 在Dock中的应用图标上用双指向上滑动打开该应用显示的所有窗口

```sh
defaults write com.apple.dock scroll-to-open -bool false && killall Dock
```
