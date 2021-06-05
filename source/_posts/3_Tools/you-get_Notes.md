---
title: you-get笔记
date: '2021-01-30 20:19:22'
updated: '2021-09-23 09:09:52'
categories:
  - 3 Tools
---
# you-get笔记

## 安装

```shell
pip install you-get
```

## 使用

```shell
# 查看视频分辨率等信息
you-get -i "<视频URL>"
# 使用HTTP代理下载（不需要加HTTP_PROXY环境变量或者HTTPS_PROXY环境变量）
you-get -x "localhost:10808" "<视频URL>"
# 使用Cookies来下载
you-get -c "/mnt/c/Users/<用户名>/AppData/Roaming/Mozilla/Firefox/Profiles/iuhez8m4.default-release/cookies.sqlite" "<视频URL>"
# 指定分辨率
you-get --format dash-hdflv2_4k "<视频URL>"
```
