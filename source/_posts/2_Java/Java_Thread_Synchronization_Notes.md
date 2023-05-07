---
title: Java 线程同步笔记
date: '2022-04-11 11:39:24'
updated: '2023-05-07 20:03:25'
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

## java.util.concurrent.CountDownLatch

　　CountDown 是倒计时的意思，Latch 是门栓的意思，加起来的意思就是一个倒计时的门栓。
　　
　　它其实是作用于线程当中的，它就像一个门栓，一开始是关闭的，所有希望通过该门的线程都需要等待，然后开始倒计时，当倒计时一到，等待的所有线程都可以通过。[^2]
　　
　　 构造方法：
```java
// count 就是需要等待的线程数量
public CountDownLatch(int count)
```

　　重要方法：
```java
// 调用此方法的线程会被阻塞，直到 CountDownLatch 的 count 为 0
public void await() throws InterruptedException 

// 和上面的 await() 作用基本一致，只是可以设置一个最长等待时间
public boolean await(long timeout, TimeUnit unit) throws InterruptedException

// 会将 count 减 1，直至为 0
public void countDown() 
```

## 参考

[^1]: [不可不说的Java“锁”事](https://tech.meituan.com/2018/11/15/java-lock.html)

[^2]: [CountDownLatch 使用详解 - 简书](https://www.jianshu.com/p/962bc7225ce8)

　　
