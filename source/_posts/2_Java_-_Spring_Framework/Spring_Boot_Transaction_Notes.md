---
title: Spring Boot 事务笔记
date: '2022-09-10 23:05:20'
updated: '2023-05-07 20:03:26'
categories:
  - 2 Java - Spring Framework
---
# Spring Boot 事务笔记

## Transactional注解

Transactional注解能够启动数据库事务。

一般使用是通过如下代码对方法或接口或类注释：

```java
@Transactional(propagation=Propagation.NOT_SUPPORTED)
```

Propagation支持7种不同的传播机制：

REQUIRED：如果存在一个事务，则支持当前事务。如果没有事务则开启一个新的事务。

SUPPORTS： 如果存在一个事务，支持当前事务。如果没有事务，则非事务的执行。但是对于事务同步的事务管理器，PROPAGATION_SUPPORTS与不使用事务有少许不同。

NOT_SUPPORTED：总是非事务地执行，并挂起任何存在的事务。

REQUIRESNEW：总是开启一个新的事务。如果一个事务已经存在，则将这个存在的事务挂起。

MANDATORY：如果已经存在一个事务，支持当前事务。如果没有一个活动的事务，则抛出异常。

NEVER：总是非事务地执行，如果存在一个活动事务，则抛出异常

NESTED：如果一个活动的事务存在，则运行在一个嵌套的事务中。如果没有活动事务，则按REQUIRED属性执行。

使用注意要点：

1. Transactional 注解的方法需要是 public。
2. Transactional 所注解的方法所在的类需要已经使用了注解 Service 或 Component 等。
3. Transactional 的事务开启 ，或者是基于接口的，或者是基于类的代理被创建。所以在同一个类中一个方法调用另一个方法有事务的方法，事务是不会起作用的。这时候可以在SpringBoot上启动类上添加`@EnableAspectJAutoProxy(exposeProxy = true)`注解，然后通过`(CurrentService) AopContext.currentProxy()`获取当前类对象的代理类对象，然后再调用有事务的方法。
