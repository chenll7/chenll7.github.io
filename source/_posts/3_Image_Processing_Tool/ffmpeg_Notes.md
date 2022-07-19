---
title: ffmpeg 笔记
date: '2020-11-01 11:36:11'
updated: '2022-05-12 16:39:04'
categories:
  - 3 Image Processing Tool
---
# ffmpeg 笔记

## 常用参数

- `-ab`：音频采用率

## 使用例子

```shell
ffmpeg -i <视频文件名> -ab 320k output.mp3
```

```shell
# 截掉开头0.2秒
ffmpeg -i <视频文件名> -ss 0.2 -ab 320k output.mp3
```

```shell
# 只保留开头0.2秒
ffmpeg -i <视频文件名> -t 0.2 -ab 320k output.mp3
```

```shell
# 提取ass字幕
ffmpeg -i input.mkv -an -vn -scodec copy subtitle.ass
```

```shell
# 增加黑边，16:9转4:3，其中180等于(1920-1440)/2
ffmpeg -i input.mkv -vf "pad=1920:1440:0:180:black" output.mp4
```

```shell
# 将一组图片转为avi
ffmpeg -framerate 5 -pattern_type glob -i '*.JPG' video.mp4
```

```shell
# flac转mp3，保留元信息
ffmpeg -i input.flac -ab 320k -map_metadata 0 -id3v2_version 3 output.mp3
```

```shell
# webm 保持 alpha 通道，即保持透明值
ffmpeg -c:v libvpx-vp9 -i input.webm -pix_fmt yuva420p -auto-alt-ref 0 -metadata:s:v:0 alpha_mode="1" -acodec libvorbis result.webm
```
