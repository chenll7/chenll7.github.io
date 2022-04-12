---
title: Java 线程同步笔记
date: '2022-04-11 11:39:24'
updated: '2022-04-12 23:47:03'
categories:
  - 2 Java
---
# Java 线程同步笔记

　　线程同步一般用锁，Java 自带的锁机制就有 synchronized 和 java.util.concurrent.locks 包下的 ReentrantLock ，前者是语法层面的，后者是 API 层面的。

## synchronized 关键字

　　synchronized 关键字能够实现一个锁机制，是可重入锁、独享锁、悲观锁、非公平锁。JDK6 为 synchronized 关键字加了很多特性，这些特性需要在启动前配置在JVM的参数中。

## java.util.concurrent.locks.ReentrantLock

　　ReentrantLock 是可重入锁、独享锁、悲观锁。ReentrantLock 比 synchronized 关键字增加了一些高级功能：等待可中断、指定为公平锁、锁绑定多个条件。
　　
## java.util.concurrent.locks.ReentrantReadWriteLock

　　ReentrantReadWriteLock 是可重入锁、写独享锁、悲观锁。

## java.util.concurrent.Semaphore

　　Semaphore 实现信号量机制。能用来做流量控制，允许某个资源最多能有几个线程访问。

## java.util.concurrent.atomic.AtomicInteger

　　AtomicInteger 实现了一个乐观锁。利用 CAS（Compare-and-Swap，比较并替换），能够保证一个整型数同时只有一个线程在写入。

## 参考

[^1]: [不可不说的Java“锁”事](https://tech.meituan.com/2018/11/15/java-lock.html)

　　
