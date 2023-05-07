---
title: How to use yarn
date: '2020-11-01 11:36:10'
updated: '2023-05-07 20:03:28'
categories:
  - 2 Node.js
---
# How to use yarn

##  安装

```sh
npm install yarn -g
```

## 软件源改为国内镜像源

```sh
yarn config set registry https://registry.npm.taobao.org/
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass
```

或者使用 YARN registry manager，

```sh
# 安装
npm install -g yrm
# 切换软件源
yrm use taobao
# 测速
yrm test taobao
```

