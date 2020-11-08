---
title: How to Use Pip
date: '2020-11-01 11:36:11'
updated: '2020-11-07 10:37:05'
categories:
  - 2 Python
---
# How to Use Pip

## Introduction

​    Pip is a ...

## Configuration

### How to Install Packages by a Mirror

​    Temporarily use a mirror:

```sh
pip install --user scrapy -i https://pypi.tuna.tsinghua.edu.cn/simple
```

​    Permanently use a mirror:

​    On UNIX-like OS, create a configuration file `~/.pip/pip.conf`. On Windows, create `%USERPROFILE%\pip\pip.ini`. Then add the following content into the configuration file.

```ini
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

