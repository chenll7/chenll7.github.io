---
title: Linux：进程的用户和用户组
date: '2020-11-01 11:36:12'
updated: '2020-11-04 22:14:24'
categories:
  - 3.03 Linux
---
　　Linux下的进程有用户ID、组ID、补充组ID的属性，这是进程在创建时被赋予的。因此将一个用户加入一个组并不会将一个已有的进程加入那个组。 
　　 
　　对于普通用户的进程，一个进程的子进程的组ID和补充组ID们和父进程相同。但是对于root来说，它可以使用initgroups函数读取/etc/group来设置进程的组ID和补充组ID。 
　　 
　　在我们登陆系统时，root会执行/bin/login来登录用户。/bin/login会调用initgroups来设置用户的shell的组ID和补充组ID。 
　　 
　　因此，我们在使用addgroup或者usermod之类的命令改变用户的组ID或者补充组ID后，并不会当即生效。必须执行`sudo login $USER`登陆新的Shell来生效。（只执行bash或者zsh并不会使得组的改变生效，因为必须由root重新读取/etc/passwd。）
