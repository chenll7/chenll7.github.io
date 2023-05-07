---
title: Linux下用户和用户组
date: '2017-10-11 08:00:00'
category: 笔记
updated: '2023-05-07 20:03:43'
categories:
  - 3 OS Usage - Linux
---

# Linux下用户和用户组

## 将某个用户加入某个组

```shell
usermod -a -G 组名 用户名
```
## 改变某个用户所在的组

```shell
usermod ‐g 组名 用户名
```

## 查看本机有哪些用户

```sh
cat /etc/passwd|grep bash
```

有bash的是正常人类使用的用户

## 查看本机有哪些用户组

```sh
cat /etc/group
```
## 删除用户和他的家目录

```shell
userdel –r 用户
```

```shell
# Delete the user from file /etc/passwd and delete home folder and the mail folder of the user.
userdel -r <user to be deleted>
# Delelte the primary group (defalut group) of the deleted user.
groupdel <user to be deleted>
```

## 删除某个用户组

```shell
groupdel 用户组
```
