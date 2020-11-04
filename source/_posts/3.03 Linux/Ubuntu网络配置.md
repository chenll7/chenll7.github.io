---
title: Ubuntu网络配置
date: '2020-11-01 11:36:12'
updated: '2020-11-04 22:14:24'
categories:
  - 3.03 Linux
---
# 参考

- [Ubuntu14.04+KVM配置虚拟机桥接（bridge）](https://blog.csdn.net/FIELDOFFIER/article/details/48497833)

# 查看内核路由表

```sh
# 内核 IP 路由表
route -n
```

会打印出如下表格：

```
内核 IP 路由表
目标            网关            子网掩码        标志  跃点   引用  使用 接口
0.0.0.0         192.168.1.253   0.0.0.0         UG    0      0        0 br0
169.254.0.0     0.0.0.0         255.255.0.0     U     1000   0        0 br0
192.168.1.0     0.0.0.0         255.255.255.0   U     0      0        0 br0
192.168.122.0   0.0.0.0         255.255.255.0   U     0      0        0 virbr0
```

# 显示网卡“设备未托管”解决办法

```sh
sudo touch /etc/NetworkManager/conf.d/10-globally-managed-devices.conf
```

# 为KVM配置网桥

　　为了充分利用服务器资源，避免各个用户互相污染全局环境，所以需要用KVM虚拟机给小白用户们隔离环境。在这之前需要对宿主机的网络进行配置，使得KVM虚拟机们能够通外网。

![](https://img-blog.csdn.net/20150916170617267)

　　这张图有助于理解Linux下的虚拟网桥是什么，但是还是不大清晰。我目前的理解是，新建的虚拟网桥br0是以物理网卡eno1为基础的。而宿主机以br0作为网络出口的，宿主机有自己的网络配置。其他虚拟机也可以连接到br0，虚拟机也有自己的网络配置。宿主机和虚拟机在配置网桥后都在原来宿主机所在的局域网内。

　　接下来讲做法，我的环境是在Ubuntu 16.04，物理网卡是eno1，创建的网卡是br0：

　　首先创建一个网桥（brctl命令需要`apt-get install bridge-utils`）：

```sh
brctl addbr br0
```

```sh
# 查看网卡名
ls /proc/sys/net/ipv4/conf
```


　　然后，修改网络配置文件/etc/network/interfaces为：

```
auto lo
iface lo inet loopback

auto eno1
iface eno1 inet manual
iface eno1 inet6 manual

auto br0
iface br0 inet static
address 10.21.4.41
network 10.21.0.0
netmask 255.255.0.0
gateway 10.21.0.254
broadcast 10.21.255.255
dns-nameserver 159.226.8.6
bridge_ports eno1
bridge_stp off
bridge_fd 0
bridge_maxwait 0
iface br0 inet6 auto
```

　　然后，重启网络：

```sh
/etc/init.d/networking restart
```

　　我这里遇到一个问题：重启失败。查找资料后，用以下命令后就能重启成功了：

```sh
ip addr flush dev br0
```
