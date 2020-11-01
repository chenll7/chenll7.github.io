---
title: Study Notes of Usage of Vagrant
date: '2020-11-01 11:36:12'
updated: '2019-09-30 21:53:02'
categories:
  - 3. Usage
---
# Study Notes of Usage of Vagrant


## Basic Usage 

```sh
# Add ubuntu 18.04 box
vagrant box add https://mirrors.tuna.tsinghua.edu.cn/ubuntu-cloud-images/bionic/current/bionic-server-cloudimg-amd64-vagrant.box --name ubuntu/bionic
# Create Vagrantfile
vagrant init

```

Modify the vagrantfile like this:

```vagrantfile
...
config.vm.box = "ubuntu/bionic"
...
```

Then:

```sh
vagrant up
```

## References

- <https://segmentfault.com/q/1010000011063709>
- <https://www.jianshu.com/p/95cc72fbb430>

