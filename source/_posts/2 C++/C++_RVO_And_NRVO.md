---
title: C++_RVO_And_NRVO
date: '2020-11-01 11:36:11'
updated: '2020-11-07 10:37:05'
categories:
  - 2 C++
---
# 简介

参考：<https://blog.csdn.net/yao_zou/article/details/50759301>

　　RVO（Return Value Optimization）和NRVO（Named Return Value Optimization）是C++在处理 函数返回值类型对象时常用的优化技术。可以优化掉返回值对象，避免无用的拷贝构造函数的调用。

　　gcc中有一个-fno-elide-constructors的命令，可以去掉这个优化。

　　目前的常用c++编译器都支持NRVO，C++11也已经把“允许编译器进行NRVO”写入了标准。

　　对于如下的工厂方法：

```cpp
class miaomiao {
};
miaomiao factory()
{
    miaomiao tmp;
    //其他操作
    return tmp;
}
int main(int argc, char const* argv[])
{
    miaomiao m(factory());
    return 0;
}
```

　　没有做任何优化时会，会调用两次拷贝构造函数，分别是**构造返回值临时对象时**和**给主函数里m赋值时**。

# RVO

　　RVO的原理是：将“返回一个值类型对象的函数”的返回值当做该函数的参数处理。上述代码后半部分变成：

```cpp
void factory(miaomiao &m)
{
    miaomiao tmp;
    //一些初始化操作
    //使用m的拷贝构造函数将tmp内容复制给m
}
int main(int argc, char const* argv[])
{
    miaomiao m;//不进行初始化
    factory(m);//在工厂函数内部进行初始化
    return 0;
}
```

这样就只剩下调用一次拷贝构造函数，即**给主函数里m赋值时**。

# RVO+NRVO

　　如果原始工厂方法改写为：

```cpp
miaomiao factory()
{
	return miaomiao();
}
```

　　那么不会调用拷贝构造函数。因为经过RVO优化后：

```cpp
void factory(miaomiao &m)
{
    //构造m
    return;
}
```

　　NRVO可以在原始工厂函数不这样写的时候也可以让局部对象优化掉。
