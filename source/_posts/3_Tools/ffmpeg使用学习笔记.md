---
title: ffmpeg使用学习笔记
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:24:47'
categories:
  - 3 Tools
---
# ffmpeg使用学习笔记

## mp4转mp3

```sh
ffmpeg -i video.mp4 -vn  -acodec libmp3lame -ac 2 -qscale:a 4 -ar 48000  audio.mp3
```

## flac转mp3

```
ffmpeg -i input.flac -ab 320k -map_metadata 0 -id3v2_version 3 output.mp3
```
