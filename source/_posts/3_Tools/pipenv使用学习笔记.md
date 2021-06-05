---
title: pipenv使用学习笔记
date: '2020-11-01 11:36:12'
updated: '2020-11-01 12:24:47'
categories:
  - 3 Tools
---
# pipenv使用学习笔记

## 参考

- <https://farer.org/2018/01/16/pipenv-notes/>

- <https://www.jianshu.com/p/8c6ae288ba48>

## 简介

　　Python的包管理器，能让Python像Nodejs把依赖包安装在当前目录而不是全局。在pipenv的虚拟环境中可以使用pipenv安装的依赖包。

　　Pipefile文件记录了依赖的包，Pipefile.lock文件记录的依赖包的版本号。

## 使用

### 安装

```sh
pip3 install pipenv
```

### 初始化虚拟环境

```sh
mkdir .venv
# 初始化虚拟环境，使用python3
pipenv --three
```

（参考：<https://www.jianshu.com/p/8c6ae288ba48>）

　　在初始化虚拟环境的时候，pipenv默认会把虚拟环境的存储目录以及后来安装的各种模块放到`$HOME/.local/share/virtualenvs`里，如果想放到其他地方可以有以下几种方法（不建议）：

1. `export PIPENV_VENV_IN_PROJECT=1`，设置这个环境变量，pipenv会在当前目录下创建.venv的目录，以后都会把模块装到这个.venv下。

2. 自己在项目目录下手动创建.venv的目录，然后运行`pipenv run`或者`pipenv shell`都会在.venv目录下创建虚拟环境。

3. 设置WORKON_HOME环境变量为其他路径 （如果当前目录下已经有.venv,此项设置失效）。

## 安装包

```sh
# 生产环境依赖包
pipenv install <包名>
# 开发环境依赖包
pipenv install --dev <包名>
```

　　这样就能将在.venv里安装对应包，并在Pipfile中写入对应包名。

## 在虚拟环境执行命令

```sh
pipenv run <命令>
```

　　例如，`pipenv run python3 main.py`。

## 根据已有Pipfile文件安装对应的包

```sh
# 安装所有生产环境依赖包
pipenv install
# 安装所有依赖包
pipenv install --dev
```

## 其他命令

```sh
#　进入虚拟环境
pipenv shell
# 查看当前环境安装的包
pipenv graph
# 更新Pipefile.lock
pipenv lock
```

## 设置环境变量

　　.env文件负责虚拟环境里的环境变量：

```sh
echo "FOO=23333" > .env
```
