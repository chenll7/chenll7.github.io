---
title: C++_Object_Oriented_Programming
date: '2020-11-01 11:36:11'
updated: '2023-05-07 20:03:19'
categories:
  - 2 C++
---
# 默认生成的成员函数

　　对于C++的的类，如果用户没有写，会自动生成这些成员函数。

```C++
class A {};
//其实等价于：
class A {
public:
    //默认构造函数（Default Constructor）
    A();
    //析构函数（Destructor）
    ~A();
    //拷贝构造函数（Copy Constructor）
    A(const A& other);
    //拷贝赋值函数（Copy Assignment）
    A& operator=(const A& other);
};
```

　　没有任何构造函数时会生成默认构造函数，一旦用户写了任何构造函数，默认构造函数不会生成。

# 构造函数和赋值函数

## 构造函数

- 构造函数可以重载。
- 构造函数可以声明为私有。

特殊的构造函数有以下几种：

```cpp
class A {
public:
    //默认构造函数（Default Constructor）
    A();
    //参数为常引用的拷贝构造函数（Copy Constructor）
    A(const A& other);
    //参数为非常引用的拷贝构造函数（Copy Constructor）
    A(A& other);
    //移动构造函数（Move Constructor）
    A(A&& other);
};
```

**拷贝构造函数**被调用的情形（被赋值对象不存在）：

- 一个对象以值传递的方式传入函数体
- 一个对象以值传递的方式从函数返回
- 一个对象需要通过另一个对象进行初始化

```C++
A a;
A b(a);
A b=a;
```

禁用**拷贝构造函数**和**拷贝赋值函数**只需将它们声明为私有，并且不需要实现。

## 赋值函数（还未深入研究）

　　总是调用等号左侧的对象的赋值函数。

```cpp
class A {
public:
    //拷贝赋值函数（Copy Assignment）
    A& operator=(const A& other) { return *this; }
    //拷贝赋值函数（Copy Assignment）
    A& operator=(A& other) { return *this; }
    //拷贝赋值函数（Copy Assignment）
    A& operator=(A&& other) { return *this; }
    //...
};
```

**拷贝赋值函数**被调用的情形（被赋值对象存在）：

```C++
A a;
A b;
b=a;
```

# 析构函数

- 析构函数不可以重载。
- 析构函数不可以声明为私有。

　　析构函数一般需要是虚函数。为了避免以下情况：

```cpp
Base *p=new Derived();
//如果析构函数不是虚函数，析构时只会调用基类的析构函数，而不会调用派生类的析构函数
delete p;
```

　　从C++11起，析构函数默认有noexcept修饰符，即不抛出任何异常，如果内部抛出异常，则会调用std::termminate。

# 构造函数和析构函数是否可以抛出异常

　　构造函数和析构函数都可以抛出异常。

　　构造函数向外抛出异常视为该对象没有构造成功，所以析构函数不会被调用。因此一种观点认为构造函数内不能申请任何资源，需要再来个普通函数（例如init）来分配资源，这样可能造成：

1. 忘了调用init。
2. init调用两次。

等问题。另一种观点认为构造函数申请资源都应该采取RAII的方式，例如用智能指针对象包裹指针，这样即使构造失败，资源也能正常释放。

　　析构函数最好不要向外抛出异常，即使内部有异常也要内部消化。例如vector\<A\>析构的时候，如果A的析构函数抛出了异常，这时候要处理异常还是继续析构vector？其实C++11起，析构函数自动声明为noexcept，如果析构函数执行时胆敢抛出异常，会自动调用std::terminate。

# friend关键字

　　类内friend函数不属于成员函数。

# 静态成员函数

[](https://github.com/zfengzhen/Blog/blob/master/article/%E3%80%8A%E6%B7%B1%E5%85%A5%E6%8E%A2%E7%B4%A2C%2B%2B%E5%AF%B9%E8%B1%A1%E6%A8%A1%E5%9E%8B%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0.md)

　　不能声明为const、volatile或virtual。

# 聚合类型

<https://blog.csdn.net/wind19/article/details/8210875>

　　聚合类型是一种没有用户定义的构造函数，没有private和protected的非静态数据成员，没有基类，没有虚函数。这样的类可以由封闭的大括号用逗号分隔开初始化列表。

```cpp
struct C
{
  int a;
  double b;
};
struct D
{
  int a; 
  double b;
  C c;
};
C c{ 1, 2 };
D d{ 10, 20, { 1, 2 } };
```

# 常成员函数和常对象

　　C++里常对象只能调用常成员函数，常函数只能调用常成员函数。非常对象优先调用非常成员函数。以下都视为常对象：

```
const Hehe h;
//指向常量的指针
const Hehe *p = &h;
//指向常量的引用
const Hehe &r = h;
```

需要注意的是：指向常量的指针和指向常量的引用可以指向普通的对象，仍然视为常对象；普通指针或者普通引用不能指向常对象，编译报错。

```
Hehe h;
//常量指针，不能改变指向
Hehe *const p = &h;
//引用本来就不能改变指向
```

<https://www.cnblogs.com/lihuidashen/p/4378884.html>

　　加上mutable修饰符的数据成员,对于任何情况下通过任何手段都可修改,自然此时的常成员函数是可以修改它的。
