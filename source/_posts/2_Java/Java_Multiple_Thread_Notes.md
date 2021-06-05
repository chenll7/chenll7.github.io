---
title: Java多线程笔记
date: '2021-09-22 10:45:23'
updated: '2021-10-16 19:57:08'
categories:
  - 2 Java
---
# Java多线程笔记

## 线程安全地插入ArrayList

　　ArrayList内部维护了一个数组Arr，其定义一个变量`n`用以表式这个数组的大小，那么向这个ArrayList中存储数据的过程能够分解为这么几步：

1. 读取数组的长度存入n
2. 向这个数组中储入元素arr[n]=a
3. 将n+1
4. 保存n

　　所以需要给ArrayList的操作加锁：

```java
List<String> miaomiao = Collections.synchronizedList(new ArrayList<String>());
```

　　**当然，需要线程安全的List的话，也可以使用Vector，速度也快点。**

