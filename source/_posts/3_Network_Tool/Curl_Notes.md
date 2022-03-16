---
title: Curl 笔记
date: '2022-02-23 16:21:28'
updated: '2022-03-16 10:18:01'
categories:
  - 3 Network Tool
---
# Curl 笔记

如何进行POST请求的例子：

```powershell
curl https://localhost:8080 `
    -X POST `
    -H 'Content-Type: application/json' `
    -d '{"login":"my_login","password":"my_password"}'
```

```shell
curl https://localhost:8080 \
    -X POST \
    -H 'Content-Type: application/json' \
    -d '{"login":"my_login","password":"my_password"}'
```

