---
title: 使用OpenSSH免密登录
date: '2020-11-01 11:36:12'
updated: '2020-11-01 12:24:47'
categories:
  - 3.6 OpenSSH
---
# 使用OpenSSH免密登录

## 原理

　　客户端产生一对公私钥，把公钥给服务端，服务端把公钥加入信任列表，这样客户端就可以凭私钥免密登陆了。

　　对于Linux的服务端，公钥信任列表在~/.ssh/authorized_keys（需要自己创建，权限必须是600）。里面一行存放一个公钥。~/.ssh/authorized_keys注释以“#”开头。

## Github免密操作

　　打开Git Bash，用

```sh
ssh-keygen -t rsa
```

　　在`系统盘:\用户\用户名\.ssh`下生成id_rsa（私钥）和id_rsa.pub（公钥）。把公钥在Github上的`Settings->SSH and GPG Keys`里添加。

　　然后clone通信协议为ssh（https不行，有其他方法）的项目就可以进行免密码push之类的操作了。

![](https://raw.githubusercontent.com/furrybear/res/master/img/20190223102902.png)

## Linux免密ssh登陆Linux服务器

　　用

```sh
ssh-keygen -t rsa
```

　　在~/.ssh下生成id_rsa（私钥）和id_rsa.pub（公钥）。然后：

```sh
#服务器ssh端口是22
ssh-copy-id -i ~/.ssh/id_rsa.pub 服务器用户名@服务器主机名
#服务器ssh端口不是22
ssh-copy-id -i ~/.ssh/id_rsa.pub -p 23 服务器用户名@服务器主机名"
```

这样就可以把公钥传给服务器了。
