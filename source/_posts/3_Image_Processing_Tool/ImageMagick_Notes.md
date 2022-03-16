---
title: ImageMagick 笔记
date: '2020-11-01 11:36:11'
updated: '2022-03-16 10:17:59'
categories:
  - 3 Image Processing Tool
---
# ImageMagick 笔记

## 安装

```shell
// Apt包管理器
sudo apt install -y imagemagick
```

## 使用

- 缩放（例子）：`convert -resize 50% screen.jpg`
- 缩放当前目录下所有图片：`for f in *;do convert -resize 30% "$f" "${f%.*} Modified.${f##*.}";done`
- 顺时针旋转90度：`convert -rotate 90 screen.jpg`
- PNG格式转JPEG格式：
