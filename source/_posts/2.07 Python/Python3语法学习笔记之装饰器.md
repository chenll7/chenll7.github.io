---
title: Python3语法学习笔记之装饰器
date: '2020-11-01 11:36:11'
updated: '2020-11-04 22:14:24'
categories:
  - 2.07 Python
---
# Python3语法学习笔记之装饰器

　　装饰器可以是函数或者类。

## 装饰器函数

　　不带参数的装饰器函数的基本形式：

```python
def decorator(func):
    def wrapper(*args, **kw):
        # ...
        ret = func(*args, **kw)
        # ...
        return ret
    return wrapper

@decorator
def foo(a1,a2):
    # ...
    
foo(1,2)
```

相当于：

```python
def decorator(func):
    def wrapper(*args, **kw):
        # ...
        ret = func(*args, **kw)
        # ...
        return ret
    return wrapper

def foo(a1,a2):
    # ...
foo=decorator(foo)
    
    
foo(1,2)
```

可以看出装饰器函数需要输入一个函数对象并返回一个函数对象。一般来说，函数被装饰后`__name__`属性会被改变，可以使用`functools.wraps`来维持函数签名：

```python
import functools

def decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kw):
        # ...
        ret = func(*args, **kw)
        # ...
        return ret
    return wrapper

@decorator
def foo(a1,a2):
    # ...
    
print(foo.__name__)
```

带参数的装饰器函数：

```python
import functools

def decorator_gen(text):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            # ...
            ret = func(*args, **kw)
            # ...
            return ret
        return wrapper
    return decorator
```

