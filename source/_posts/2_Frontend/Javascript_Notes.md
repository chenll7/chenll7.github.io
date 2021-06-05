---
title: Javascript笔记
date: '2020-11-01 11:36:10'
updated: '2021-05-28 16:59:14'
categories:
  - 2 Frontend
---
# Javascript笔记

## 参数传递

准确的说，JS中的基本类型按值传递，对象类型按共享传递。所谓共享传递：

```
'use strict'
let v1={a:'Old value'};
let v1a=v1.a;
let v2=v1;
v1a='New value';
console.log(v1);
v2.a='New value';
console.log(v1);
```

输出为：

```
{ a: 'Old value' }
{ a: 'New value' }
```

v1a没能改变v1.a的值，v2.a成功改变v1.a的值。

　　利用共享传递的机制应该能避免了传值还是传引用的问题。

## 字符串

### 引号（'）

　　单引号包裹的字符串里会转义所有转义字符，但是双引号可以不用转义。

　　单引号包裹的字符串是单行字符串。

### 双引号（"）

　　双引号包裹的字符串里会转义所有转义字符，但是单引号可以不用转义。

　　双引号包裹的字符串是单行字符串。

### 嵌入html时

　　`<a onclick="alert(\"可爱的小熊\");">`是不可以的，要用`<a onclick="alert('可爱的小熊');">`。

## 会转为false的值

除了以下六种值会转为false，其他都转为true。

- undefined
- null
- false
- 0
- NaN
- （空字符串）

## 判断数据类型的方法[^3]

### typeof

会返回以下几种值之一：number、boolean、symbol、string、object、undefined、function。

```js
typeof null;// "object"
typeof Symbol();// "symbol"
typeof [];// "object"
```

### instanceof

```js
[] instanceof Array; // true
{} instanceof Object;// true
newDate() instanceof Date;// true
 
function Person(){};
newPerson() instanceof Person;
 
[] instanceof Object; // true
newDate() instanceof Object;// true
newPerson instanceof Object;// true
```

判断数组可以使用`Array.isArray()`：

```js
if(Array.isArray(value)){
   // 对数组执行某些操作
}
```

## ES6特性之export

示例如下[^1]：

```javascript
// path.js
export default { a:1 };
export let b = 2;
export let c =3;

// app.js
import somethingdefault from './path'; // somethingdefault就是{a:1}
import { b, c } from './path'; // b就是2, c就是3
import something, { b, c } from './path';
```

## 错误处理

### Error

　　js的错误类Error有以下几个值得关注的属性：

- Error.prototype.message

- Error.prototype.name

- Error.prototype.stack

　　`Error.prototype.toString`函数返回`${error.name}: ${error.message}`。`Error.prototype.stack`的值为`${error.toString()}\n${Error Stack}`。

## 参考

[^1]:[如何用 es6 的 export 语法导出多少个类？](https://segmentfault.com/q/1010000008760434)
[^3]: [判断JS数据类型的四种方法](https://www.cnblogs.com/onepixel/p/5126046.html)
