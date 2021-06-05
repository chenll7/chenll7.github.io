---
title: Spring Cloud 笔记
date: '2021-09-27 16:54:09'
updated: '2021-10-16 19:57:08'
categories:
  - 2 Java - Spring Framework
---
# Spring Cloud 笔记

## 常用组件

### 监控、应用性能管理（Application Performance Management, APM）

#### SkyWalking
　　每个微服务嵌入 Skywalking Agent。Skywalking Agent 采集tracing（调用链数据）和metric（指标）信息并上报，上报通过HTTP或者gRPC方式发送数据到Skywalking Collector。Skywalking Collector 对 Skywalking Agent 传过来的tracing和metric数据进行整合分析通过Analysis Core模块处理并落入相关的数据存储中，同时会通过Query Core模块进行二次统计和监控告警。用户可以通过 SkyWalking UI 这个Web可视化平台，用来展示落地的数据，目前官方采纳了 RocketBot 作为 SkyWalking 的主UI。
