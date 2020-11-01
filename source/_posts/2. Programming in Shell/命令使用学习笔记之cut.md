---
title: 命令使用学习笔记之cut
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:23:05'
categories:
  - 2. Programming in Shell
---
# 命令使用学习笔记之cut

```sh
#取每行第3个字符、第5到7个字符
cut -c 3,5-6 <文件名>
#以冒号为分隔符
cat /etc/passwd | cut -d : -f 3,5-6
```
