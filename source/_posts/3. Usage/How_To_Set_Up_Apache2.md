---
title: Apache2学习笔记
category: 笔记
date: '2017-11-05 04:13:48'
tags:
  - Apache2
updated: '2020-11-01 12:23:05'
categories:
  - 3. Usage
---

# 重要的配置文件

　　Ubuntu下比较重要的配置文件在

- /etc/apache2/apache2.conf
- /etc/apache2/ports.conf
- /etc/apache2/sites-available
- /etc/apache2/sites-enable

　　Win下配置网站根目录的文件是

- https-vhosts.conf

# http方式访问SVN仓库

　　我是在root下操作的。首先安装插件，让Apache2能够处理SVN的相关事务：

```sh
apt-get install libapache2-svn 
```

　　假设`/home/svn`下有一至多个SVN仓库，我们要操作的SVN版本库在`/home/svn/repos`，首先先改变文件权限让它可以被Apache2操作：

```sh
chown -R www-data:www-data /home/svn/repos 
```

　　然后做个从`/etc/apache2/mods-available/dav_svn.conf`到`/etc/apache2/mods-enabled/dav_svn.conf`的符号链接（使用绝对路径），启用这个模块：

```sh
ln -s /etc/apache2/mods-available/dav_svn.conf /etc/apache2/mods-enabled/dav_svn.conf
```

　　编辑`/etc/apache2/mods-enabled/dav_svn.conf`为：

```
<Location /svn>
  DAV svn

  #SVNPath、SVNParentPath不能共存（分别对应单仓库和多仓库）
  #不知道为什么设置这个不可行
  #SVNPath /home/repos
  SVNParentPath /home/svn

  AuthType Basic
  AuthName "Bear's SVN"
  #存密码的文件
  AuthUserFile /home/svn/repos/conf/passwd
  #存用户权限的文件
  AuthzSVNAccessFile /home/svn/repos/conf/authz
  Require valid-user
```

　　注意密码文件`/home/svn/repos/conf/passwd`不能用明文形式，要用`htpasswd`命令生成的那种。

　　注意在`/etc/apache2/ports.conf`中设置要监听80端口。

　　然后重启Apache2，就可以从`http://主机名/svn/repos`访问SVN仓库了。

# 为php设置添加$_SERVER服务器环境变量

参考：<https://segmentfault.com/a/1190000004634251>

```
SetEnv 变量名 变量值
```

示例：

```
<VirtualHost *:80>
    ServerAdmin webmaster@demo.com
    DocumentRoot "e:\wwwroot\demo"
    ServerName my.demo.com
    ErrorLog "logs/my.demo.com-error.log"
    CustomLog "logs/my.demo.com-access.log" common
    SetEnv RUNTIME_ENVIROMENT DEV

    <Directory "e:\wwwroot\demo">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

# htaccess

## Options选项

```
Options Indexes FollowSymLinks
```

- Indexes：目录下没有index.html的话，浏览器会显示该目录的目录结构，列出该目录下的文件和子目录

- FollowSymLinks：允许在此目录中使用符号连接

## 禁止访问某些目录或者文件

　　首先在服务器全局配置文件（我这里是`/etc/apache2/apache2.conf`）或者站点配置文件（`/etc/apache2/sites-available/什么什么.conf`）里设置，使得网站根目录下的`.htaccess`文件可以生效：

```
<Directory />
...
AllowOverride All
...
</Directory>
```

　　我现在的做法是在要被禁止访问的文件旁创建.htaccess文件，添加

```
<Files 文件名> 
	Require all denied
</Files> 
```

在被禁止访问的目录下创建.htaccess文件，添加

```
Require all denied
```

注意，“Require all denied”应该只有Apache2.4及以上支持。

　　例如，只允许访问index.php：在旁创建.htaccess文件

    ```
    <Files ~ "^(?!index.php$)">
 	    Require all denied
    </Files>
    ```

　　“~”是指启用正则，以上是指文件名或者目录名不是index.php的都禁止访问。
