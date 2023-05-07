---
title: Curl 笔记
date: '2022-02-23 16:21:28'
updated: '2023-05-07 20:03:38'
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

