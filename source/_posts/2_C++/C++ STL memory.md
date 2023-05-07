---
title: C++ STL memory
date: '2020-11-01 11:36:10'
updated: '2023-05-07 20:03:17'
categories:
  - 2 C++
---
# C++ STL memory
<https://segmentfault.com/a/1190000006736869>

<https://blog.csdn.net/zy19940906/article/details/50470087>

<https://blog.csdn.net/haolipengzhanshen/article/details/52205102>

## unique_ptr

```cpp
std::unique_ptr<Base1> base1(new Base1);  
std::unique_ptr<Base1> base2=std::move(base1);//base1变成empty
```

## shared_ptr

　　内含引用计数，引用计数归零则销毁对象。

```cpp
std::shared_ptr<Base1> base1(new Base1);  
std::shared_ptr<Base1> base2=base1;  
std::shared_ptr<Base1> base3;  
base3 = base2;//三个共享一个 
```

### 与weak_ptr配合

　　shared_ptr无法解决“引用计数”模型循环依赖问题。

　　weak_ptr用于解决“引用计数”模型循环依赖问题，weak_ptr指向shared_ptr指针指向的对象的内存，并不增减该对象的引用计数器,即不拥有该内存。weak_ptr 必须从一个share_ptr或者另一个weak_ptr转换而来，不能使用new 对象进行构造。

　　weak_ptr没有重载opreator*和->操作符，也就意味着即使分配到对象，它也没法使用该对象

　　使用weak_ptr的lock函数，则可返回其指向内存的一个shared_ptr对象，且在所指对象内存已经无效时，返回指针空值（nullptr）

　　weak_ptr使用方法如下：

```cpp
#include <iostream>
#include <memory>
using namespace std;

void Check(weak_ptr<int> &wp)
{
    shared_ptr<int> sp = wp.lock(); // 重新获得shared_ptr对象
    if (sp != nullptr)
    {
        cout << "The value is " << *sp << endl;
    }
    else
    {
        cout << "Pointer is invalid." << endl;
    }
}

int main()
{
    shared_ptr<int> sp1(new int(10));
    shared_ptr<int> sp2 = sp1;
    weak_ptr<int> wp = sp1; // 指向sp1所指向的内存

    cout << *sp1 << endl;
    cout << *sp2 << endl;
    Check(wp);

    sp1.reset();
    cout << *sp2 << endl;
    Check(wp);

    sp2.reset();
    Check(wp);

    system("pause");
    return 0;
}
```

　　对于解决循环引用依赖，只要把循环引用的一方使用weak_ptr弱引用，即可解除循环引用。


