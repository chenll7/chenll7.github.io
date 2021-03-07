---
title: Java Lambda表达式笔记
date: '2021-02-03 10:02:00'
updated: '2021-02-03 14:34:28'
categories:
  - 2 Java
---
# Java Lambda表达式笔记

## 函数式接口

　　由于Java是静态强类型语言，不像Javascript中一样函数是一等公民。JDK8的java.util.function包提供了很多函数式接口来支持Java的函数式编程，详见[链接](https://www.runoob.com/java/java8-functional-interfaces.html)：

- `Supplier<T>`：无参数，返回一个结果。
- `Consumer<T>`：代表了接受一个输入参数并且无返回的操作。

自定义函数式接口

```java
class Miaomiao{
    @FunctionalInterface
    interface Action{
        int invoke(int i);
    }
    
    public static void main(String[] args) {
        Action action = i -> i;
        System.out.println(action.invoke(1));
    }
}
```

