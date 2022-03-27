---
title: Topological Sorting Basics
date: '2020-11-01 11:36:10'
updated: '2022-03-27 16:53:14'
categories:
  - 1 Algorithm
---
# Topological Sorting Basics

## 描述

<https://songlee24.github.io/2015/05/07/topological-sorting/>

　　有向无环图（Directed Acyclic Graph，DAG）的所有节点的线性序列。若存在一条从A到B的路径，那么在序列中A出现在B的前面。

## 生成算法

　　维护一个队列q存放入度为0的节点，维护一个数组记录每个节点的入度。

1. 将节点集合中入度为0的节点放到队列中。
   
2. 队列弹出一个节点进入拓扑序列，剩余节点中和这个节点有关的节点的入度减1。
   
3. 剩余节点中入度为0的节点入队q。
   
4. 直到队列弹不出节点。

　 时间复杂度是O(节点数+边数)？
