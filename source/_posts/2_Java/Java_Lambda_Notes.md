---
title: Java Lambda 表达式笔记
date: '2021-02-03 10:02:00'
updated: '2022-06-20 08:46:38'
categories:
  - 2 Java
---
# Java Lambda 表达式笔记

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

## Optional

　　使用Optional进行函数式编程可以避免某些情况下使用if表达式对对象是否为null进行判断。
　　
### 使用Optional.ofNullable

　　我们一般用`Optional.ofNullable`来包裹一个可能为null的对象。例如，
　　
```java
final var optionalObj = Optional.ofNullable(obj);
```

　　如果obj为null，则值与`Optional.empty()`相同，即空Optional对象。

### 使用Optional.map和Optional.orElse

```java
final var attr = Optional.ofNullable(obj).map(obj->obj.getAttr()).orElse(defaultValue);
```

　　`Optional.map`返回Optional对象。若为非空Optional对象，返回被Optional包裹的Lambda函数的返回值；若为空Optional对象，返回为空Optional对象。
　　`Optional.orElse`方法：If a value is present, returns the value, otherwise returns other。

### Optional.flatMap

　　`Optional.flatMap`返回Optional对象。`Optional.flatMap`中Lambda函数必须返回Optional对象，会原样作为`Optional.flatMap`的返回值。

## Stream

### 常用方法

#### Stream.reduce

```java
List<User> users = Arrays.asList(new User("John", 30), new User("Julie", 35));
int result = users.stream()
  .reduce(0, (partialAgeResult, user) -> partialAgeResult + user.getAge(), Integer::sum);
assertThat(result).isEqualTo(65);
```

注：该签名的 Stream.reduce 函数的第三个参数用于供编译器判断类型，不生效。ParallelStream.reduce 的相同签名的函数第三个参数用于合并中间结果。

### 和其他数据结构转化

#### Stream\<Double\>转Double[]

```java
Steam<Double> stream = new Stream.of(0.1, 0.2, 0.3);
// 转double[]
Double[] toBoxedDoubleArray = stream.toArray(Double[]::new);
```

#### DoubleStream转double[]

```java
DoubleStream doubleStream = new DoubleStream.of(0.1, 0.2, 0.3);
// 转Double[]
double[] toDoubleArray = doubleStream.toArray();
```

#### DoubleStream转Stream\<Double\>

```java
DoubleStream doubleStream = new DoubleStream.of(0.1, 0.2, 0.3);
// 转Stream<Double>
Stream<Double> toDoubleArray = doubleStream.boxed();
```

### 相关类

#### Spliterator

　　Spliterator是Java 8中加入的一个新接口；这个名字代表“可拆分迭代器”（splitable iterator）。和Iterator一样，Spliterator也用于遍历数据源中的元素，但它是为了并行执行而设计的。Java 8已经为集合框架中包含的所有数据结构提供了一个默认的Spliterator实现。集合实现了Spliterator接口，接口提供了一个spliterator方法。

### 坑

　　`IntStream`、`DoubleStream`、`LongStream`的`collect`函数和`Stream`不一样，必要的时候先执行`boxed`将其转化为`Stream<Integer>`、`Stream<Double>`、`Stream<Long>`。

## ParalleStream

　　ParallelStream 使用 Fork-join-pool 作为并行化的底层框架，其是独立于 ThreadPool 的多线程并行模型。

## Collector

　　Stream的collect方法接受一个Collector对象以收集Stream的元素组成一种容器类型。

　　工具类`Collectors`能够生成日常常用的Collector对象。

　　以下是常用方法[^1]：

### Collectors.toList

```java
public class CollectorsTest {
    public static void toListTest(List<String> list) {
        List<String> ll = list.stream().collect(Collectors.toList());
    }
    public static void main(String[] args) {
        List<String> list = Arrays.asList("123","456","789","1101","212121121","asdaa","3e3e3e","2321eew");
        toListTest(list);
    }
}
```

## 参考

[^1]: [Java基础系列-Collector和Collectors](https://www.cnblogs.com/V1haoge/p/10748925.html)
