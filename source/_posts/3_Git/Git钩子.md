---
title: Git钩子
date: '2020-11-01 11:36:12'
updated: '2020-11-07 10:37:05'
categories:
  - 3 Git
---
# Git钩子

　　本仓库被push后将工作区代码更新为最新版本，.git/hooks/post-update内容如下：

```sh
#!/bin/sh

# 注意，这很重要！
unset GIT_DIR

cd ..
git reset --hard HEAD
```

