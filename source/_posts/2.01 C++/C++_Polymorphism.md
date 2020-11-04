---
title: C++_Polymorphism
date: '2020-11-01 11:36:11'
updated: '2020-11-04 22:14:24'
categories:
  - 2.01 C++
---
# 虚析构函数

　　如果一个类要作为基类，那么它的析构函数要声明为虚函数。

```cpp
Base *b=new Derived();
delete b;
```

　　如果派生类中申请了资源，这样析构会造成内存泄漏，因为只会调用基类的析构函数。

# 重载（Overload）重定义、重写（Override）

<https://www.cnblogs.com/tanky_woo/archive/2012/02/08/2343203.html>

共同点：函数名相同

一、发生在同个类中：重载

1、重载

（1）参数列表不同（对于同个位置的参数来说，const的值类型和非const值类型视为相同，const的指针类型和非const指针类型视为不相同，const的引用类型和非const引用类型视为不相同），返回值可以不同，virtual关键字可以不同。

（2）参数列表相同，常函数（const）和非常函数。

注意：常对象只能调用常函数，常函数只能调用常函数；非常对象调用时，非常函数会覆盖常函数。

注意：所谓常对象指的是常局部变量、指向常量的指针所指向的对象，指向常量的指针所指向的对象。

注意：常对象只能成为const类型参数的实参，非常对象优先选择成为非const类型参数的实参。

二、发生在继承中：重写、重定义

1、重定义

　　和父类函数参数列表不同时，父类函数将被隐藏。

　　和父类函数参数列表不同时，且父类函数不是虚函数时，父类函数将被隐藏。

2、重写

　　父类函数必须是虚函数，并且没有static关键字。

　　和父类函数返回值相同（或是协变）。访问修饰符可以不同（private、protected、public）。

　　返回类型协变：父类函数返回类型是指向基类A的指针或引用，子类函数返回类型是指向基类A的子类的指针或引用。

# 运行期多态（虚函数）和编译期多态（模板）

<https://www.cnblogs.com/QG-whz/p/5132745.html>

## 虚函数

　　虚函数表。

## 模板

```cpp
class Dog
{
public:
     void shout(){ cout << "汪汪！"<<endl; }
};
class Cat
{
public:
     void shout(){ cout << "喵喵~"<<endl; }
};

template <typename T>
void  animalShout(T & t)
{
    t.shout();
}

int main()
{
    Dog dog;
    Cat cat;

    animalShout(cat);
    animalShout(bird);
 
    getchar();
}
```

### 模板特化

<https://blog.csdn.net/gatieme/article/details/50953564>

# 虚拟继承

　　解决“菱形继承”，使得最下面的子类对象内只有一个基类副本。

D类对象的内存分布：

vbptr：继承自父类B中的指针
int dataB：继承自父类B的成员变量
vbptr：继承自父类C的指针
int dataC：继承自父类C的成员变量
int dataD：D自己的成员变量
int A：继承自父类A的成员变量

详情见：<https://blog.csdn.net/xiejingfa/article/details/48028491>
