---
title: Chrome 笔记
date: '2022-02-26 10:59:53'
updated: '2023-05-07 20:03:38'
categories:
  - 3 Network Tool
---
# Chrome 笔记

## 暂时开放跨域限制

```batch
@echo off
call "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:\Users\<Your User Name>\AppData\Local\Google\Chrome\User Data CORS"
```
