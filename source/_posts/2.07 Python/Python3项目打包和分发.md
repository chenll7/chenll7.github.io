---
title: Python3项目打包和分发
date: '2020-11-01 11:36:11'
updated: '2020-11-04 22:14:24'
categories:
  - 2.07 Python
---
# Python3项目打包和分发

## 相关链接

- [Python Packaging User Guide](https://packaging.python.org/)

## 常见项目结构

　　Python3项目一般打包作为一个Python3包（Package）安装在别人在计算机上。具体项目结构和setup.py文件编写见[Packaging Python Projects](https://packaging.python.org/tutorials/packaging-projects/)。

## 打包分发

　　为了分发Python3包，需要将项目打包为一个文件，一般使用`./setup.py bdist_wheel`将项目打包为wheel格式文件。在其他机器上使用`pip3 install <文件名>.whl`安装Python3包。

　　如果分发时不需要将文件打包为一个wheel文件，可以在项目目录下执行`pip3 install .`即可以安装项目；执行`pip3 install -e .`为调试模式，（让人疑惑的是，调试模式下无法删除scripts文件，即无法干净卸载）。项目托管在git仓库上时，可以之间用`pip3 install git+ssh://<主机名>/<用户名>/<仓库名>`或者`pip3 install git+https://<主机名>/<用户名>/<仓库名>`安装。

## 非代码文件打包

　　一般打包时只打包py文件。非py文件打包分两种，一种是打包进包中，另一种是其他位置。

1. 打包进包中

　　一种方法是在包中放置MANIFEST.in，具体方法见[Adding Non-Code Files](https://python-packaging.readthedocs.io/en/latest/non-code-files.html)。

　　另一种方法是在setup.py中增加`package_data`字段。我没有实践过，具体方法见[Packaging and distributing projects](https://packaging.python.org/guides/distributing-packages-using-setuptools/#package-data)

2. 安装时放到其他位置
　　在setup.py中增加`data`字段。具体方法见[Packaging and distributing projects](https://packaging.python.org/guides/distributing-packages-using-setuptools/#data_files)。例如：

```python
//...
data_files=[('config', ['config/hehe.yml'])],　　
//...
```

　　普通用户权限下安装一般会放到`$HOME/.local/config/hehe.yml`（前缀取决于site.USER_BASE变量），root权限下安装一般会放到`/usr/local/config/hehe.yml`（前缀取决于sys.prefix变量）。

## setup.py例子

```python3
#!/usr/bin/env python3
import os
from setuptools import setup

with open('requirements.txt') as f:
    requirements = f.read().splitlines()

with open('README.md') as f:
    readme_content = f.read()


setup(
    name="img_mgr",
    version="0.0.1",
    author="Furrybear",
    author_email="fbcll@outlook.com",
    description=("Miaomiao."),
    license="GPLv2",
    keywords="image manager",
    url="",
    packages=['img_mgr'],
    long_description=readme_content,
    scripts=[
        'scripts/bear-img-export',
        'scripts/bear-img-repair'
    ],
    install_requires=requirements
)
```
