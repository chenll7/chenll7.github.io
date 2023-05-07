---
title: Git 技巧
date: '2022-01-25 11:03:36'
updated: '2023-05-07 20:03:49'
categories:
  - 3 Version Control Tool
---


# Git 技巧

## 使用`git rebase`

　　在向远程仓库推送（Push）时，如果本地分支落后于追踪的远程分支，Git 工具会提示推送（Push）失败。这时候有些人会使用`git pull`来讲远程分支的提交（Commit）`merge`到本地分钟上。这样会使得本地分支上出现一个 Merge 提交，不是特别优雅，因为这时候相比远程分支只是做了一个简单的修改提交。这个时候可以这么做：

```shell
# 更新所有远程追踪分支。
git remote update
# 将本地分支比远程分支分叉出来的若干提交嫁接到远程分支最新提交上。
git rebase <远程主机名>/<分支名>
# 推送
git push
```



