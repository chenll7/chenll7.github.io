---
title: Docker 笔记
date: '2020-11-01 11:36:12'
updated: '2022-03-27 16:58:30'
categories:
  - 3 Virtualization Tool
---
# Docker 笔记

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

## 安装

### 在线安装

　　在Ubuntu18.04上安装Docker可以参考《[Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)》：

```shell
# 安装必要的一些系统工具
sudo apt update
sudo apt -y install apt-transport-https ca-certificates curl software-properties-common
# 安装GPG证书
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
# 写入软件源信息
sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
# 更新并安装 Docker-CE
sudo apt -y update
sudo apt -y install docker-ce
# 当前用户加入docker组
sudo usermod -a -G docker $USER
```

　　在CentOS上如下所示：

```shell
# step 1: 安装必要的一些系统工具
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# Step 2: 添加软件源信息
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# Step 3: 更新并安装 Docker-CE
sudo yum makecache fast
sudo yum -y install docker-ce
# Step 4: 开启Docker服务
sudo service docker start
```

### 离线安装

　　安装Docker可以参考[Linux 离线安装docker（一键式安装）](https://www.jianshu.com/p/64a470628e49)。
　　
　　Docker安装包下载页在[Index of linux/static/stable/x86_64/](https://download.docker.com/linux/static/stable/x86_64/)。
　　
　　获取Docker镜像可以参考[离线环境获取Docker镜像原创](https://my.oschina.net/u/3446722/blog/988807)

## 命令行

### docker ps

　　`docker ps`只是列出所有正在running的容器，使用`docker ps -a`才能列出所有容器。

### docker stop

　　使用`docker stop <容器名/容器ID>`可以使一个running的容器停止。`docker stop`和`docker-compose down`都是向容器中PID为1的进程发送系统信号SIGTERM，进程收到信号后做一些后续处理操作，然后结束。如果进程不在默认的10秒内结束的话，Docker会发送SIGKILL信号杀掉进程。

### docker kill

　　发送SIGKILL信号杀掉进程。

### docker run

　　如果启动docker容器时使用了`--name`这个参数给容器设置了名字，那么就不能再创建同名容器了。

### docker exec

　　`docker exec -it <容器名/容器ID> <命令> <参数>`和`docker exec -d <容器名/容器ID> <命令> <参数>`可以在容器中执行相关命令，区别是前者分配伪终端在命令行前台执行，后者在后台执行。

　　例如，`docker exec -it <容器名/容器ID> /bin/sh`就可以进入容器。

### docker restart

　　`docker restart <容器名/容器ID>`、`docker stop <容器名/容器ID> & docker start <容器名/容器ID>`或者重启宿主机可以重启容器。

　　值得注意的是，一个容器的文件系统里的内容不会因为容器running和stopped状态的切换而被重置，只要写入了，就是持久的。但是通过`docker exec`在容器内增加的进程在容器重启后不会保留。容器重启后只会保留镜像中指定的进程。因此不能通过`docker exec`在容器内增加进程，现在来看只能用Dockerfile等手段重做镜像。
　　
### docker rm

删除所有容器：`docker rm -f $(docker ps -a -q)`

###  docker rmi

删除所有容器镜像：`docker rmi -f $(docker images -q)`

## 配置

    For using mirror while pulling container images, add the following content to `/etc/docker/daemon.json`:

```json
{
  "registry-mirrors" : [
    "http://docker.mirrors.ustc.edu.cn",
    "http://hub-mirror.c.163.com",
    "http://ovfftd6p.mirror.aliyuncs.com"
  ]
}
```

## References

[^1]: [Tuning Docker with the newest security enhancements](https://opensource.com/business/15/3/docker-security-tuning)
[^2]: [Docker 容器的 root 安全吗？](https://guide.daocloud.io/dcs/docker-root-9153994.html)
