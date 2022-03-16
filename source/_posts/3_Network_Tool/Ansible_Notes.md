---
title: Ansible 笔记
date: '2020-11-01 11:36:11'
updated: '2022-03-16 10:18:00'
categories:
  - 3 Network Tool
---

# Ansible 笔记



## 使用

　　使用分为 Ad-hoc 方式和 Playbook 方式。

　　Ad-hoc方式使用例子：

```sh
ansible -i <inventory文件路径（默认是/etc/ansible/hosts）> <组名/主机名> -m <模块名（默认是command）> -a <参数>
```

## 参考

[^1]: [Ansible 简介](https://jin-yang.github.io/post/python-ansible.html)

[^2]: [探索Ansible执行原理](https://www.the5fire.com/explore-the-ansible.html)

