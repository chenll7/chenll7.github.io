---
title: Ansible使用学习笔记
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:23:05'
categories:
  - 3. Usage
---
# 参考

[Ansible 简介](https://jin-yang.github.io/post/python-ansible.html)

[探索Ansible执行原理](https://www.the5fire.com/explore-the-ansible.html)

# Ad-hoc方式

```sh
ansible -i <inventory文件路径（默认是/etc/ansible/hosts）> <组名/主机名> -m <模块名（默认是command）> -a <参数>
```



# Playbook方式

