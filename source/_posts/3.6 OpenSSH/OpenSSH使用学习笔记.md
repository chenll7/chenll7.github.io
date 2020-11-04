---
title: OpenSSH使用学习笔记
date: '2020-11-01 11:36:12'
updated: '2020-11-01 12:24:47'
categories:
  - 3.6 OpenSSH
---
# OpenSSH使用学习笔记

## OpenSSH包含的工具

参考：<https://www.openssh.com/>

The OpenSSH suite consists of the following tools:

- Remote operations are done using [ssh](https://man.openbsd.org/?query=ssh&sektion=1), [scp](https://man.openbsd.org/?query=scp&sektion=1), and [sftp](https://man.openbsd.org/?query=sftp&sektion=1).

- Key management with [ssh-add](https://man.openbsd.org/?query=ssh-add&sektion=1), [ssh-keysign](https://man.openbsd.org/?query=ssh-keysign&sektion=8), [ssh-keyscan](https://man.openbsd.org/?query=ssh-keyscan&sektion=1), and [ssh-keygen](https://man.openbsd.org/?query=ssh-keygen&sektion=1).
- The service side consists of [sshd](https://man.openbsd.org/?query=sshd&sektion=8), [sftp-server](https://man.openbsd.org/?query=sftp-server&sektion=8), and [ssh-agent](https://man.openbsd.org/?query=ssh-agent&sektion=1).
