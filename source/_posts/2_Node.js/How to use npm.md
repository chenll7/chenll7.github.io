---
title: How to use npm
date: '2020-11-01 11:36:10'
updated: '2023-05-07 20:03:28'
categories:
  - 2 Node.js
---
# How to use npm

## 软件源改为国内镜像源

```sh
npm config set registry https://registry.npm.taobao.org
```

## Command Line Options

### npm install

- `--save`：安装时将包机器版本信息写入package.json的dependencies，表示发布时的依赖。

- `--save-dev`：安装时将包机器版本信息写入package.json的devDependencies，表示开发时的依赖。
