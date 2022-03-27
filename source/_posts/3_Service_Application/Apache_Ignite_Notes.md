---
title: Apache Ignite 笔记
date: '2022-03-27 17:16:05'
updated: '2022-03-27 18:00:43'
categories:
  - 3 Service Application
---

# Apache Ignite 笔记

　　Ignite是 一个以内存为中心的分布式数据库、缓存和处理平台，可以在PB级数据中，以内存级的速度进行事务性、分析性以及流式负载的处理。

## 与Apache Spark相比

　　主要区别是Ignite是一个in-memory内存计算系统，是将内存RAM作为首要存储，而Spark只是使用RAM内存处理，只是将内存作为memory-first目标，其之所以快速是因为系统进行了更好的索引，降低了抓取获得时间，避免了序列化。
