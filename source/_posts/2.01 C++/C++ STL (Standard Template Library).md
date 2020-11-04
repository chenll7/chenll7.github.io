---
title: C++ STL (Standard Template Library)
date: '2020-11-01 11:36:10'
updated: '2020-11-04 22:14:24'
categories:
  - 2.01 C++
---
# C++标准模板库

## 基本介绍

　　标准模板库（STL）是标准库的一部分。

　　STL是由六大组件组成的：容器（Container）、空间分配器（Allocator）、适配器（Adapter）、迭代器（Iterator）、仿函数（Functor）/函数对象（Function Object）和算法（Algotithm）。

## 容器（Container）

- array（C++11）：
- vector：单向开口插入的容器。
- deque：双向开口插入删除的容器。它是动态地以分段连续空间组合而成。
- stack：默认基于deque的栈。
- queue：默认基于deque的队列。
- forward_list：单向链表。
- list：双向链表。
- map：有序的键值对集合。基于红黑树。查询、插入、删除都是O(logN)（最坏和平均都是）。
- unordered_map（C++11）：无序的键值对集合。基于哈希表。查询平均时间是O(1)。
- set：有序的集合。基于红黑树。
- unordered_set（C++11）：无序的键值对集合。基于哈希表。
- bitset：位数组，编译期间固定大小

### array（C++11）

参考：<http://blog.csdn.net/qq844352155/article/details/38943777>

　　可以替代原生数组。array定义的时候必须定义数组的元素个数。比原生数组的优势是提供size函数。

```cpp
std::array<int,6> a;
a.fill(5);
std::cout << "My array contains:";
for ( int& value : a) std::cout << value << std::endl;
```

### vector

构造函数：

```cpp
//构造时定义大小和填充值
explicit vector (size_type n);
         vector (size_type n, const value_type& val,
                 const allocator_type& alloc = allocator_type());
//从数组构造
template <class InputIterator>
  vector (InputIterator first, InputIterator last,
          const allocator_type& alloc = allocator_type());
```
　　g++编译下，at函数会对下标进行检查，[]不会对下标进行检查。

### map

　　有序的键值对集合。基于红黑树。查询、插入、删除都是O(logN)，最坏和平均都是。

#### 插入移除

　　[],erase。

#### 遍历

```cpp
for(auto it = m.begin(); it != m.end(); ++it)
    cout<<"Key: "<<it->first <<" Value: "<<it->second<<endl;
```

### set

　　有序的集合。基于红黑树。

#### 插入移除

　　insert,erase。

### unordered_set

如何使用自定义类型：<https://blog.csdn.net/cabgeinmars/article/details/51726540>

### bitset

参考：<http://happyboy200032.blog.163.com/blog/static/46903113201291252033712/>

bitset的长度只能是常量。

- test(pos)：判断pos位置的bit是否为true
- set(pos,boolToBeSet)：设置pos位置的bit为boolToBeSet

```cpp
std::bitset<8> bs;//bs可以装入8个位

bs[0]=1;//把第0位设置为1
bs[3]=true;//把第3位设置为1,因为true可以转换为1
bs[7]=0;//这个大家都明白了

unsigned long value=bs.to_ulong();
std::bitset<32> bs32(value);
bs32[15]=1;
value=bs32.to_ulong();

std::bitset<32> bs("011010101001");
std::string str=bs.to_string();
```
### initializer_list

　　（待补充）

## 适配器（Adapter）

### priority_queue

　　默认使用vector，内部使用堆来实现。

## 迭代器（Iterator）

### const_iterator和const iterator

　　`const_iterator`是指向常量的迭代器，它的值可以改变，但是指向的对象的值不能改变。
　　`const iterator`是常量迭代器。它的值不可以改变，但是指向的对象的值可以改变。

## 算法（Algotithm）

### max_element(begin,last)

　　返回数组里最大的元素的迭代器，如果范围为空，返回last；如果有多个最大元素，返回第一个。

```cpp
int *p = max_element( a, a+len );
cout << p-a << endl;//返回最大元素下标
```

### <random>

参考：<https://www.jianshu.com/p/05863a00af8d>

例子：<https://github.com/furrybear/templates/blob/master/C%2B%2B/usages/generate_random_number.cpp>

　　random库的功能极其丰富，它能进行泊松分布、正态分布、抽样分等高级的随机数功能。

## 仿函数（Functor）/函数对象（Function Object）

<https://blog.csdn.net/wangshubo1989/article/details/49134235>

<https://blog.csdn.net/BonChoix/article/details/8050627>

　　通过`std::function`对C++中各种可调用实体（普通函数、Lambda表达式、函数指针、以及其它函数对象等）的封装，形成一个新的可调用的std::function对象；让我们不再纠结那么多的可调用实体。

## 空间分配器（Allocator）

<https://www.cnblogs.com/zhuwbox/p/3699977.html>

　　new一个对象的时候两个动作是：先调用::operator new分配一个对象大小的内存，然后在这个内存上调用FOO::FOO()构造对象。

　　delete一个对象的时候两个动作是：先调用FOO::~FOO()析构掉对象，再调用::operator delete将对象所处的内存释放。

　　为了精密分工，STL的allocator决定将这两个阶段分开。分别用 4 个函数来实现：

1.内存的配置：alloc::allocate();

2.对象的构造：::construct();

3.对象的析构：::destroy();

4.内存的释放：alloc::deallocate();


