---
title: ImageMagick笔记
date: '2020-11-01 11:36:11'
updated: '2021-01-30 20:08:23'
categories:
  - 3 Tools
---
# ImageMagick笔记

## 安装

```shell
// Apt包管理器
sudo apt install -y imagemagick
```

## 使用

- 缩放（例子）：`convert -resize 50% screen.jpg`
- 顺时针旋转90度：`convert -rotate 90 screen.jpg`
- PNG格式转JPEG格式：
