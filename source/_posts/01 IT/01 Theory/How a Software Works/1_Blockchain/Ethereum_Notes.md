---
categories:
- 01 IT
- 01 Theory
- How a Software Works
- 1_Blockchain
date: '2020-11-01T11:36:09'
excerpt: ''
publish: true
tags: null
title: 以太坊笔记
updated: '2023-05-07T20:03:05'
---

# 以太坊笔记

## 相关链接

- [JerryMissTom/go-ethereum: Ethereum Frontier Guide中文版](https://github.com/JerryMissTom/go-ethereum)

- [ZtesoftCS/go-ethereum-code-analysis](https://github.com/ZtesoftCS/go-ethereum-code-analysis)

- [xianfeng92/Love-Ethereum: 区块链学习](https://github.com/xianfeng92/Love-Ethereum)

- [以太坊Swarm是什么](https://ethereum.stackexchange.com/questions/375/what-is-swarm-and-what-is-it-used-for)

- [以太坊世界状态解释](https://ethfans.org/posts/diving-into-ethereums-world-state-part-1)

- [以太坊本土分布式内容存储-在以太坊测试网络试运行Swarm](https://ethfans.org/posts/getting-started-with-ethereum-s-swarm-on-the-testnet)

## 概念解释

- 地址：与比特币相同，以太坊使用Secp256k1椭圆曲线得到私钥、公钥。

- 区块链状态：区块链是一个基于交易的状态机。以太坊区块头中只保存交易树、状态树和收据树的根节点哈希值。

- 收据（Receipt）：交易被执行后的区块链状态。包含存储交易执行后状态的字典树、总Gas使用量、Logs、基于Logs中信息的布隆过滤器。

- Swarm：基于以太坊的存储服务。

![](Ethereum_Notes/20190302100828.png)

## 无状态客户端（Stateless Client）

参考：

- [Data from the Ethereum stateless prototype](https://medium.com/@akhounov/data-from-the-ethereum-stateless-prototype-8c69479c8abc)

　　无状态客户端的主要思路是在节点接收到区块并对区块内的交易执行时不必访问整个区块链状态。矿工会在区块内附加额外的数据结构，这个数据结构提供能够满足交易执行的部分全状态，同时也提供默克尔证明。