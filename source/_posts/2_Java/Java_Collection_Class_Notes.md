---
title: Java集合类笔记
date: '2020-11-01 11:36:10'
updated: '2022-03-27 16:58:29'
categories:
  - 2 Java
---
# Java集合类笔记

　　Java的集合主要有Set、List、Queue和Map，这些都是接口，它们各自有自己的实现类。其中Set、List、Queue从Collection继承。

## Map

　　Map有以下实现类：

- HashMap：哈希表实现，线程不安全。
- LinkedHashMap：HashMap的子类，再维护一个双向循环链表保证键的有序。
- TreeMap：红黑树实现。
- ConcurrentHashMap：哈希表实现，线程安全。
- HashTable（不推荐）：较早的Map类，线程安全。

## Set

（喵喵喵）


## List

　　接口List有以下实现类：

- ArrayList：基于数组，线程不安全。
- Vector：基于数组，线程安全。

　　Collections.synchronizedList可以将所有List的子类转为线程安全类。

## Queue

（喵喵喵）

## Stack

```java
private Stack<Integer> stack = new Stack<>();
// Some operations.
stack.push(1);
var size = stack.size();
vat topVar = stack.peek();
topVar = stack.pop();
```
