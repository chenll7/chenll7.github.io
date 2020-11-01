---
title: Powershell常用代码片段
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:23:05'
categories:
  - 2. Programming in Powershell
---
# Powershell常用代码片段

## 批量重命名

　　例如我想把目录下形如“WeChat Image_20191123191011.jpg”的文件重命名为形如“2019-11-23 19-10-11 WeChat Image.jpg”，首先添加`-WhatIf`参数预先查看修改结果，此时并没有实际修改：

```powershell
Get-Childitem | Rename-Item -NewName { $_.Name -replace '^WeChat\sImage_(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\.jpg$', '$1-$2-$3 $4-$5-$6 Wechat Image.jpg' } -WhatIf
```

　　然后去掉`-WhatIf`执行：

```powershell
Get-Childitem | Rename-Item -NewName { $_.Name -replace '^WeChat\sImage_(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\.jpg$', '$1-$2-$3 $4-$5-$6 Wechat Image.jpg' }
```

就成功了。

## 递归删除目录

```powershell
ri ./node_modules -Recurse -Force -Confirm:$false
```

