---
title: Study Notes of Usage of Chocolatery
date: '2020-11-01 11:36:12'
updated: '2020-11-01 12:24:47'
categories:
  - 3 Tools
---
# Study Notes of  Usage of Chocolatery

You must ensure `Get-ExecutionPolicy` is not `Restricted`. If not, type the following command:

```powershell
Set-ExecutionPolicy Bypass -Scope Process
```

Type the following command in powershell.

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

