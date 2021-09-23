---
title: Spring框架开发实践
date: '2020-12-29 11:20:31'
updated: '2021-09-23 09:09:52'
categories:
  - 2 Java - Spring Framework
---
# Spring框架开发实践

## 常用分层模式

　　一般分为表示层（一般用Controller）、业务层（一般用Service）和持久层（Hibernate、MyBatis、JDBC等），根据依赖倒置原则。表现层持有业务层的引用时要用接口（一般表现为Controller中自动装载Service类型的私有成员），不要持有具体的实现类的引用，业务层对持久层同理。

## 自动装载（AutoWired）

　　自动装载接口类型时，Spring会自动去寻找其实现类，如果有多个实现类会报错。

## 实体类（Entity）

　　常见的VO、BO、PO、DO、DTO都是实体类。各个实体类的作用可以参考[这篇文章](https://zhuanlan.zhihu.com/p/102389552)。参数的和返回的POJO可以加Request、Response前缀，例如“RequestVO”、“ResponseVO”。

<img src="Spring_Framework_Development_Practice/2.png" style="width:100%;"/>

<img src="Spring_Framework_Development_Practice/1.jpg" style="width:100%;"/>

