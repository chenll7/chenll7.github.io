---
title: Docker笔记
date: '2020-11-01 11:36:12'
updated: '2021-07-18 17:03:52'
categories:
  - 3 Docker
---
# Docker笔记

## 安装

### 在线安装

　　在Ubuntu上安装Docker可以参考[Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)。

### 离线安装

　　安装Docker可以参考[Linux 离线安装docker（一键式安装）](https://www.jianshu.com/p/64a470628e49)。
　　
　　Docker安装包下载页在[Index of linux/static/stable/x86_64/](https://download.docker.com/linux/static/stable/x86_64/)。
　　
　　获取Docker镜像可以参考[离线环境获取Docker镜像
原创](https://my.oschina.net/u/3446722/blog/988807)

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

## Configuration

​    For using mirror while pulling container images, add the following content to `/etc/docker/daemon.json`:

```json
{
  "registry-mirrors" : [
    "http://docker.mirrors.ustc.edu.cn",
    "http://hub-mirror.c.163.com",
    "http://ovfftd6p.mirror.aliyuncs.com"
  ]
}
```
