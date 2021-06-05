---
title: Javascript原型和原型链笔记
date: '2020-11-01 11:36:10'
updated: '2022-01-25 11:19:58'
categories:
  - 2 Frontend
---
# Javascript原型和原型链笔记

## new、`prototype`、`__proto__`、原型与原型链

　　Javascript创建一个类的方法（ES5及之前）：

```javascript
function Foo(name) {
    this.name = name
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!')
}
```

　　Javascript将类实例化的方法：

```javascript
const student = new Student('foo')
```

　　这个`new`关键字作用下返回了一个实例，当中涉及到Javascript中的“原型”这个概念。



![](Javascript_Prototype_and_Prototype_Chain_Notes/a.webp)[^2]

　　js的对象分为普通对象和函数对象。

　　凡是通过**new Function()**创建的对象都是函数对象，其他的都是普通对象。

**定律**：每个对象都有`__proto__`属性（隐式原型）。

　　访问一个对象的属性时，如果在这个对象找不到，会到`__proro__`指向的对象中找，如果跟找不到，会沿着`__proto__`依次向上查找，例如：
```javascript
const foo = {}
foo.__proto__.attr = "attr"
console.log(foo.attr) // 打印出“attr”
```

**定律**：只有函数对象才有`prototype`属性（显式原型），它初始是个空对象。
　　
　　显式原型的作用是用来实现基于原型的继承与属性的共享。
　　
　　`__proto__`指向“ the value of its constructor’s "prototype" ”。 

## 参考
[^1]: <https://www.jianshu.com/p/dee9f8b14771>
[^2]: [轻松理解JS 原型原型链](https://juejin.cn/post/6844903989088092174)

