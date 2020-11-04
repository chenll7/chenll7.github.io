---
title: Linux下用户权限和用户组
date: '2017-10-11 08:00:00'
category: 笔记
tag:
  - Linux
updated: '2020-11-04 22:14:24'
categories:
  - 3.03 Linux
---
# 某个用户所在的组
## 将某个用户加入某个组

```shell
usermod -a -G 组名 用户名
```
## 改变某个用户所在的组

```shell
usermod ‐g 组名 用户名
```

# 查看本机有哪些用户

```sh
cat /etc/passwd|grep bash
```

有bash的是正常人类使用的用户

# 查看本机有哪些用户组

```sh
cat /etc/group
```
# 删除用户和他的家目录

```shell
userdel –r 用户
```

# 删除某个用户组

```shell
groupdel 用户组
```
