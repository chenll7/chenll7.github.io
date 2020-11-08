---
title: Powershell学习笔记
date: '2020-11-01 11:36:11'
updated: '2020-11-07 10:37:05'
categories:
  - 2 Powershell
---
# Powershell学习笔记

## 参考

- [PowerShell让系统可以执行.ps1文件](http://www.splaybow.com/post/powershellexecps1.html)

- [mbadolato/iTerm2-Color-Schemes: Over 200 terminal color schemes/themes for iTerm/iTerm2 (with ports to Terminal, Konsole, PuTTY, Xresources, XRDB, Remina, Termite, XFCE, Tilda, FreeBSD VT, Terminator, and Kitty)](https://github.com/mbadolato/iTerm2-Color-Schemes)

- [Releases · Microsoft/console](https://github.com/Microsoft/console/releases)

- <https://segmentfault.com/a/1190000015928399>
## 允许执行ps1文件

管理员权限下执行`set-executionpolicy -executionpolicy RemoteSigned`。

## 语法

### 函数

示例：

```powershell
function doMyWork{
    ls
}
```

##  Profile

　　Profile是Powershell启动时运行文件，类似于Bash的bashrc和profile、Zsh的zshrc。

查看Profile文件位置：

| Description                | Name                              |
| :------------------------- | :-------------------------------- |
| Current User, Current Host | `$PROFILE`                        |
| Current User, Current Host | `$PROFILE.CurrentUserCurrentHost` |
| Current User, All Hosts    | `$PROFILE.CurrentUserAllHosts`    |
| All Users, Current Host    | `$PROFILE.AllUsersCurrentHost`    |
| All Users, All Hosts       | `$PROFILE.AllUsersAllHosts`       |

一般它们的值是：

| Description                | Path                                                         |
| :------------------------- | :----------------------------------------------------------- |
| All Users, All Hosts       | `$PSHOME\Profile.ps1`                                        |
| All Users, Current Host    | `$PSHOME\Microsoft.PowerShell_profile.ps1`                   |
| Current User, All Hosts    | `$Home\[My ]Documents\PowerShell\Profile.ps1`                |
| Current user, Current Host | `$Home\[My ]Documents\PowerShell\Microsoft.PowerShell_profile.ps1` |

一般Profile文件在没有使用前是不存在的，使用以下命令为当前用户创建Profile并返回文件地址：

```
New-Item -Type file -Force $PROFILE.CurrentUserAllHosts
```

## 设置快捷键Ctrl+d退出powershell

```powershell
Set-PSReadlineKeyHandler -Key ctrl+d -Function ViExit
```

## 美化

　　Github上的[Microsoft/console](https://github.com/Microsoft/console/releases)里的Color Tool可以修改配色，命令：

```
.\ColorTool.exe -b <配色文件名>
```

　　好看的配色在[mbadolato/iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes)，比如ayu。

## 设置代理

```powershell
netsh winhttp set proxy proxy-server="http=localhost:7890;https=localhost:7890"
# Cancel
netsh winhttp reset proxy
```

For some programs migrated from UNIX-like platform:

```sh
$env:HTTPS_PROXY="http://localhost:7890"
$env:HTTP_PROXY="http://localhost:7890"
```

