---
title: Tree Basics  (Part 4) Heap
date: '2020-11-01 11:36:10'
updated: '2020-11-01 12:24:47'
categories:
  - 1.1 Data Structure And Algorithm
---
# Tree Basics (Part 4): Heap

## Basics

　　时间复杂度为O(logN)。

## Corresponding Libraries

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

