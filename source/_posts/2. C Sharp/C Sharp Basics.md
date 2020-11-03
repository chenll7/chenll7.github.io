---
title: C#学习笔记
date: '2020-11-01 11:36:10'
updated: '2020-11-01 21:28:44'
categories:
  - 2. C Sharp
---
# C#学习笔记

## 常见术语

- 程序集：一般指的就是一个项目。一个解决方案下可以有多个项目，一个项目对应生成一个dll或者exe。

## 配置持久化

　　使用System.Configuration命名空间下的ConfigurationManager类，使用前需要添加System.Configuration引用。如何使用见[例子](https://docs.microsoft.com/en-us/dotnet/api/system.configuration.configurationmanager.appsettings?view=netframework-4.8)。

## 面向对象编程

　　类的默认访问标识符有以下几种：

- public
- internal（默认）：只限于本程序集内访问。
- protected
- private

　　类成员的访问标识符有以下几种：
- private（默认）： 只限于本类成员访问。子类、实例都不能访问。 
- protected：只限于本类成员和子类成员访问。
- internal：只限于本程序集内访问。 
- protected internal：只限于本程序集或子类访问。
- public：不受任何限制。 

## 传递值类型参数和传递引用类型参数

　　默认情况下：

　　对于C#中的值类型（基元类型int，float等或结构体struct等隐式派生自System.ValueType的类型），参数传递过程是拷贝值为形参再被函数使用，即“按值传递”（Call By Value）。

　　对于C#中的引用类型（class、interface、delegate、dynamic、object、string关键字定义的类型），C#的参数传递其实与Python、Java、Js的“按共享传递”（Call By Sharing）的参数传递方法一样，即传递的是对象的地址的值，与C++中传递指针概念类似。
　　
　　如果函数定义和函数调用中参数添加`ref`关键字的话，就和C++中的“按引用传递”（Call By Reference）一样了。

## 本地函数

参考：[本地函数（C# 编程指南）](https://docs.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/local-functions)

　　本地函数是一种嵌套在另一成员中的类型的私有方法，是C#7.0的新特性，需要.Net Framework4.6版本及以上。 仅能从其包含成员中调用它们。 可以在以下位置中声明和调用本地函数：

- 方法（尤其是迭代器方法和异步方法）

- 构造函数

- 属性访问器

- 事件访问器

- 匿名方法

- Lambda 表达式

- 终结器

- 其他本地函数

　　本地函数像Lambda函数一样缩写为以下的形式：

```C#
public static int LocalFunctionFactorial(int n)
{
    return nthFactorial(n);

    int nthFactorial(int number) => (number < 2) ? 
        1 : number * nthFactorial(number - 1);
}
```

