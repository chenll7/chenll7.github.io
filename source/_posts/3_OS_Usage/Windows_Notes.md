---
title: Windows 笔记
date: '2020-11-01 11:36:12'
updated: '2022-03-16 10:18:03'
categories:
  - 3 OS Usage
---
# Windows 笔记

## KMS激活方法

```cmd
slmgr /skms kms.moeclub.org
slmgr /ato
```

## 常用快捷键

- Win+p：显示选项，外接屏幕时用到。

## 常用设置

### 更新后不重启

gpedit.msc > 计算机配置 > 管理模板 > Windows组件 > Windows 更新 > 对于有已登录用户的计算机，计划的自动更新安装不执行重新启动。

### hosts文件

`C:\Windows\System32\drivers\etc\hosts`

### 开始菜单

所有用户：`%ProgramData%\Microsoft\Windows\Start Menu`

单用户：`%AppData%\Microsoft\Windows\Start Menu`

### 开机启动

Put executed files into `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp`.

### 以太网有线连接设置流量限制

参见[配置Windows 10以太网有线连接为「计量」连接类型](https://www.sysgeek.cn/windows-10-set-ethernet-connection-metered/)

### 无TPM模块时对系统盘进行Bitlocker加密

　　`Win键+R`打开运行窗口，输入`gpedit.msc`进入本地组策略编辑器。展开`计算机配置-管理模板-Windows组件-BitLocker驱动器加密-操作系统驱动器（Reqiure additional authentication at startup）`，找到“启动时需要附加身份验证”，将其配置为”已启用”并且勾选”没有兼容的TPM时允许BitLocker（在U盘上需要密码或启动密钥）”。

### 封闭USB口

　　封闭USB口有好多方法,其中一个是将注册表中`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\USBSTOR`里`Start`的值改为4（禁止自动启动），默认为3（自动分配盘符）。

### 关闭应用执行别名功能

　　Win10中输入`python`、`python3`会弹出Microsoft Store，这是应用执行别名功能，微软希望你去Microsoft Store下载安装python。

　　Windows搜索中（Win+q）输入“Manage app execution aliases”（"管理应用执行别名"），然后关闭这俩应用执行别名。

### 移除UWP访问本地回环地址限制

#### 方法1

　　UWP默认无法访问回环地址localhost。可以使用CheckNetIsolation.exe移除这个限制。

　　允许邮件与日历使用代理软件。以管理员权限打开cmd，并键入以下内容：

```cmd
CheckNetIsolation.exe LoopbackExempt -a -p=S-1-15-2-2551677095-2355568638-4209445997-2436930744-3692183382-387691378-1866284433
rem 貌似这个没用？
CheckNetIsolation.exe LoopbackExempt -a -p=S-1-15-2-2750798217-1343590035-1234819260-1030354384-3318145141-3720257911-3461195215
```

#### 方法2

　　使用[EnableLoopback Utility](http://www.apprcn.com/enableloopback-utility.html)，与Fiddler功能类似。

