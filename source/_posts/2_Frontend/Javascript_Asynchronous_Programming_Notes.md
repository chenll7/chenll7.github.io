---
title: Javascript异步编程笔记
date: '2020-11-01 11:36:10'
updated: '2023-05-07 20:03:22'
categories:
  - 2 Frontend
---

# Javascript异步编程笔记

　　传统的JS是单线程的，所以采用回调函数的方法实现异步编程，避免阻塞。使用回调函数会出现回调函数层层嵌套，即所谓的“回调地狱（Callback Hell）”的情况，所以ES6推出了Promise和async/await的语法来避免这种情况。

## Promise

　　下面是一个例子：

```javascript
var val = 1;

// 我们假设step1, step2, step3都是ajax调用后端或者是
// 在Node.js上查询数据库的异步操作
// 每个步骤都有对应的失败和成功处理回调
// 需求是这样，step1、step2、step3必须按顺序执行
function step1(resolve, reject) {
    console.log('步骤一：执行');
    if (val >= 1) {
        resolve('Hello I am No.1');
    } else if (val === 0) {
        reject(val);
    }
}

function step2(resolve, reject) {
    console.log('步骤二：执行');
    if (val === 1) {
        resolve('Hello I am No.2');
    } else if (val === 0) {
        reject(val);
    }
}

function step3(resolve, reject) {
    console.log('步骤三：执行');
    if (val === 1) {
        resolve('Hello I am No.3');
    } else if (val === 0) {
        reject(val);
    }
}

new Promise(step1).then(function(val){
    console.info(val);
    return new Promise(step2);
}).then(function(val){
    console.info(val);
    return new Promise(step3);
}).then(function(val){
    console.info(val);
    return val;
}).then(function(val){
    console.info(val);
    return val;
});
```

执行之后将会打印

```
步骤一：执行
Hello I am No.1
步骤二：执行
Hello I am No.2
步骤三：执行
Hello I am No.3
Hello I am No.3
```

　　Promise对象有这样的特性，它会执行初始化时用的函数参数（这个函数要有俩参数，分别是resolve和reject）。

　　接下来会执行一系列then函数和catch函数，每个里面会输入一个回调函数（为了方便描述，称为“then的函数”和“catch的函数”）。

　　如果初始化时用的函数里调用resolve,会调用最近的“then的函数”（并传参）；如果这个函数里调用reject，会调用最近的“catch的函数”。注意不可以又调用resolve又调用reject。

　　如果“then的函数”或“catch的函数”返回非Promise对象，这个返回值会作为__紧接着的__下一个“then的函数”或“catch的函数”的参数并执行。

　　如果“then的函数”或“catch的函数”返回新的Promise对象，会根据这个新的初始化函数判断接下来调用下一个“then的函数”还是“catch的函数”，不会再调用__前面的__“then的函数”或“catch的函数”。

　　还这么看，resolve会产生一个新的Promise对象，它的的初始化函数是，下一个“then的函数”，reject同理。

　　因此使用Promise的经典用法有以下两种，以函数为中心：

```javascript
p1().then(p2).then(p3)
  .then(function(data) {
    console.log('data: ' + data);
  })
  .catch(function(error) {
    console.log('error: ' + error);
  });

function p1() {
  return new Promise(function(resolve, reject) {
    console.log('p1 resolved');
    resolve(123);
  });
}
//p2、p3都是和p1类似的函数
```

以Promise对象为中心

```javascript
//p2, p3与p1相似
var p1 = new Promise(function(resolve, reject) {
  resolve();
});

p1.then(function() {
    return p2
  })
  .then(function() {
    return p3
  })
  .catch()
```

###  使用Promise.all

```javascript
Promise.all(<Promise对象数组>).then(<所有作业处理后的回调函数>);
```

　　Promise.all中任何一个promise出现错误的时候都会执行reject，导致其它正常返回的数据也无法使用了。

## Generator函数和yield

　　Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。

## async/await语法

　　async 和 await 是内置了执行器的 generator 函数。[^1]

```javascript
function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 1000);
    });
}

takeLongTime().then(v => {
    console.log("got", v);
});
```

可以改写成

```javascript
function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 1000);
    });
}

async function test() {
    const v = await takeLongTime();
    console.log(v);
}

test();
```

　　一个async函数总是返回Promise对象。如果它内部返回Promise对象，则返回这个对象；如果返回非Promise对象，则返回一个包裹这个对象的Promise对象；如果抛出异常，则返回包裹这个异常的Promise对象。
　　
　　使用`for await...of`语法可以实现Promise.all的功能。

## 参考

[^1]: [[NodeJS\] async 和 await 的本质](https://www.cnblogs.com/blowing00/p/12469552.html)
