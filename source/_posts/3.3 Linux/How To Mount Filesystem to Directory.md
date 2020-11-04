---
title: How To Mount Filesystem to Directory
date: '2020-11-01 11:36:12'
updated: '2020-11-01 12:24:47'
categories:
  - 3.3 Linux
---
# How To Mount Filesystem to Directory

## 挂载远程Samba目录

　　在/etc/fstab添加如下内容：

```
//<IP>/<Directory name> <Mount directory> cifs username=<Username>,password=<Password>,uid=1000,gid=1000,file_mode=0640,dir_mode=0750 0 0
```

　　如果想要修改后立刻生效，执行以下命令：

```sh
sudo mount -a
```

