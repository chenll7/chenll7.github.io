---
title: Bash使用学习笔记
date: '2020-11-01 11:36:11'
updated: '2020-11-04 22:14:24'
categories:
  - 2.09 Shell
---
# Bash使用学习笔记

## 脚本执行前执行的脚本

![](https://raw.githubusercontent.com/furrybear/res/master/img/20190501141959.png)

　　对bash来说，每次运行前会执行一些脚本用于定义环境变量或者做其他工作。执行的方式是`source <脚本名>`，或者可以说是`. <脚本名>`。

### 非交互式Shell（Non-Interactive Shell）

　　这种情况不会事先执行任何脚本。例如我们使用`ssh <用户名>@<主机名> "<命令>"`时，脚本里的PATH就仅是/etc/environment里的内容。所以有必要请修改/etc/environment。

### 交互式Shekll（Interactive Shell）

　　交互式Shell会事先执行的脚本分为Bashrc系列脚本和Profile系列脚本，前者是“Bash Resource Configuration”的意思。

#### Bashrc系列脚本

##### /etc/bashrc

　　对所有用户生效。

　　Debian系用/etc/bash.bashrc代替。

##### ~/.bashrc

　　仅对本用户生效。

#### Profile系列脚本

##### /etc/profile

　　对所有用户生效。

　　任何用户登录时都会读取。调用/etc/profile时，/etc/profile会调用**/etc/profile.d**下所有脚本。

　　它被sh、bash、ksh、ash所共享使用。

/etc/profile中直接使用

```sh
PATH=$PATH:<新路径>
```

就可以，不需要export。

##### ~/.profile或\~/.bash_login

　　仅对本用户生效。

　　每次只会读取并执行其中存在的第一个：~/.bash_profile、\~/.bash_login、\~/.profile。

##### ~/.bash_logout

　　仅对本用户生效。

　　注销时，且是login形式，此文件才会读取。但是GUI上用户注销时，此文件不会被读取。

### 执行顺序

　　非登陆交互式Shell（Non-Interactive Login Shell）只会执行Bashrc系列脚本。

　　登陆交互式脚本Shell（Interactive Login Shell）会执行Profile系列脚本,再由其调用Bashrc系列脚本。

- 非登陆交互式Shell：在GUI打开终端，或者交互式Shell下执行`bash`
- 登陆交互式Shell：tty或者SSH方式登陆进入机器，或者交互式Shell下执行`bash -l`

以下是各个脚本的执行时机，括号内是执行顺序：

| 脚本                       | GUI             | ssh或tty                | 非登陆交互式Shell |
| -------------------------- | --------------- | ----------------------- | ----------------- |
| /etc/profile               | 用户登陆时（1） | 进入Shell时（1）        | 不执行            |
| /etc/bashrc                | 打开终端（3）   | 被/etc/profile调用（1） | 进入Shell时（1）  |
| ~/.profile或\~/.bash_login | 用户登陆时（2） | 进入Shell时（2）        | 不执行            |
| ~/.bashrc                  | 打开终端（4）   | 被~/.profile调用（2）   | 进入Shell时（2）  |
| ~/.bash_logout             | **不执行**      | 登出时（3）             | 不执行            |

### 常见做法

　　在我的经验中，Profile系列脚本一般在登录时执行一次，Bashrc系列脚本在每次打开终端都会执行。所以还是看不懂为什么要设置两套脚本。

　　在Ubuntu下，建议把alias的命令放在~/.bash_aliases，~/.bashrc会调用这个文件。

