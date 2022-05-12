---
title: Webm 格式贴图转 GIF 格式
date: '2022-05-12 09:32:18'
updated: '2022-05-12 09:48:05'
categories:
  - 3 Image Processing Tool
---
# Webm 格式贴图转 GIF 格式

　　因为 TG 上下载的贴图有些是 Webm 格式的，需要转成 GIF 格式。

　　转的过程中需要保留透明值，即 Alpha 通道。目前只有 Honeycam 能做到。

　　因为 Honeycam 未注册版只能支持 10 秒内视频，并且会在左上角加水印。所以这个方法受限于这个限制。

1. 执行`ffmpeg -c:v libvpx-vp9 -c:v libvpx -pix_fmt yuva420p -auto-alt-ref 0 -metadata:s:v:0 alpha_mode="1" -acodec libvorbis  -vf "pad=512:600:0:200:black" -i input.webm intermediate.webm`。因为 Honeycam 未注册版会在左上角加水印，我们在上头增加 200 像素的黑边。
2. 打开 Honeycam 将 intermediate.webm 转为 intermediate.gif 。
3. 打开 PS 将 intermediate.gif 中上方黑色部分裁剪掉另存为 result.gif 。
