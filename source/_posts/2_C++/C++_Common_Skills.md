---
title: C++_Common_Skills
date: '2020-11-01 11:36:10'
updated: '2020-11-07 10:37:05'
categories:
  - 2 C++
---
# 从标准输入流读取个数未知的整数

## 使用scanf的返回值判断

　　因为测评系统会输出EOF表示输入结束，所以可以用这种方式：

```cpp
int i; 
while(scanf("%d",&i)!=EOF) {
    printf("%d ", i);
}
```

## 使用getline和istringstream

```cpp
#include <iostream>
#include <sstream>
using namespace std;

int main(int argc, char const* argv[])
{
    string s;
    getline(cin, s); //getline会消灭掉'\n'
    istringstream iss(s);
    int i;
    while (iss >> i) {
        printf("%d ", i);
    }
}
```
