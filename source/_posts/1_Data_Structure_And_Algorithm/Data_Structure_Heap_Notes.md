---
title: 数据结构堆笔记
date: '2020-11-01 11:36:10'
updated: '2023-05-07 20:03:10'
categories:
  - 1 Data Structure And Algorithm
---
# 数据结构堆笔记

## 基础

　　堆是完全二叉树，所以可以用数组储存。

　　最大堆任意节点的值大于左右孩子的值。最小堆类似。

　　堆只能进行两种操作：1. 插入节点。2. 删除头节点。

　　堆的插入操作：新的节点放到堆尾，经过log<sub>2</sub>n以内次操作到达应处于的位置。

　　堆的删除头节点操作：把堆尾元素放到空缺的堆首，经过log<sub>2</sub>n以内次操作完成调整。

　　堆的创建操作（方法一）：一个个插入，单个插入操作时间复杂度为O(logn)，所以总体时间复杂度为O(nlogn)。

　　堆的创建操作（方法二）：先形成完全二叉树，然后进行调整。调整的方法为从最后一个**非叶子节点**开始检查左后孩子。时间复杂度为O(n)。

## 各编程语言中相关常用库的使用

### Java

```java
// Minimum heap.
Queue<Integer> minHeap = new PriorityQueue<>();
// Maximum heap.
Queue<Integer> maxHeap = new PriorityQueue<>((o1, o2) -> o2 - o1);
// Some operations.
maxHeap.add(132423);
var size = maxHeap.size();
var maxVar = maxHeap.peek();
maxVar = maxHeap.remove();
```

