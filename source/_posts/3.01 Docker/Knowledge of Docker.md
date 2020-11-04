---
title: Knowledge of Docker
date: '2020-11-01 11:36:12'
updated: '2020-11-04 22:14:24'
categories:
  - 3.01 Docker
---
# Knowledge of Docker

## 底层技术

　　Docker使用Google公司推出的Go语言进行开发实现，基于Linux内核的CGroup、Namespace功能，以及AUFS类的UnionFS等技术。最初实现是基于LXC，从0.7版本以后开始去除LXC，转而使用自行开发的libcontainer，从1.11开始，则进一步演进为使用runC和containerd。

## 概念

###  容器状态

　　docker容器有running和stopped两种状态。docker容器必须有一个前台进程，如果前台进程结束了，那么docker容器就进入了stopped的状态，其他后台进程也停止了。如果找不到合适的前台进程，可以使用`sleep infinity`（Debian镜像的容器）。
## 连接远程docker节点作为daemon

```sh
export DOCKER_HOST=localhost:2375
```

## Docker for Windows使用体验

- 使用host网络模式的时候，访问localhost并不是访问本机，可能是访问了虚拟机。

- 开机无法自启动。

- 经常会升级失败。

## Docker Capabilities
　　虽然docker容器内运行程序的用户是root，但是对于宿主机来说，其权限是小于容器外的root用户的[^1]。因为Linux将用户权限分入了更小的组中，而目前Docker容器启动时默认只有以下14中权限：CHOWN、DAC_OVERRIDE、FSETID、FOWNER、MKNOD、NET_RAW、SETGID、SETUID、SETFCAP、SETPCAP、NET_BIND_SERVICE、SYS_CHROOT、KILL、AUDIT_WRITE。所有Linux权限的列表见[overview of Linux capabilities](http://man7.org/linux/man-pages/man7/capabilities.7.html)。增加或减少Docker的Linux权限可以在`docker run`的时候使用`--cap-add`或者`--cap-drop`。或者使用`--cap-add ALL`或者`--cap-drop ALL`增加或者去掉所有Linux权限。另外如果将`docker run`命令的`privileged`参数设为`true`，那么 Docker 容器的root权限将得到大幅度的提升。此时，容器的root用户将获得 37 项权限，将完全拥有内核的管理权限。[^2]

　　因此在不开启其他Linux权限时容器内进程的运行用户为root时安全的。如果需要开启其他Linux权限，建议在`docker run`命令时添加`--user`参数将容器内进程运行用户改为普通用户以避免安全风险。

## 安全选项
### SELinux安全配置

```sh
docker run
--security-opt="label=user:USER"     : Set the label user for the container
--security-opt="label=role:ROLE"     : Set the label role for the container
--security-opt="label=type:TYPE"     : Set the label type for the container
--security-opt="label=level:LEVEL"   : Set the label level for the container
--security-opt="label=disable"       : Turn off label confinement for the container
```

### AppArmor安全配置（AppArmor security profiles）

AppArmor (Application Armor) 是一个Linux安全模块，用于控制进程对文件资源（包括设备等）的访问，与SELinux类似，受到了Canonical公司的支持。使用`docker run`命令时加`--security-opt="apparmor=PROFILE"`参数来指定访问规则；加`--security-opt apparmor=unconfined`不限制访问。

### Seccomp安全模式（Seccomp security profiles）

Secure computing mode（seccomp）是一个Linux安全特性，用于限制进程使用的系统调用。

在启用Seccomp的Linux系统中，使用`docker run`命令时加`--security-opt seccomp=/path/to/seccomp/profile.json`参数来指定进程可以使用的系统调用。默认情况下有44个系统调用不能使用，可以加`--security-opt seccomp=unconfined`不限制系统调用。

## Bind Propagation（绑定传播）

例子：

```sh
docker run \
  -v /mnt:/tmp:rshared \
  --mount type=bind,source="$(pwd)"/target,target=/app2,readonly,bind-propagation=rslave \
```

控制某个挂载点也被挂载到其他目录时，其子目录也成为挂载点时在其他目录的行为。它有以下6个值：

| Propagation setting | Description                                                  |
| :------------------ | :----------------------------------------------------------- |
| `shared`            | Sub-mounts of the original mount are exposed to replica mounts, and sub-mounts of replica mounts are also propagated to the original mount. |
| `slave`             | similar to a shared mount, but only in one direction. If the original mount exposes a sub-mount, the replica mount can see it. However, if the replica mount exposes a sub-mount, the original mount cannot see it. |
| `private`           | The mount is private. Sub-mounts within it are not exposed to replica mounts, and sub-mounts of replica mounts are not exposed to the original mount. |
| `rshared`           | The same as shared, but the propagation also extends to and from mount points nested within any of the original or replica mount points. |
| `rslave`            | The same as slave, but the propagation also extends to and from mount points nested within any of the original or replica mount points. |
| `rprivate`          | The default. The same as private, meaning that no mount points anywhere within the original or replica mount points propagate in either direction. |

其中`r`为recursive的意思。

## References

[^1]: [Tuning Docker with the newest security enhancements](https://opensource.com/business/15/3/docker-security-tuning)
[^2]: [Docker 容器的 root 安全吗？](https://guide.daocloud.io/dcs/docker-root-9153994.html)
