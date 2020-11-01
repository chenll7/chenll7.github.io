---
title: How_To_Set_Up_Ftp
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:23:05'
categories:
  - 3. Usage
---
# Win

<https://blog.csdn.net/u013943420/article/details/75103514>

# Ubuntu 16.04

参考：
<https://blog.csdn.net/bluishglc/article/details/42399439>
<http://bbs.chinaunix.net/thread-2169510-1-1.html>

放在前面：这个笔记用vsftpd搭建的ftp服务器的用户是Linux的用户，不是虚拟用户，但不代表vsftpd不能创建虚拟用户。同时也意味着ftp仓库只有一个用户，更精确的权限控制需要参考其他资料。

```sh
apt-get install vsftpd
```

可以使用下列命令来打开，关闭，重启ftp服务

```sh
service vsftpd start
service vsftpd stop
service vsftpd restart
```
因为vsftpd的用户信息用Linux的用户信息，创建用户uftp，用/usr/sbin/nologin不让该用户登陆：

```sh
adduser uftp -s /usr/sbin/nologin
```

一同创建的还有/home/uftp，它是ftp仓库的根目录。

ftp的pam模块在ftp登陆时会检查/etc/shells里是否有/usr/sbin/nologin，因此在/etc/shells增加一行

```
/usr/sbin/nologin
```

然后编辑/etc/vsftpd.conf，一个可能的内容（去掉了注释）如下：

```
listen=NO
listen_ipv6=YES
anonymous_enable=NO
local_enable=YES
write_enable=YES
local_umask=022
dirmessage_enable=YES
use_localtime=YES
xferlog_enable=YES
connect_from_port_20=YES
xferlog_std_format=YES
chroot_local_user=YES
chroot_list_enable=NO
allow_writeable_chroot=YES
secure_chroot_dir=/var/run/vsftpd/empty
pam_service_name=vsftpd
rsa_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
rsa_private_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
ssl_enable=NO
```

然后重启vsftpd

```sh
service vsftpd restart
```

