---
title: Git常见问题
date: '2020-11-01 11:36:12'
updated: '2020-11-07 10:37:05'
categories:
  - 3 Git
---
# Git常见问题


- `warning: LF will be replaced by CRLF in ＜文件名＞.The file will have its original line endings in your working directory`
　　Windows下经常见到的警告。可以不用管。实际上入库的文件的行尾换行仍然是LF。
　　Windows下的Git希望工作区的文件行尾换行是CRLF，版本库里文件行尾换行是LF。因为实际不符合期望，所以出现这个警告。
　　设置core.autocrlf属性为false可以去除警告。


　　
- 如何将`.git`目录分离出工作区
1. 克隆时执行"git init --separate-git-dir=<git仓库位置> ."。
2. 在执行任何git命令时带上`--git-dir=<git仓库位置>`参数。
3. 设置环境变量`GIT_DIR=<git仓库位置>`
