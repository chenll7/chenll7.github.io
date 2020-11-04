---
title: Windows使用学习笔记
date: '2020-11-01 11:36:12'
updated: '2020-11-04 22:14:24'
categories:
  - 3.04 Windows
---
# Windows使用学习笔记

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
