---
title: Java集合框架笔记
date: '2020-11-01 11:36:10'
updated: '2023-05-07 20:03:24'
categories:
  - 2 Java
---
# Java集合框架笔记

　　Java的集合类型主要有 Set 、 List 、 Queue 和 Map ，这些都是接口，它们各自有自己的实现类。其中 Set 、 List 、 Queue 从 Collection 继承。

## List

　　List 有以下实现：

- ArrayList（非线程安全）：基于数组。相较于 LinkedList ，适合大量查询数据的场景。
- LinkedList（非线程安全）：基于链表。相较于 ArrayList ，适合大量增删数据的场景。
- Vector（线程安全）：基于数组。
- CopyOnWriteArrayList（线程安全）：基于数组。相较于 Vector ，读操作不加锁，性能更优。

　　使用 Collections.synchronizedList 可以将所有 List 转为线程安全的类型。可以这么使用：

```java
List<String> miaomiao = Collections.synchronizedList(new ArrayList<String>());
```

这种方式，使用时性能较 Vector 低一些。

## Set

（待补充）

## Map

　　Map 有以下实现：

- HashMap（非线程安全）：基于哈希表。
- LinkedHashMap（非线程安全）：HashMap的子类，再维护一个双向循环链表保证键的有序。
- TreeMap（非线程安全）：基于红黑树。
- ConcurrentHashMap（线程安全）：基于哈希表。
- HashTable（不推荐，线程安全）：较早的Map实现。

## Queue

（待补充）

## Stack

　　以下是使用的例子：

```java
private Stack<Integer> stack = new Stack<>();
// Some operations.
stack.push(1);
var size = stack.size();
vat topVar = stack.peek();
topVar = stack.pop();
```

## 为什么有的集合实现是非线程安全

　　以 ArrayList 为例， 它内部维护了一个数组 arr ，其定义一个变量 n 用以表式这个数组的大小，那么向这个 ArrayList 中存储数据的过程并不是**原子**的，能够分解为这么几步：

1. 读取数组的长度 n 。
2. 向这个数组中储入元素 arr[n] = a 。
3. 将 n + 1 。
4. 保存 n 。

　　多线程场景下，为了保证这个操作不被线程调度打断，所以需要给 ArrayList 的写操作加锁。
