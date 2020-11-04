---
title: C++_Details
date: '2020-11-01 11:36:10'
updated: '2020-11-01 12:24:47'
categories:
  - 2.1 C++
---
# C++中除以0的行为

- int型除以0，程序会直接down掉，不会抛异常
- double型除以0，会得到值为INF的double型值

# 使用malloc创建对象，对象中的虚函数指针无法指向对应虚函数

```C++
#include <iostream>
using namespace std;

class Foo {
public:
    virtual void func1() { cout << "Run func1." << endl; }
};

int main(int argc, char const* argv[])
{
    Foo* p = (Foo*)malloc(sizeof(Foo));
    p->func1(); //运行异常，程序退出码为1
    return 0;
}
```

　　以上程序出问题的原因是使用malloc创建的对象，没有执行构造函数，对象中的虚函数指针无法指向对应虚函数。

# 未定义行为：sizeof和直接初始化

```cpp
array<char,7> a;
cout << sizeof(a) << endl;//输出7
cout << sizeof(array<char,7>()) << endl;//输出1，因为array<char,7>()被认为是一个函数而不是一个对象
```

# 静态成员变量和常静态成员变量初始化区别

　　clang++要求静态成员变量必须在外部初始化，常静态成员变量可以在类定义内部初始化（也可以在外部初始化）。

```cpp
#include <iostream>
using namespace std;

class Foo {
public:
    int haha = 1;
    const int hihi = 2;
    static int huhu;//静态成员变量必须在外部初始化
    static const int hehe = 4;//常静态成员变量可以在类定义内部初始化
};

int Foo::huhu = 3;

int main(int argc, char const* argv[])
{
    Foo foo;
    cout << foo.haha << foo.hihi << foo.huhu << foo.hehe << endl;
    return 0;
}
```

# C++中的原生二维数组的列数必须是常数

<https://blog.csdn.net/pongba/article/details/1560738>

```cpp
int **pTwoDimArr = new int[10][20]; //错误！
int (*pTwoDimArr)[20] = new int[i][20]; //正确
```

　　这里的问题在于，new int[10][20]返回的并非int\*\*类型的指针，而是int (\*)[20]类型的指针（这种指针被称为行指针，对它“+1”相当于在数值上加上一行的大小（本例为20），也就是说，让它指向下一行）。

　　要让int**指向二维数组，只能这样做（以下不涉及行指针）：

```cpp
//申请资源
int** a = new int*[row]; //a指向申请的长度为row的int*数组
for (int i = 0; i < row; i++)
    a[i] = new int[column]; //int*数组中每个元素指向申请的int数组的头元素
//使用
//...
//释放资源
for (int i = 0; i < row; i++)
    delete[] a[i];
delete[] a;
```

# 常量引用和右值引用指向的常量，编译器会给它分配地址

```cpp
const int &a = 2;
int&& b = 1;
cout << &a << endl;//可以
cout << &b << endl;//可以
```

# 判断大小端

参考：<https://blog.csdn.net/zxnsirius/article/details/51029605>

```cpp
#include <stdio.h>
/*联合*/
union node
{
    int num;
    char ch;
}

int main()
{
    union node p;
    //方法一
    p.num = 0x12345678;
    if (p.ch == 0x78)
    {
        printf("Little endian\n");
    }
    else
    {
        printf("Big endian\n");
    }
    //方法二
    int num = 0x12345678;
    char *q = &num;
    if (*q == 0x78)
    {
        printf("Little endian\n");
    }
    else
    {
        printf("Big endian\n");
    }
    return 0;
}
```
