---
title: ffmpeg 笔记
date: '2020-11-01 11:36:11'
updated: '2023-05-07 20:03:38'
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

```shell
# 转为x264格式、保留元信息、适配iTunes导入格式
ffmpeg -i "$file" -c:v libx264 -x264-params crf=17 -strict -2 -map_metadata 0 -map_metadata:s:v 0:s:v -map_metadata:s:a 0:s:a -profile:v baseline -level 3.0 -pix_fmt yuv420p "${file}.mp4"
# iOS Compatability 
# Profile  Level Devices                                                     Options
# Baseline 3.0  All devices                                                  -profile:v baseline -level 3.0
# Baseline 3.1  iPhone 3G and later, iPod touch 2nd generation and later     -profile:v baseline -level 3.1
# Main     3.1  iPad (all vers), Apple TV 2 and later, iPhone 4 and later    -profile:v main -level 3.1
# Main     4.0  Apple TV 3 and later, iPad 2 and later, iPhone 4s and later  -profile:v main -level 4.0
# High     4.0  Apple TV 3 and later, iPad 2 and later, iPhone 4s and later  -profile:v high -level 4.0
# High     4.1  iPad 2 and later, iPhone 4s and later, iPhone 5c and later   -profile:v high -level 4.1
# High     4.2  iPad Air and later, iPhone 5s and later                      -profile:v high -level 4.2
```
