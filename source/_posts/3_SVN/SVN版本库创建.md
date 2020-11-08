---
title: SVN版本库创建
date: '2020-11-01 11:36:12'
updated: '2020-11-01 12:24:47'
categories:
  - 3 SVN
---
# SVN版本库创建

## Ubuntu16.04创建SVN版本库

参考：<http://blog.csdn.net/Eric_lmy/article/details/51942931>

　　一种做法是，创建一个存放SVN仓库的目录，这个目录下可以存放多个SVN仓库，例如/home/svn（最好不要使用/root目录，虽然这里没什么问题，但是如果想要使用浏览器即http方式访问svn仓库，apache服务器访问仓库会出现permission denied的问题），然后使用以下命令：

```sh
apt-get install subversion
svnadmin create ~/svn/SVN仓库目录名
```

　　这样，这个仓库的根目录的URL就是“svn://hostname/SVN仓库名”。在建立其他仓库也是同样的方法。

　　创建的SVN仓库目录下，重要的是conf目录。conf目录下，svnserve.conf是主配置文件，authz文件是设置用户权限，passwd文件是存储用户及密码。

### svnserve.conf示例（配置项前不能有空格）：

```
[general]
# 匿名用户不允许读写
anon-access = none
# 授权用户允许读写
auth-access = write
# 密码文件使用本目录的passwd文件
password-db = passwd
# 用户文件使用本目录的authz
authz-db = authz  
```
多个仓库可以共用paawd文件和authz文件。

### passwd示例（明文配置，如果要加密配置，可以使用htpasswd）：

　　明文配置：

```
[users]    
用户名=密码  
```

　　使用htpasswd加密配置：

```sh
#创建或者重写passwd文件
htpasswd -c passwd 用户名
#向passwd文件增加用户名密码
htpasswd passwd 用户名
```

### authz示例

```
[groups] 
用户组 = 用户1,用户2 
[SVN仓库名:/]
@用户组 = rw
用户3 = r 
```
### 启动

　　然后启动监听端口就好了：

```sh
svnserve -d -r ~/svn  
```

　　用TortoiseSVN（Win）、svn co（Linux）等工具从“svn://hostname/SVN仓库名”检出（checkout）仓库的工作副本就好了。

### 其他

　　如何让Apache2访问SVN仓库，从而让SVN仓库可以用浏览器访问请看[Apache2学习笔记](/笔记/Apache2#http访问SVN仓库)
