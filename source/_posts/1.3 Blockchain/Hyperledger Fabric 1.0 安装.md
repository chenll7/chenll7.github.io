---
title: Hyperledger Fabric 1.0 安装
date: '2020-11-01 11:36:09'
updated: '2020-11-01 12:24:47'
categories:
  - 1.3 Blockchain
---
# Hyperledger Fabric 1.0 安装
* 具体方法查看：http://hyperledger-fabric.readthedocs.io/en/latest/prereqs.html

* 我的安装环境是：Ubuntu 16.04

## 预安装软件注意点
&emsp;&emsp;我在root下创建了hyperledger用户，并将其加入sudo组方便执行root的操作。

```sh
adduser hyperledger
usermod -a -G sudo hyperledger
usermod -a -G adm hyperledger
```
### cUrl

```sh
sudo apt-get install curl
```

### Docker

#### docker

&emsp;&emsp;文档里说要求高于17.03.1-ce的版本,所以写本文时安装了17.06.1-ce版本。docker-ce需要Ubuntu 14.04及以上版本。

&emsp;&emsp;Docker 17.06.1-ce在Ubuntu下安装参考：<https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#install-docker-ce>

```sh
sudo apt-get update
```
```sh
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
```
```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
```sh
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```
```sh
sudo apt-get update
```
```sh
sudo apt-get install docker-ce
```
&emsp;&emsp;为了能在普通用户下而不是root下使用docker，将用户hyperledger加入docker用户组（这里需要重新登陆一下然后生效）：

```sh
sudo usermod -a -G docker hyperledger
```
#### docker-compose
&emsp;&emsp;还需要一个docker-compose，Ubuntu16.04下可以直接这样安装：

```sh
sudo apt-get install docker-compose
```
但是Ubuntu14.04下需要手动下载安装，加了阿里的软件源也不行。
### Node.js运行环境和NPM
&emsp;&emsp;文档里说不支持Node.js的7.x版本，但要求6.9.x版本或者更高。
&emsp;&emsp;我从<https://nodejs.org/en/download/releases/>这里进去找到<https://nodejs.org/download/release/v6.11.2/node-v6.11.2-linux-x64.tar.gz>，因为不是最新版的，所以只让本用户用，因此解压后放到~/.local目录下,改名为node（mv命令）。由于~/.profile会将~/.local/bin放入环境变量PATH中，因此做~/.local/node/bin链接到~/.local/bin：

```sh
mkdir .local
cd ~/.local
wget https://nodejs.org/download/release/v6.11.2/node-v6.11.2-linux-x64.tar.gz
tar -xzf node-v6.11.2-linux-x64.tar.gz
mv node-v6.11.2-linux-x64 node
mkdir bin
ln -s ~/.local/node/bin/node ~/.local/bin/node
ln -s ~/.local/node/bin/npm ~/.local/bin/npm
```
### Go语言
&emsp;&emsp;apt下载来的go语言版本有点低，所以下载平台相关的离线二进制包来用。从<https://studygolang.com/dl>下载<https://storage.googleapis.com/golang/go1.9.1.linux-amd64.tar.gz>解压后放在/usr/local,因为官方默认放在/usr/local,这样不用设置GOPATH环境变量。

```sh
cd /usr/local
sudo wget https://storage.googleapis.com/golang/go1.9.1.linux-amd64.tar.gz
sudo tar -xzf ./go1.9.1.linux-amd64.tar.gz -C /usr/local
```
这样/usr/local下会出现go目录，然后在/etc/profile增加以下语句：

```sh
export PATH=$PATH:/usr/local/go/bin
```
因为是安装在/usr/local/go，所以就不用设置GOROOT环境变量了，否则在/etc/profile增加以下语句：

```sh
export GOROOT=安装目录/go
```
&emsp;&emsp;然后设置本用户的GOPATH：

```sh
export GOPATH=~/go
export PATH=$PATH:${GOPATH//://bin:}/bin
```

## 安装Hyperledger fabric注意点

### fabric二进制文件

&emsp;&emsp;参考<http://hyperledger-fabric.readthedocs.io/en/latest/samples.html#binaries>。
&emsp;&emsp;在家目录下

```sh
cd ~
mkdir fabric
cd ~/fabric
curl -sSL https://goo.gl/Gci9ZX | bash
```
就可以安装好Hyperledger fabric了，~/fabric下出现bin目录，里面是一些配置channel和MSP等的工具。
&emsp;&emsp;然后，要么把bin加入PATH变量或者把bin里的cryptogen、configtxgen、configtxlator、peer做个链接到~/bin。我采用了前面的操作，在~/.profile里加入

```sh
PATH=$PATH:$HOME/fabric/bin
```

### fabric源码和例程

&emsp;&emsp;首先要设置好环境变量GOPATH，然后

```sh
go get github.com/hyperledger/fabric
cd ~/go/src/github.com/hyperledger/fabric
git checkout v1.0.2#切换到需要版本的源码
```
在$GOPATH/src/github.com/hyperledger/fabric下就出现源码了，里面的examples目录就是例程。

## fabric-samples
&emsp;&emsp;下载需要一些时间，这时候把Hyperledger fabric的samples下载过来，放在~/fabric。
新开一个终端，

```sh
cd ~/fabric
git clone https://github.com/hyperledger/fabric-samples.git
```
产生的fabric-samples目录就是了。

### 验证

```sh
cd ~/fabric/fabric-samples/first-network
./byfn.sh -m generate
./byfn.sh -m up
```
看起来运行正常，说明安装成功了。
